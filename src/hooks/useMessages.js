import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import {
  addMessage,
  prependMessages,
  setLoadingA,
  setLoadingMore,
  setMessages,
  setMessageRead,
} from '../store';
import calendarApi from '../api/calendarApi';
import Swal from 'sweetalert2';

const sortNewestFirst = (messages) => [...messages].sort((first, second) => {
  const dateDifference = new Date(second.date).getTime() - new Date(first.date).getTime();
  return dateDifference || String(second.id).localeCompare(String(first.id));
});

const isValidPage = (data) => (
  Array.isArray(data?.mensages)
  && typeof data.hasMore === 'boolean'
  && Number.isInteger(data.total)
);

export const useMessages = () => {
  const dispatch = useDispatch();
  const {
    messages = [],
    isLoading,
    isLoadingMore,
    hasMore,
    nextCursor,
    total,
  } = useSelector((state) => state.messages || {});
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === 'admin';
  const messagesEndpoint = isAdmin ? '/messages/admin/inbox' : '/messages';

  const loadMessages = useCallback(async () => {
    dispatch(setLoadingA(true));
    try {
      const { data } = await calendarApi.get(messagesEndpoint, { params: { limit: 10 } });
      if (!isValidPage(data)) {
        throw new Error('La respuesta no contiene una página válida de mensajes.');
      }

      dispatch(setMessages({
        messages: sortNewestFirst(data.mensages),
        hasMore: data.hasMore,
        nextCursor: data.nextCursor,
        total: data.total,
      }));
    } catch (error) {
      console.error('Error cargando los mensajes:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudieron cargar los mensajes', 'error');
    } finally {
      dispatch(setLoadingA(false));
    }
  }, [dispatch, messagesEndpoint]);

  const loadOlderMessages = useCallback(async () => {
    if (!hasMore || !nextCursor || isLoadingMore) return false;

    dispatch(setLoadingMore(true));
    try {
      const { data } = await calendarApi.get(messagesEndpoint, {
        params: {
          limit: 5,
          beforeDate: nextCursor.beforeDate,
          beforeId: nextCursor.beforeId,
        },
      });
      if (!isValidPage(data)) {
        throw new Error('La respuesta no contiene una página válida de mensajes.');
      }

      dispatch(prependMessages({
        messages: sortNewestFirst(data.mensages),
        hasMore: data.hasMore,
        nextCursor: data.nextCursor,
      }));
      return true;
    } catch (error) {
      console.error('Error al cargar mensajes anteriores:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudieron cargar mensajes anteriores', 'error');
      return false;
    } finally {
      dispatch(setLoadingMore(false));
    }
  }, [dispatch, hasMore, isLoadingMore, messagesEndpoint, nextCursor]);

  const addNewMessage = useCallback(async (messageText) => {
    try {
      const { data } = await calendarApi.post('/messages', { text: messageText });
      if (!data?.mensage) {
        throw new Error('La respuesta no contiene un mensaje válido.');
      }
      dispatch(addMessage(data.mensage));
      return true;
    } catch (error) {
      console.error('Error al agregar mensaje:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudo enviar el mensaje al administrador', 'error');
      return false;
    }
  }, [dispatch]);

  const replyToUser = useCallback(async ({ recipientId, text }) => {
    try {
      const { data } = await calendarApi.post('/messages/admin/reply', { recipientId, text });
      if (!data?.mensage) {
        throw new Error('La respuesta no contiene un mensaje válido.');
      }
      dispatch(addMessage(data.mensage));
      return true;
    } catch (error) {
      console.error('Error al responder al empleado:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudo enviar la respuesta', 'error');
      return false;
    }
  }, [dispatch]);

  const markMessageRead = useCallback(async (messageId) => {
    try {
      const { data } = await calendarApi.post(`/messages/${messageId}/read`);
      if (!data?.readAt) {
        throw new Error('El servidor no confirmó la lectura del mensaje.');
      }
      dispatch(setMessageRead({ id: messageId, readAt: data.readAt }));
      return true;
    } catch (error) {
      console.error('Error al marcar el mensaje como leído:', error);
      Swal.fire('Error', error.response?.data?.msg || 'No se pudo registrar la lectura del mensaje', 'error');
      return false;
    }
  }, [dispatch]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return {
    messages,
    isLoading,
    isLoadingMore,
    hasMore,
    nextCursor,
    total,
    loadMessages,
    loadOlderMessages,
    addNewMessage,
    replyToUser,
    markMessageRead,
  };
};
