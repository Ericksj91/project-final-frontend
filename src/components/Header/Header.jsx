import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

function Header({ onLoginClick, onLogoutClick }) {
  return (
    <>
      <header className="header page__section">
        <Logo />
        <Navigation onLoginClick={onLoginClick} onLogoutClick={onLogoutClick} />
      </header>
    </>
  );
}

export default Header;
