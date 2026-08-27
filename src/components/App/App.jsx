import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import SavedMovies from "../SavedMovies/SavedMovies";
import { SavedArticlesContext } from "../../contexts/SavedArticlesContext";
import Popup from "./components/Popup/Popup";
import Login from "./components/Popup/Login/Login";
import Register from "./components/Popup/Register/Register";

function App() {
  const [popup, setPopup] = useState(null);
  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("savedArticles");
    return saved ? JSON.parse(saved) : [];
  });
  const loginPopup = {
    title: "Iniciar Sesión",
    children: (
      <Login
        onSubmit={(data) => console.log("login:", data)}
        onRegisterClick={() => handleOpenPopup(registerPopup)}
      />
    ),
  };
  const registerPopup = {
    title: "Registrate",
    children: (
      <Register
        onSubmit={(data) => console.log("register:", data)}
        onLoginClick={() => handleOpenPopup(loginPopup)}
      />
    ),
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleSaveArticle(article) {
    const isAlreadySaved = savedArticles.some(
      (eachArticle) => eachArticle.id === article.id,
    );
    if (isAlreadySaved) {
      setSavedArticles((prevArticles) =>
        prevArticles.filter((eachArticle) => eachArticle.id !== article.id),
      );
    } else {
      setSavedArticles((newArticle) => [article, ...newArticle]);
    }
  }

  useEffect(() => {
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
  }, [savedArticles]);

  return (
    <>
      <SavedArticlesContext.Provider
        value={{ handleSaveArticle, savedArticles }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <div className="page__content">
                <Header onLoginClick={() => handleOpenPopup(loginPopup)} />
                <Main />
                <Footer />
              </div>
            }
          />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {popup && (
          <Popup
            onClose={handleClosePopup}
            title={popup.title}
            className={popup.className}
            onCloseClick={handleClosePopup}
          >
            {popup.children}
          </Popup>
        )}
      </SavedArticlesContext.Provider>
    </>
  );
}

export default App;
