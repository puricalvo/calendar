import { createSlice } from '@reduxjs/toolkit';



export const servicesSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    isLoading: false,
  },
  reducers: {
    setServices: (state, action) => {
      state.services = action.payload;
    },
    addService: (state, action) => {
      if (!Array.isArray(state.services)) {
        state.services = []; // Asegúrate de que sea un array
      }
      state.services.push(action.payload); // Agregar el nuevo servicio
    },
    updateService: (state, action) => {
      const index = state.services.findIndex(service => service.id === action.payload.id);
      if (index !== -1) {
        state.services[index] = action.payload;
      }
    },
    deleteService: (state, action) => {
      state.services = state.services.filter(service => service.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  }
});

export const { setServices, addService, updateService, deleteService, setLoading } = servicesSlice.actions;