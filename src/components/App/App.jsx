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
import InfoTooltip from "../InfoToolTip/InfoToolTip";
import * as auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [popup, setPopup] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [savedArticles, setSavedArticles] = useState(() => {
    const saved = localStorage.getItem("savedArticles");
    return saved ? JSON.parse(saved) : [];
  });

  const handleRegister = ({ name, password, email }) => {
    setIsLoading(true);
    auth
      .register(name, password, email)
      .then(() => {
        setIsSucces(true);
        setIsInfoToolTipOpen(true);
        handleOpenPopup(loginPopup);
      })
      .catch((err) => {
        setIsSucces(false);
        setIsInfoToolTipOpen(true);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      setLoginError(true);
      return;
    }
    setIsLoading(true);
    auth
      .authorize(password, email)
      .then((data) => {
        setToken(data.token);
        return auth.checkToken(data.token);
      })
      .then((currentUser) => {
        setLoginError("");
        setCurrentUser(currentUser);
        setIsLoggedIn(true);
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath);
      })
      .catch((err) => {
        setLoginError("Correo electrónico o contraseña incorrectos");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loginPopup = {
    title: "Iniciar Sesión",
    children: (
      <Login
        onSubmit={handleLogin}
        onRegisterClick={() => handleOpenPopup(registerPopup)}
        isLoading={isLoading}
        loginError={loginError}
      />
    ),
  };
  const registerPopup = {
    title: "Registrate",
    children: (
      <Register
        onSubmit={handleRegister}
        onLoginClick={() => handleOpenPopup(loginPopup)}
        isLoading={isLoading}
      />
    ),
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .checkToken(jwt)
      .then((currentUser) => {
        setCurrentUser(currentUser);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleInfoToolTipClose() {
    setIsInfoToolTipOpen(false);
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

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
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
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  anonymous={false}
                  onOpenLoginPopup={() => handleOpenPopup(loginPopup)}
                >
                  <SavedMovies />
                </ProtectedRoute>
              }
            />
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
          {isInfoToolTipOpen && (
            <InfoTooltip
              isSuccess={isSuccess}
              onClose={handleInfoToolTipClose}
            />
          )}
        </SavedArticlesContext.Provider>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
