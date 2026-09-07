import { useState } from "react";

function Login({ onSubmit, isLoading, onRegisterClick, loginError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormValid(e.target.form.checkValidity());
    setEmailError(e.target.validationMessage);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormValid(e.target.form.checkValidity());
    setPasswordError(e.target.validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form
      className="popup__form"
      name="login-form"
      id="login-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        {loginError && <p className="login__error">{loginError}</p>}
        <span className="popup__field-label">Correo Electrónico</span>
        <input
          className="popup__input popup__input_type_email"
          value={email}
          onChange={handleEmailChange}
          name="email"
          id="login-email"
          type="email"
          placeholder="Correo electrónico"
          required
        />
        <span
          className={`popup__input-error ${emailError ? "popup__input-error_active" : ""}`}
        >
          {emailError}
        </span>
      </label>
      <label className="popup__field">
        <span className="popup__field-label">Contraseña</span>
        <input
          className="popup__input popup__input_type_password"
          value={password}
          onChange={handlePasswordChange}
          name="password"
          id="login-password"
          type="password"
          required
          placeholder="Contraseña"
          minLength="8"
        />
        <span
          className={`popup__input-error ${passwordError ? "popup__input-error_active" : ""}`}
        >
          {passwordError}
        </span>
      </label>
      <button
        className="button popup__button"
        type="submit"
        disabled={!formValid || isLoading}
      >
        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
      <p className="popup__switch-link">
        o{" "}
        <button type="button" onClick={onRegisterClick}>
          Regístrate
        </button>
      </p>
    </form>
  );
}

export default Login;
