import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react'; // Importa las acciones del slice
import calendarApi from '../api/calendarApi'; // Importa tu API
import Swal from 'sweetalert2'; // Importa la librería de notificaciones
import { addService, deleteService, setLoading, setServices, updateMessage } from '../store';

export const useServices = () => {
  const dispatch = useDispatch();
  const { services = [], isLoading } = useSelector((state) => state.services || {});

  const { user } = useSelector( state => state.auth ); 

  // Función para cargar los mensajes desde la API
  const loadServices = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await calendarApi.get('/services');
      
      // Si la API devuelve "servicios" como un array
      if (data && Array.isArray(data.servicios)) {
        dispatch(setServices(data.servicios)); 
      
      // Si la API devuelve "servicio" como un objeto (sin array)
      } else if (data && data.servicio) {  
        dispatch(setServices([data.servicio])); // Lo convertimos en un array con un solo elemento
      } else {
        throw new Error('No se pudieron cargar los servicios.');
      }
    } catch (error) {
      console.error('Error cargando los servicios:', error);
      Swal.fire('Error', 'No se pudieron cargar los servicios', 'error');
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);
  
  // Función para agregar un nuevo mensaje
  const addNewServices = useCallback(async (servicesSalCoche, servicesHInicio, servicesHFinal, serviceSentCoche, serviceSautobus, servicesMatricula, servicesTipoServicio, servicesCodigo, servicesLInicio, servicesLFinal, servicesObservaciones) => {
    try {
      const { data } = await calendarApi.post('/services', { 
        salCoche: servicesSalCoche, 
        hInicio: servicesHInicio, 
        hFinal: servicesHFinal, 
        entCoche: serviceSentCoche, 
        autobus: serviceSautobus, 
        matricula: servicesMatricula, 
        tipoServicio: servicesTipoServicio, 
        codigo: servicesCodigo, 
        lInicio: servicesLInicio, 
        lFinal: servicesLFinal, 
        observaciones: servicesObservaciones 
      });

      // Verificamos si la API devuelve un "servicio" y lo añadimos
      if (data && data.servicio) {
        dispatch(addService(data.servicio));
      } else {
        throw new Error('La respuesta no contiene un servicio válido.');
      }
    } catch (error) {
      console.error('Error al agregar servicio:', error);
      Swal.fire('Error', 'No se pudo agregar el servicio', 'error');
    }
  }, [dispatch]);
  // Función para eliminar un mensaje
  const removeService = useCallback(async (servicioId) => {
    try {
      await calendarApi.delete(`/services/${servicioId}`);
      dispatch(deleteService(servicioId));
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      Swal.fire('Error', 'No se pudo eliminar el mensaje', 'error');
    }
  }, [dispatch]);

  // Función para actualizar un mensaje existente
  const modifyService = useCallback(async (service) => {
    try {
      const { data } = await calendarApi.put(`/services/${service.id}`, service);
      
      if (data && data.servicio) {
        dispatch(updateService(data.servicio));  // Asegúrate de usar "updateService"
      } else {
        throw new Error('No se pudo actualizar el servicio.');
      }
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      Swal.fire('Error', 'No se pudo actualizar el servicio', 'error');
    }
  }, [dispatch]);

  useEffect(() => {
    // Carga los servicios al montar el componente
    loadServices();
  }, [loadServices]);

  return {
    services,
    isLoading,
    loadServices,   // Puedes reutilizar esta función si la necesitas
    addNewServices,  // Para agregar mensajes
    removeService,  // Para eliminar mensajes
    modifyService,  // Para actualizar mensajes
  };
};
