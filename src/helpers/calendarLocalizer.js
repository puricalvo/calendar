
import { format, getDay, parse, startOfWeek } from 'date-fns';
import { es, fr, ca, enUS } from 'date-fns/locale';
import { dateFnsLocalizer,   } from 'react-big-calendar';



const locales = {
    es: es,
    en: enUS,
    fr: fr,
    ca: ca,
}





export const localizer = dateFnsLocalizer ({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
  
  
  
});







