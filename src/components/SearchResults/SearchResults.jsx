import "./SearchResults.css";
import Preloader from "../Preloader/Preloader";
import Card from "../Card/Card";
import { useContext } from "react";
import { SavedArticlesContext } from "../../contexts/SavedArticlesContext";

function SearchResults({
  status,
  articles,
  onLoadMore,
  hasMore,
  visibleCount,
}) {
  const { handleSaveArticle, savedArticles, movieError } =
    useContext(SavedArticlesContext);

  return (
    <section className="search-results">
      {status !== "idle" && (
        <h2 className="search-results__title">Resultados de la busqueda</h2>
      )}
      {movieError && <p className="search-results__error">{movieError}</p>}
      {status === "loading" && <Preloader status="loading" />}
      {status === "empty" && <Preloader status="empty" />}
      {status === "error" && <Preloader status="error" />}

      {status === "loaded" && (
        <div className="search-results__grid">
          {articles.slice(0, visibleCount).map((article) => (
            <Card
              key={article.id}
              article={article}
              buttonType="save"
              onButtonClick={() => handleSaveArticle(article)}
              isSaved={savedArticles.some(
                (eachArticle) => eachArticle.movieId === article.id,
              )}
            />
          ))}
        </div>
      )}
      {hasMore && (
        <button className="search-results__load-more" onClick={onLoadMore}>
          Ver más
        </button>
      )}
    </section>
  );
}

export default SearchResults;
