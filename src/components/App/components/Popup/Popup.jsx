import close from "../../../../images/close.svg";
import "./Popup.css";

function Popup(props) {
  const { onClose, title, children, className } = props;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className={`popup__content ${className || ""}`}>
        <button
          aria-label="Cerrar ventana emergente"
          className="popup__close"
          type="button"
          onClick={onClose}
        >
          <img alt="Logotipo para cerrar imagen" src={close} />
        </button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}

export default Popup;
