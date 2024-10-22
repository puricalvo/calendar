// src/hooks/useMessages.js
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { setLoading, setMessages, addMessage, deleteMessage, updateMessage, setLoadingA } from '../store'; // Importa las acciones del slice
import calendarApi from '../api/calendarApi'; // Importa tu API
import Swal from 'sweetalert2'; // Importa la librería de notificaciones

export const useMessages = () => {
  const dispatch = useDispatch();
  const { messages = [], isLoading } = useSelector((state) => state.messages || {});

  const { user } = useSelector( state => state.auth ); 

  // Función para cargar los mensajes desde la API
  const loadMessages = useCallback(async () => {
    dispatch(setLoadingA(true));
    try {
      const { data } = await calendarApi.get('/messages');
      
      // Asegúrate de que accedes a 'mensage'
      if (data && data.mensages) {  // Si la API devuelve un array de mensajes con la clave "mensages"
        dispatch(setMessages( data.mensages));
      } else {
        throw new Error('No se pudieron cargar los mensajes.');
      }
    } catch (error) {
      console.error('Error cargando los mensajes:', error);
      Swal.fire('Error', 'No se pudieron cargar los mensajes', 'error');
    } finally {
      dispatch(setLoadingA(false));
    }
  }, [dispatch]);

  // Función para agregar un nuevo mensaje
  const addNewMessage = useCallback(async (messageText) => {

    try {
      const { data } = await calendarApi.post('/messages', { text: messageText });
      
      console.log('Respuesta de la API:', data);  // Depuración para asegurarte de que todo está bien
  
      // Asegúrate de acceder a "mensage" correctamente
      if (data && data.mensage) {
        dispatch(addMessage(data.mensage));  // Ahora usa "mensage" en lugar de "message"
      } else {
        throw new Error('La respuesta no contiene un mensaje válido.');
      }
    } catch (error) {
      console.error('Error al agregar mensaje:', error);
      Swal.fire('Error', 'No se pudo agregar el mensaje', 'error');
    }
    
  }, [dispatch]);

  // Función para eliminar un mensaje
  const removeMessage = useCallback(async (messageId) => {
    try {
      await calendarApi.delete(`/messages/${messageId}`);
      dispatch(deleteMessage(messageId));
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      Swal.fire('Error', 'No se pudo eliminar el mensaje', 'error');
    }
  }, [dispatch]);

  // Función para actualizar un mensaje existente
  const modifyMessage = useCallback(async (message) => {
    try {
      const { data } = await calendarApi.put(`/messages/${message.id}`, message);
      
      // Asegúrate de que accedes a 'mensage'
      if (data && data.mensage) {
        dispatch(updateMessage(data.mensage.id, user));
      } else {
        throw new Error('No se pudo actualizar el mensaje.');
      }
    } catch (error) {
      console.error('Error al actualizar mensaje:', error);
      Swal.fire('Error', 'No se pudo actualizar el mensaje', 'error');
    }
  }, [dispatch]);

  useEffect(() => {
    // Carga los mensajes al montar el componente
    loadMessages();
  }, [loadMessages]);

  return {
    messages,
    isLoading,
    loadMessages,   // Puedes reutilizar esta función si la necesitas
    addNewMessage,  // Para agregar mensajes
    removeMessage,  // Para eliminar mensajes
    modifyMessage,  // Para actualizar mensajes
  };
};