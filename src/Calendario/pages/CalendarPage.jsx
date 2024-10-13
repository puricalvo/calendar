import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { useTranslation } from 'react-i18next';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { TareaMes, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../components';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';
import {  getMessagesCA, getMessagesEN, getMessagesES, getMessagesFR, localizer } from '../../helpers';
import { Divider } from '@mui/material';







export const CalendarPage = () => {

    const { i18n } = useTranslation();

    
    const [language, setLanguage] = useState(i18n.language); 
    

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

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);  // Cambiar idioma en i18next
      setLanguage(lng);          // Cambiar idioma en el estado local
    };


    const getMessages = (lng) => {
      switch (lng) {
          case 'es':
              return getMessagesES();
          case 'en':
              return getMessagesEN();
          case 'fr':
              return getMessagesFR();
          case 'ca':
              return getMessagesCA();
          // Agregar más casos según sea necesario
          default:
              return getMessagesES(); // Idioma por defecto
      }
  };

    
  return (
    <>
        <TareaMes/>

        <div >
        <select onChange={(e) => changeLanguage(e.target.value)} value={language}>
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="ca">Catalan</option>
        </select>
        </div>
        <Divider/>
        <Calendar
          className='dias'
          culture={ language }
          localizer={ localizer }
          events={ events }
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc( 100vh - 80px)' }}
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChanged } 
          messages={ getMessages(language) }
          
        />


          <CalendarModal />

          //Botones Flotantes...
          <FabAddNew />
          <FabDelete />

    </>
  )
}
