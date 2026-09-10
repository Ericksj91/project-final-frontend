import { useState } from "react";
import "./Main.css";
import About from "../About/About";
import SearchResults from "../SearchResults/SearchResults";
import api from "../../utils/api";
import { useContext } from "react";
import { SavedArticlesContext } from "../../contexts/SavedArticlesContext";
import imageFondo from "../../images/image_fondo.png";

function Main() {
  const { handleSaveArticle, savedArticles, setMovieError } = useContext(SavedArticlesContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("idle");
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  function handleSearchSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setVisibleCount(3);
    setMovieError("");

    api
      .getInfo(
        `search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${searchQuery}&language=es-ES`,
      )
      .then((data) => {
        if (data.results.length === 0) {
          setStatus("empty");
        } else {
          const formattedArticles = data.results.map((item) => ({
            id: item.id,
            image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            title: item.title,
            date: item.release_date,
            description: item.overview,
            source: "TMDB",
          }));
          setArticles(formattedArticles);
          setStatus("loaded");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }

  function handleLoadMore() {
    setVisibleCount((prev) => prev + 3);
  }

  return (
    <>
      <div className="content">
        <section
          className="search-form page section"
          style={{ backgroundImage: `url(${imageFondo})` }}
        >
          <h1 className="search-form__title">
            ¿Qué película deseas buscar el día de hoy?
          </h1>
          <h2 className="search-form__subtitle">
            Encuentra la información de tu pélicula favorita y guardala en tu
            cuenta personal
          </h2>
          <form className="search-bar" onSubmit={handleSearchSubmit}>
            <input
              className="search-bar__input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            ></input>
            <button className="search-bar__button" type="submit">
              Buscar
            </button>
          </form>
        </section>
        <SearchResults
          status={status}
          articles={articles}
          handleSaveArticle={handleSaveArticle}
          savedArticles={savedArticles}
          onLoadMore={handleLoadMore}
          hasMore={visibleCount < articles.length}
          visibleCount={visibleCount}
        />
        <section>
          <About />
        </section>
      </div>
    </>
  );
}

export default Main;
