import { useLocation, NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({ onLoginClick, onLogoutClick }) {
  const location = useLocation();
  const isSavedMoviesPage = location.pathname === "/saved-movies";

  if (isSavedMoviesPage) {
    return (
      <>
        <nav className="menu">
          <NavLink to="/" className="menu__inicio">
            Inicio
          </NavLink>
          <NavLink to="/saved-movies" className="menu__saved-movies">
            Películas guardadas
          </NavLink>

          <button className="menu__button" onClick={onLogoutClick}>
            Cerrar sesión
          </button>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="menu">
        <NavLink to="/" className="menu__inicio">
          Inicio
        </NavLink>
        <NavLink to="/saved-movies" className="menu__saved-movies">
          Películas guardadas
        </NavLink>
        <button className="menu__button" onClick={onLoginClick}>
          Iniciar sesión
        </button>
      </nav>
    </>
  );
}

export default Navigation;
