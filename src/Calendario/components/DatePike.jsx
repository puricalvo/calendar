import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa los locales que necesitas
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ca';
import updateLocale from 'dayjs/plugin/updateLocale';
import weekday from 'dayjs/plugin/weekday';

import { Grid  } from '@mui/material';
import {  useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';



dayjs.extend(updateLocale);
dayjs.extend(weekday);





export const DatePike = () => {
  const [value, setValue] = useState(dayjs());
  const { i18n } = useTranslation();

  useEffect(() => {
    // Cambiar el idioma de dayjs según el idioma actual de i18n
    dayjs.locale(i18n.language); // Establece el idioma dinámicamente
    dayjs.updateLocale(i18n.language, {
      weekStart: 1, // Establece que la semana comience el lunes
    });
    
  }, [i18n.language]);
  
  const dayOfWeekFormatter = (weekdayIndex) => {
    // Crear un día a partir del índice del día de la semana (0=domingo, 1=lunes, etc.)
    const days = { 
      es: [ 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom',],
      en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      fr: ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'],
      ca: ['Dil','Dim','Dim','Dij','Div', 'Dis','Diu']
    };

    const currentDays = days[i18n.language] || days['es']; 

    const adjustedIndex = (weekdayIndex + 6) % 7;

    if (adjustedIndex < 0 || adjustedIndex >= currentDays.length) {
      console.warn(`Índice de día de la semana fuera de rango: ${weekdayIndex}`);

    return '';  // 'dd' devuelve dos letras del día de la semana
  };
  return currentDays[adjustedIndex]; 
}
 
  return (
    <LocalizationProvider 
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.language} 
    >
      <Grid container components={['DateCalendar']}>
        <Grid item label="DateCalendar" >
          <DateCalendar className='react-calendar' 
              sx={{ 
                "& .MuiPickersDay-root": {  fontSize: "20px"  }          
            }}     
            value={value}
            onChange={(newValue, context) => {
              if (context.validationError == null) {
                setValue(newValue);
              }
            }}
            minDate={dayjs('1901-01-01')}
            maxDate={dayjs('2099-12-31')}
              format="DD/MM/YYYY"
              defaultValue={dayjs('2024-04-05')}
              views={['year', 'month', 'day']}
              dayOfWeekFormatter={dayOfWeekFormatter}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
    
  );
}
         