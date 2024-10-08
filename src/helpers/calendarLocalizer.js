import { dateFnsLocalizer } from 'react-big-calendar';
import {  format, parse, startOfWeek, getDay  } from 'date-fns';
import { es, fr, ca, enUS } from 'date-fns/locale';



const locales = {
    es: es,
    en: enUS,
    fr: fr,
    ca: ca,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});




