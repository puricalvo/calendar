import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend) // Permite cargar archivos de traducción desde una URL
  .use(LanguageDetector) // Detecta automáticamente el idioma del navegador o configuración
  .use(initReactI18next) // Para integrar i18next con React
  .init({
    fallbackLng: 'en', // Idioma por defecto si no se encuentra el deseado
    debug: true, // Para ver mensajes de error en consola
    interpolation: {
      escapeValue: false, // No escapes por razones de seguridad en React
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Ruta donde están tus archivos JSON
    },
  });

export default i18n;