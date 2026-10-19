import { createSlice } from '@reduxjs/toolkit';

const compareMessages = (first, second) => {
  const dateDifference = new Date(second.date).getTime() - new Date(first.date).getTime();
  return dateDifference || String(second.id).localeCompare(String(first.id));
};

const mergeMessages = (messages) => (
  [...new Map(messages.map((message) => [message.id, message])).values()]
    .sort(compareMessages)
);

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    isLoading: false,
    isLoadingMore: false,
    hasMore: false,
    nextCursor: null,
    total: 0,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = mergeMessages(action.payload.messages);
      state.hasMore = action.payload.hasMore;
      state.nextCursor = action.payload.nextCursor;
      state.total = action.payload.total;
    },
    prependMessages: (state, action) => {
      state.messages = mergeMessages([...action.payload.messages, ...state.messages]);
      state.hasMore = action.payload.hasMore;
      state.nextCursor = action.payload.nextCursor;
    },
    addMessage: (state, action) => {
      state.messages = mergeMessages([...state.messages, action.payload]);
      state.total += 1;
    },
    setMessageRead: (state, action) => {
      const message = state.messages.find(({ id }) => id === action.payload.id);
      if (message) message.readAt = action.payload.readAt;
    },
    setLoadingA: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoadingMore: (state, action) => {
      state.isLoadingMore = action.payload;
    },
  },
});

export const {
  setMessages,
  prependMessages,
  addMessage,
  setMessageRead,
  setLoadingA,
  setLoadingMore,
} = messagesSlice.actions;
