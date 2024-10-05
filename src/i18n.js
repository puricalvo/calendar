// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Configuración de i18next
i18n
  .use(HttpBackend) // Permite cargar traducciones desde archivos JSON
  .use(LanguageDetector) // Detecta el idioma automáticamente
  .use(initReactI18next) // Integra con React
  .init({
    fallbackLng: 'en', // Idioma por defecto si no se encuentra el idioma del usuario
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json' // Ruta para cargar los archivos JSON de traducción
    },
    ns: ['common', 'login', 'sidebar', 'navbar', 'modal', 'mensajesConductor', 'cardList', 'datePicke'], // Namespaces: un archivo JSON por sección
    defaultNS: 'common', // Namespace por defecto
    interpolation: {
      escapeValue: false // React ya maneja la seguridad de los valores
    }
  });

export default i18n; 
