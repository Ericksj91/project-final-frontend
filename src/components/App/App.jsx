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
import * as moviesApi from "../../utils/moviesApi";
import { setToken, getToken, removeToken } from "../../utils/token";
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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [savedArticles, setSavedArticles] = useState([]);

  const handleRegister = ({ name, password, email }) => {
    setIsLoading(true);
    auth
      .register(name, password, email)
      .then(() => {
        setIsSucces(true);
        setIsInfoToolTipOpen(true);
        handleOpenPopup("login");
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
        handleClosePopup();
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
        onRegisterClick={() => handleOpenPopup("register")}
        isLoading={isLoading}
        loginError={loginError}
        onClearError={() => setLoginError("")}
      />
    ),
  };
  const registerPopup = {
    title: "Registrate",
    children: (
      <Register
        onSubmit={handleRegister}
        onLoginClick={() => handleOpenPopup("login")}
        isLoading={isLoading}
      />
    ),
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      setIsCheckingAuth(false);
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
      })
      .finally(() => {
        setIsCheckingAuth(false);
      });
  }, []);

  function handleOpenPopup(type) {
    setPopup(type);
  }

  function handleClosePopup() {
    setPopup(null);
    setLoginError("");
  }

  function handleInfoToolTipClose() {
    setIsInfoToolTipOpen(false);
  }

  function handleLogout() {
    removeToken();
    setCurrentUser({});
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleSaveArticle(movie) {
    const token = getToken();
    const isAlreadySaved = savedArticles.some(
      (saved) => saved.movieId === movie.id,
    );

    if (isAlreadySaved) {
      const savedMovie = savedArticles.find(
        (saved) => saved.movieId === movie.id,
      );
      moviesApi
        .deleteMovie(savedMovie._id, token)
        .then(() => {
          setSavedArticles((prev) =>
            prev.filter((saved) => saved._id !== savedMovie._id),
          );
        })
        .catch((err) => console.log(err));
    } else {
      const movieData = {
        movieId: movie.id,
        title: movie.title,
        description: movie.description,
        date: movie.date,
        source: "TMDB",
        image: movie.image,
        link: `https://www.themoviedb.org/movie/${movie.id}`,
      };
      moviesApi
        .saveMovie(movieData, token)
        .then((response) => {
          setSavedArticles((prev) => [response.data, ...prev]);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    const token = getToken();
    moviesApi
      .getMovies(token)
      .then((response) => {
        setSavedArticles(response.data);
      })
      .catch((err) => console.log(err));
  }, [isLoggedIn]);

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
                  <Header
                    onLoginClick={() => handleOpenPopup("login")}
                    onLogoutClick={handleLogout}
                  />
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
                  onOpenLoginPopup={() => handleOpenPopup("login")}
                  isCheckingAuth={isCheckingAuth}
                >
                  <SavedMovies onLogoutClick={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          {popup === "login" && (
            <Popup
              onClose={handleClosePopup}
              title={loginPopup.title}
              onCloseClick={handleClosePopup}
            >
              {loginPopup.children}
            </Popup>
          )}

          {popup === "register" && (
            <Popup
              onClose={handleClosePopup}
              title={registerPopup.title}
              onCloseClick={handleClosePopup}
            >
              {registerPopup.children}
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
