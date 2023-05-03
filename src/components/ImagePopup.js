import useClosePopup from '../hooks/useClosePopup';

export default function ImagePopup({card, onClose, isOpen}) {
  const {link, name} = card;
  useClosePopup(isOpen, onClose);

  return (
    <div id="popup-picture" className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_picture">
        <button onClick={onClose} type="button" className="popup__close-button button" aria-label="Закрытие полноэкранного просмотра картинки"></button>
        <figure className="popup__figure">
          <img className="popup__img" src={link} alt={name}/>
          <figcaption className="popup__caption">{name}</figcaption>
        </figure>
      </div>
    </div>
  );
}