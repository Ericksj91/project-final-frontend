import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children, anonymous, onOpenLoginPopup }) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const { isLoggedIn } = useContext(CurrentUserContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    onOpenLoginPopup();
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
