import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import calendarApi from '../api/calendarApi';
import Swal from 'sweetalert2';
import { deleteService, setLoading, setServices, updateService } from '../store';

export const useServices = (weekStart) => {
  const dispatch = useDispatch();
  const { services = [], isLoading } = useSelector((state) => state.services || {});

  const loadServices = useCallback(async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await calendarApi.get('/services', { params: { week: weekStart } });
      if (!data || !Array.isArray(data.servicios)) {
        throw new Error('La respuesta no contiene una lista de servicios válida.');
      }

      dispatch(setServices(data.servicios));
    } catch (error) {
      console.error('Error cargando los servicios:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudieron cargar los servicios', 'error');
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, weekStart]);

  const addNewService = useCallback(async (service) => {
    try {
      await calendarApi.post('/services', service);
      await loadServices();
      return true;
    } catch (error) {
      console.error('Error al agregar servicio:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudo guardar el registro', 'error');
      return false;
    }
  }, [loadServices]);

  const removeService = useCallback(async (serviceId) => {
    try {
      await calendarApi.delete(`/services/${serviceId}`);
      dispatch(deleteService(serviceId));
      return true;
    } catch (error) {
      console.error('Error al eliminar servicio:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudo eliminar el registro', 'error');
      return false;
    }
  }, [dispatch]);

  const modifyService = useCallback(async (service) => {
    try {
      const { data } = await calendarApi.put(`/services/${service.id}`, service);
      if (!data?.servicio) {
        throw new Error('La respuesta no contiene un servicio válido.');
      }

      dispatch(updateService(data.servicio));
      return true;
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudo actualizar el servicio', 'error');
      return false;
    }
  }, [dispatch]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  return {
    services,
    isLoading,
    loadServices,
    addNewService,
    removeService,
    modifyService,
  };
};
