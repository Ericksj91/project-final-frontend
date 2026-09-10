import { useContext } from "react";
import Footer from "../Footer/Footer";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import Card from "../Card/Card";
import "./SavedMovies.css";
import { SavedArticlesContext } from "../../contexts/SavedArticlesContext";

function SavedMovies({ onLogoutClick }) {
  const { savedArticles, handleSaveArticle, movieError } =
    useContext(SavedArticlesContext);

  return (
    <div className="page__content">
      <header className="header page__section">
        <Logo />
        <Navigation onLogoutClick={onLogoutClick} />
      </header>
      <div className="saved-movies page__section">
        <h1 className="saved-movies__title">Películas guardadas</h1>
        <p className="saved-movies__description">
          Lista de películas guardadas.
        </p>
        {movieError && <p className="saved-movies__error">{movieError}</p>}

        {savedArticles.length === 0 ? (
          <p className="saved-movies__no-articles">
            No hay películas guardadas. Guarda algunas para verlas aquí.
          </p>
        ) : (
          <div className="saved-movies__grid">
            {savedArticles.map((article) => (
              <Card
                key={article._id}
                article={article}
                buttonType="delete"
                onButtonClick={() => handleSaveArticle({ id: article.movieId })}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SavedMovies;
