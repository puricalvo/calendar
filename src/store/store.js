import { configureStore } from '@reduxjs/toolkit';
import { authSlice, calendarSlice, badgeSlice, uiSlice } from './';

//  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 

export const store = configureStore({
  reducer: {
      auth: authSlice.reducer,
      calendario: calendarSlice.reducer,
      uiCalendar: uiSlice.reducer,
      badge: badgeSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

