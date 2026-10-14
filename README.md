# Frontend del calendario

Interfaz web del calendario de servicios y turnos. Está construida con React, Vite y Material UI.

## Requisitos

- Node.js y npm
- El backend del calendario en ejecución

## Configuración local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.template` a `.env`.
3. Configura `VITE_API_URL` con la URL base de la API. Para el backend local:

   ```dotenv
   VITE_API_URL=http://localhost:4000/api
   ```

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

Vite mostrará en la terminal la dirección local de la aplicación.

## Comandos

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Compilación de producción
npm run preview  # Previsualizar la compilación
```

## Funcionalidades

- Inicio de sesión y navegación por el calendario.
- Fichas semanales de servicios y descansos para los empleados.
- Panel del administrador para consultar empleados, servicios e incidencias.
- Formulario administrativo para crear servicios y descansos.

## Seguridad

Los archivos `.env` y sus variantes locales, `node_modules` y la carpeta generada `dist` están excluidos de Git mediante `.gitignore`. No guardes credenciales ni tokens en el repositorio.
