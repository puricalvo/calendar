import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { TareaMes, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../components';


import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import { getMessagesEs, localizer } from '../../helpers';



export const CalendarPage = () => {

 
    const { user } = useAuthStore();
    const { openDateModal } = useUiStore(); 
    const { events, setActiveEvent, startLoadingEvents  } = useCalendarStore();

    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView' ) || 'week');

    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
      const isMyEvent = ( user.uid === event.user._id ) || ( user.uid === event.user.uid ); 

        const style = {
            backgroundColor: isMyEvent ? '#dc3545' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white' 
        }

        return {
            style
        }
    }

    const onDoubleClick = ( event ) => {
        // console.log({ doubleClick: event });
        openDateModal();
    }

    const onSelect = ( event ) => {
      // console.log({click: event });
        setActiveEvent( event );
    }

    const onViewChanged = ( event ) => {
       localStorage.setItem('lastView', event );
       setLastView( event )
    }

    useEffect(() => {
      startLoadingEvents(); 
    }, [])
     


  return (
    <>
        <TareaMes/>
        
        <Calendar
          culture='es'
          localizer={ localizer }
          events={ events }
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px)' }}
          messages={ getMessagesEs() }
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged }
        />

          <CalendarModal />

          //Botones Flotantes...
          <FabAddNew />
          <FabDelete />

    </>
  )
}
