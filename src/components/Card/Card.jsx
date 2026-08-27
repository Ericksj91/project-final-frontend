import "./Card.css";
import deleteIcon from "../../images/delete-icon.svg";
import savedIcon from "../../images/saveIcon.svg";

function Card({ article, isSaved, buttonType, onButtonClick }) {
  return (
    <li className="card">
      <img className="card__image" src={article.image} alt={article.title} />
      <button
        className={`card__save-button card__save-button_${buttonType} ${isSaved ? "card__save-button_saved" : ""}`}
        aria-label={isSaved ? "Artículo guardado" : "Guardar artículo"}
        onClick={() => onButtonClick(article)}
        type="button"
      >
        {" "}
        <img
          className="card__save-icon"
          src={buttonType === "save" ? savedIcon : deleteIcon}
          alt={buttonType === "save" ? "Icono de Guardar" : "Icono de Eliminar"}
        />
      </button>
      <div className="card__info">
        <p className="card__date">{article.date}</p>
        <h3 className="card__title">{article.title}</h3>
        <p className="card__description">{article.description}</p>
        <p className="card__source">{article.source}</p>
      </div>
    </li>
  );
}

export default Card;
