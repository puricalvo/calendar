import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//     _id: new Date().getTime(),
//     title: 'Cumpleaño de jefe',
//     notes: 'Hay que comprar el pastel',
//     start: new Date(),
//     end: addHours( new Date(), 2),
//     bgColor: '#dc3545',
//     user: {
//         _id: '123',
//         name: 'Fernando'
//     }
// }


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
         events: [
              // tempEvent
         ],
         activeEvent: null,
    },
    reducers: {
       onSetActiveEvent: ( state, { payload }) => {
            state.activeEvent = payload; 
       },
       // Funcion que crea un nuevo evento y limpia el modal...
       onAddNewEvent: ( state, { payload }) => {
            state.events.push( payload ); // Funcion para agregar una nueva nota..
            state.activeEvent = null; // Limpia el modal..
       },
       // Funcion para actualizar un event que ya existe..
       onUpdateEvent: ( state, { payload }) => {
            state.events = state.events.map( event => {
                if ( event.id === payload.id ) {
                    return payload;
                }

                return event;
            });
       },
       // Funcion para eliminar un evento
       onDeleteEvent: ( state ) => {
            if ( state.activeEvent ) {
                state.events = state.events.filter( event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
       },
       onLoadEvents: ( state, { payload = [] }) => {
            state.isLoadingEvents = false;
            // state.events = payload;
            payload.forEach( event => {
                const exists = state.events.some( dbEvent => dbEvent.id === event.id );
                if ( !exists ) {
                    state.events.push(event)
                }
            })
       },
       onLogoutCalendar: ( state ) => {
          state.isLoadingEvents = true;
          state.events = [];
          state.activeEvent = null;
       } 
   }
});


// Action creators are generated for each case reducer function
export const { 
    onSetActiveEvent, 
    onAddNewEvent, 
    onUpdateEvent, 
    onDeleteEvent, 
    onLoadEvents,
    onLogoutCalendar, 

} = calendarSlice.actions;
