import { useState } from "react";

function Register({ onLoginClick, onSubmit, isLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  function validateConfirmPassword(passwordValue, confirmValue, confirmInput) {
    if (confirmValue !== passwordValue) {
      confirmInput.setCustomValidity("Las contraseñas no coinciden");
    } else {
      confirmInput.setCustomValidity("");
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormValid(e.target.form.checkValidity());
    setEmailError(e.target.validationMessage);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const confirmInput = e.target.form.elements.confirmPassword;
    validateConfirmPassword(e.target.value, confirmInput.value, confirmInput);
    setFormValid(e.target.form.checkValidity());
    setPasswordError(e.target.validationMessage);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validateConfirmPassword(password, e.target.value, e.target);
    setFormValid(e.target.form.checkValidity());
    setConfirmPasswordError(e.target.validationMessage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, password });
  };

  return (
    <form
      className="popup__form"
      name="register-form"
      id="register-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <span className="popup__field-label">Correo Electrónico</span>
        <input
          className="popup__input popup__input_type_email"
          value={email}
          onChange={handleEmailChange}
          name="email"
          id="register-email"
          placeholder="Correo electrónico"
          type="email"
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
          id="register-password"
          type="password"
          placeholder="Contraseña"
          required
          minLength="8"
        />
        <span
          className={`popup__input-error ${passwordError ? "popup__input-error_active" : ""}`}
        >
          {passwordError}
        </span>
      </label>
      <label className="popup__field">
        <span className="popup__field-label">Confirmar Contraseña</span>
        <input
          className="popup__input popup__input_type_confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          name="confirmPassword"
          id="register-confirm-password"
          type="password"
          required
          placeholder="Confirmar Contraseña"
          minLength="8"
        />
        <span
          className={`popup__input-error ${confirmPasswordError ? "popup__input-error_active" : ""}`}
        >
          {confirmPasswordError}
        </span>
      </label>
      <button
        className="button popup__button"
        type="submit"
        disabled={!formValid || isLoading}
      >
        {isLoading ? "Registrando..." : "Registrarse"}
      </button>
      <p className="popup__switch-link">
        o{" "}
        <button type="button" onClick={onLoginClick}>
          Inicia sesión
        </button>
      </p>
    </form>
  );
}

export default Register;
