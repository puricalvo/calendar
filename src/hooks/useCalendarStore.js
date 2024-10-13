import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";





export const useCalendarStore = () => {

    const dispatch = useDispatch();

    //* Funcion para activar el calendario
    const { events, activeEvent } = useSelector( state => state.calendario); //! El state.calendario es el nombre de la carpeta...
      
    const { user } = useSelector( state => state.auth ); 
    
    //* Funcion para que se muestre el evento  en el modal
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    //* Funcion para grabar un nuevo evento en el modal
    const startSavingEvrnt = async( calendarEvent ) => {

       try {

          if ( calendarEvent.id ) {
            // estoy Actualizando el event si tiene el mismo id...
            await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
            dispatch( onUpdateEvent({ ...calendarEvent, user }) );
            return;

          } 
            // creando uno nuevo evento...
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user  }) );
        
       } catch (error) {
          console.log(error);
          Swal.fire('Error al guardar', error.response.data.msg, 'error');
       }
 
   
    }
    
    //* Borrar un evento que ya existe...
    const startDeletingEvent = async() => {
      //Todo: llegar al backend
      try {

        await calendarApi.delete(`/events/${ activeEvent.id }`);
        dispatch( onDeleteEvent() ); // Borrar evento
        
      } catch (error) {
        console.log(error);
        Swal.fire('Error al eliminar', error.response.data.msg, 'error');
      }
      
    }

    //* Funcion para cargar los eventos de nuestro backend
    const startLoadingEvents = async () => {
        try {

          const { data } = await calendarApi.get('/events');
          const events = convertEventsToDateEvents( data.eventos );
          dispatch( onLoadEvents( events ) );
          
        } catch (error) {
          console.log('Error cargando eventos');
          console.log(error);
        }
    }



  return {
    //* Propiedades
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    //* Metodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvrnt,
    
  }
}
