import useClosePopup from "../hooks/useClosePopup";

export default function PopupWithForm({children, title, name, textButton, isOpen, onClose, onSubmit, isLoading}) {
  useClosePopup(isOpen, onClose);

  return (
    <div id={`popup-${name}`} className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button onClick={onClose} type="button" className="popup__close-button button" aria-label="Закрытие формы"></button>
        <form onSubmit={onSubmit} className="popup__form" action="#" id={`form-popup-${name}`} name={`form-popup-${name}`}>
          <h2 className="popup__name">{title}</h2>
          {children}
          <button disabled={isLoading} className="popup__submit-button button" type="submit">{textButton}</button>
        </form>
      </div>
    </div>
  );
}