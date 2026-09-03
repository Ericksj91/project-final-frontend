# 🎬 Movies Explorer

Aplicación web para buscar películas utilizando la API de [TMDB (The Movie Database)](https://www.themoviedb.org/). Proyecto final (capstone) del bootcamp de desarrollo web de TripleTen, en modalidad full stack libre.

Este repositorio corresponde al **frontend** del proyecto.

## 📋 Descripción

Movies Explorer permite buscar películas por nombre, ver los resultados con su información básica (imagen, título, fecha de estreno y descripción) y guardarlas en una lista personal de favoritos.

## ✨ Funcionalidades

- **Búsqueda de películas** conectada a la API de TMDB (endpoint `search/movie`)
- **Estados de carga**: preloader mientras se busca, mensaje de "sin resultados" y manejo de errores
- **Tarjetas de película** con botón para guardar/quitar de favoritos
- **Películas guardadas**: ruta `/saved-movies` con persistencia en `localStorage`
- **Paginación del lado del cliente** ("Ver más") para no mostrar todos los resultados de golpe
- **Fondo con imagen y overlay** en la sección principal de búsqueda
- **Ventanas emergentes (popups)** de inicio de sesión y registro, con:
  - Validación de campos en tiempo real (formato de correo, longitud mínima de contraseña, coincidencia de contraseñas)
  - Botón deshabilitado hasta que el formulario sea válido
  - Cierre con botón "X" o haciendo clic fuera del popup
  - Enlace para alternar entre "Iniciar sesión" y "Registrarse"
- Diseño responsive con media queries

## 🛠️ Tecnologías

- React + Vite
- React Router
- Context API (para manejo de películas guardadas)
- CSS puro (sin frameworks)
- API externa: [TMDB API](https://developer.themoviedb.org/docs)

## ⚙️ Instalación y configuración

1. Clonar el repositorio e instalar dependencias:

   ```bash
   git clone <url-del-repositorio>
   cd project-final-frontend
   npm install
   ```

2. Crear un archivo `.env` en la raíz del proyecto (mismo nivel que `package.json`), usando `.env.example` como referencia:

   ```
   VITE_TMDB_API_KEY=tu_api_key_aqui
   ```

3. Obtener una API key gratuita de TMDB en [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

4. Ejecutar el proyecto en modo desarrollo:

   ```bash
   npm run dev
   ```

## ⚠️ Estado actual del proyecto

Este proyecto se está entregando en dos partes:

- **Parte 1 (actual):** frontend completo — interfaz, búsqueda, guardado local de películas, y las ventanas emergentes de **Iniciar sesión** y **Registrarse** ya están construidas visualmente, con toda su validación de formulario funcionando.
- **Parte 2 (pendiente):** conexión de esos formularios con el backend de autenticación. Por ahora, **iniciar sesión y registrarse no crean ni verifican usuarios reales** — los formularios son funcionales en cuanto a UI y validación, pero su envío no está conectado todavía a un servidor. Esto se implementará en la segunda entrega del proyecto, junto con el backend correspondiente.

## 📌 Pendientes

- Conectar `Login` y `Register` con la API del backend (`utils/auth.js`)
- Persistencia de sesión de usuario
- Tooltip "Inicia sesión para guardar artículos" para usuarios no autenticados
- Funcionalidad real del botón "Cerrar sesión"

## 👤 Autor

Erick — Proyecto final del bootcamp de desarrollo web de TripleTen.
