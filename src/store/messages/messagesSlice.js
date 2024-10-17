import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  
};

 export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    isLoading: false,
  },
  reducers: {
    setMessages: (state, action) => {
        state.messages = action.payload;
      },
      addMessage: (state, action) => {
        if (!Array.isArray(state.messages)) {
          state.messages = []; // Asegúrate de que sea un array
        }
        state.messages.push(action.payload); // Agregar el nuevo mensaje
      },
      updateMessage: (state, action) => {
        const index = state.messages.findIndex(msg => msg.id === action.payload.id);
        if (index !== -1) {
          state.messages[index] = action.payload;
        }
      },
      deleteMessage: (state, action) => {
        state.messages = state.messages.filter(msg => msg.id !== action.payload);
      },
      setLoading: (state, action) => {
        state.isLoading = action.payload;
      }
    },
  });
  
  export const { setMessages, addMessage, updateMessage, deleteMessage, setLoading } = messagesSlice.actions;
  
  

