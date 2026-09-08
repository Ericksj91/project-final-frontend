# 🎬 Movies Explorer

Aplicación web para buscar películas utilizando la API de [TMDB (The Movie Database)](https://www.themoviedb.org/). Proyecto final (capstone) del bootcamp de desarrollo web de TripleTen, en modalidad full stack libre.

Este repositorio corresponde al **frontend** del proyecto.

Este repositorio corresponde al **frontend** del proyecto.

## 🔗 Enlaces del proyecto desplegado

- **Frontend:** [https://moviesexplorer.okzk.com] [https://www.moviesexplorer.okzk.com]
- **Backend / API:** [https://api.moviesexplorer.okzk.com]

## 📋 Descripción

Movies Explorer permite buscar películas por nombre, ver los resultados con su información básica (imagen, título, fecha de estreno y descripción), guardarlas en una lista personal de favoritos sincronizada con un backend propio, y gestionar una cuenta de usuario con inicio de sesión, registro y cierre de sesión reales.

## ✨ Funcionalidades

- **Búsqueda de películas** conectada a la API de TMDB (endpoint `search/movie`)
- **Estados de carga**: preloader mientras se busca, mensaje de "sin resultados" y manejo de errores
- **Tarjetas de película** con botón para guardar/quitar de favoritos
- **Películas guardadas**, sincronizadas con el backend propio (no solo `localStorage`):
  - Ruta protegida `/saved-movies`
  - Al guardar o eliminar una película, se envía la solicitud correspondiente (`POST`/`DELETE`) a la API del backend, y el estado local se actualiza recién con la confirmación del servidor
  - Al iniciar sesión, se cargan automáticamente las películas guardadas del usuario (`GET /movies`)
- **Paginación del lado del cliente** ("Ver más") para no mostrar todos los resultados de golpe
- **Fondo con imagen y overlay** en la sección principal de búsqueda
- **Autenticación completa**, conectada a un backend propio (Node.js/Express/MongoDB):
  - Registro e inicio de sesión con validación de campos en tiempo real (formato de correo, longitud mínima de contraseña, coincidencia de contraseñas)
  - Botón deshabilitado hasta que el formulario sea válido, con estado de carga ("Iniciando sesión...", "Registrando...")
  - Manejo de errores del servidor mostrados directamente en el formulario, que se limpian automáticamente al escribir de nuevo o cerrar el popup
  - Token JWT guardado en `localStorage`, con verificación automática al cargar la app para mantener la sesión activa entre recargas
  - Ventana de confirmación (`InfoTooltip`) tras un registro exitoso o fallido
  - **Cierre de sesión real**, que limpia el token y el estado del usuario
  - **Rutas protegidas** (`ProtectedRoute`): un usuario no autenticado que intenta acceder a `/saved-movies` es redirigido a la página principal con el popup de inicio de sesión abierto automáticamente
  - **Header dinámico**: muestra "Iniciar sesión" para usuarios no autenticados, o el enlace a "Películas guardadas" + "Cerrar sesión" para usuarios con sesión activa
- **Ventanas emergentes (popups)** de inicio de sesión y registro, con:
  - Cierre con botón "X" o haciendo clic fuera del popup
  - Enlace para alternar entre "Iniciar sesión" y "Registrarse"
- Diseño responsive con media queries

## 🛠️ Tecnologías

- React + Vite
- React Router (incluyendo rutas protegidas)
- Context API (`CurrentUserContext` para sesión de usuario, `SavedArticlesContext` para películas guardadas)
- CSS puro (sin frameworks)
- API externa: [TMDB API](https://developer.themoviedb.org/docs)
- Backend propio: Node.js, Express y MongoDB ([repositorio del backend](https://github.com/Ericksj91/project-final-backend))

## ⚙️ Instalación y configuración

1. Clonar el repositorio e instalar dependencias:

```bash
   git clone <url-del-repositorio>
   cd project-final-frontend
   npm install
```

2. Crear un archivo `.env` en la raíz del proyecto (mismo nivel que `package.json`), usando `.env.example` como referencia:

3. Obtener una API key gratuita de TMDB en [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).

4. Ejecutar el proyecto en modo desarrollo:

```bash
   npm run dev
```

> **Nota:** la URL del backend (`BASE_URL`) está configurada en `utils/auth.js`, apuntando al backend ya desplegado en producción (`https://api.moviesexplorer.okzk.com`).

## 🌐 Backend

Repositorio del backend: [project-final-backend](https://github.com/Ericksj91/project-final-backend)

## 👤 Autor

Erick — Proyecto final del bootcamp de desarrollo web de TripleTen.
