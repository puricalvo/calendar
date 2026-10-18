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
  const isAdmin = user?.role === 'admin';

  // Función para cargar los mensajes desde la API
  const loadMessages = useCallback(async () => {
    dispatch(setLoadingA(true));
    try {
      const { data } = await calendarApi.get(isAdmin ? '/messages/admin/inbox' : '/messages');
      
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
  }, [dispatch, isAdmin]);

  // Función para agregar un nuevo mensaje
  const addNewMessage = useCallback(async (messageText) => {

    try {
      const { data } = await calendarApi.post('/messages', { text: messageText });
      
      if (data && data.mensage) {
        dispatch(addMessage(data.mensage));
        return true;
      } else {
        throw new Error('La respuesta no contiene un mensaje válido.');
      }
    } catch (error) {
      console.error('Error al agregar mensaje:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudo enviar el mensaje al administrador', 'error');
      return false;
    }
    
  }, [dispatch]);

  // Función para eliminar un mensaje
  const removeMessage = useCallback(async (messageId) => {
    try {
      await calendarApi.delete(isAdmin ? `/messages/admin/inbox/${messageId}` : `/messages/${messageId}`);
      dispatch(deleteMessage(messageId));
    } catch (error) {
      console.error('Error al eliminar mensaje:', error);
      Swal.fire('Error', 'No se pudo eliminar el mensaje', 'error');
    }
  }, [dispatch, isAdmin]);

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