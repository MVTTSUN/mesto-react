import PopupWithForm from './PopupWithForm';

export default function PopupEditProfile({isOpen, onClose}) {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} name='edit' title='Редактировать профиль'>
      <input id="name-input" name="name" className="popup__input" type="text" placeholder="Имя" minLength="2" maxLength="40" required/>
      <span className="name-input-error popup__error"></span>
      <input id="status-input" name="about" className="popup__input" type="text" placeholder="Статус" minLength="2" maxLength="200" required/>
      <span className="status-input-error popup__error"></span>
      <button className="popup__submit-button button" type="submit">Сохранить</button>
    </PopupWithForm>
  );
}