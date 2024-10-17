import { configureStore } from '@reduxjs/toolkit';
import { authSlice, calendarSlice,  messagesSlice,  uiSlice, } from './';

//  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 

export const store = configureStore({
  reducer: {
      auth: authSlice.reducer,
      calendario: calendarSlice.reducer,
      uiCalendar: uiSlice.reducer,
      messages: messagesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

