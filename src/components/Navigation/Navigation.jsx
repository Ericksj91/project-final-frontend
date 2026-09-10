import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./Navigation.css";

function Navigation({ onLoginClick, onLogoutClick }) {
  const { isLoggedIn } = useContext(CurrentUserContext);

  return (
    <nav className="menu">
      <NavLink to="/" className="menu__inicio">
        Inicio
      </NavLink>
      {isLoggedIn && (
        <NavLink to="/saved-movies" className="menu__saved-movies">
          Películas guardadas
        </NavLink>
      )}
      {isLoggedIn ? (
        <button className="menu__button" onClick={onLogoutClick}>
          Cerrar sesión
        </button>
      ) : (
        <button className="menu__button" onClick={onLoginClick}>
          Iniciar sesión
        </button>
      )}
    </nav>
  );
}

export default Navigation;
