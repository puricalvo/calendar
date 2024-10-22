
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

import { format as formatDate, isDate } from "date-fns";
import { enUS, es, fr, ca } from "date-fns/locale"; // import all locales we need

const locales = { en: enUS, es, fr, ca }; 



// Configuración de i18next
i18n
  .use(HttpBackend) // Permite cargar traducciones desde archivos JSON
  .use(LanguageDetector) // Detecta el idioma automáticamente
  .use(initReactI18next) // Integra con React
  .init({
    fallbackLng: 'en',  // Idioma por defecto si no se encuentra el idioma del usuario
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json' // Ruta para cargar los archivos JSON de traducción
    },
    ns: ['common', 'datePicke','sidebar', 'navbar', 'modal', 'messages','register', 'eventList','mensajesConductor', 'cardList'], // Namespaces: un archivo JSON por sección
    defaultNS: 'common', // Namespace por defecto
    interpolation: {
      escapeValue: false ,// React ya maneja la seguridad de los valores
      format: (value, format, lng) => {
        if (isDate(value)) {
            const locale = locales[lng];
            return formatDate(value, format, { locale });
        }
      }
        
    }

    
    
  });
  
  i18n.on('failedLoading', (lng, ns, msg) => {
    console.error(`Error cargando traducciones: ${lng}, ${ns}, ${msg}`);
  });


export default i18n; 
