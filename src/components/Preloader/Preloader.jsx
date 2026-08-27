import "./Preloader.css";
import sadIcon from "../../images/sadIcon.svg";

function Preloader({ status }) {
  return (
    <div className="preloader">
      {status === "loading" && (
        <div className="preloader__loading">
          <div className="preloader__spinner"></div>
          <p className="preloader__text">Buscando noticias...</p>
        </div>
      )}

      {status === "empty" && (
        <div className="preloader__empty">
          <img
            className="preloader__empty-icon"
            src={sadIcon}
            alt="No se encontraron resulados"
          />
          <h3 className="preloader__empty-title">No se encontró nada</h3>
          <p className="preloader__empty-subtitle">
            Lo sentimos, pero no hay nada que coincida con tus términos de
            búsqueda
          </p>
        </div>
      )}
    </div>
  );
}

export default Preloader;
