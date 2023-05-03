import PopupWithForm from './PopupWithForm';

export default function PopupAddCard({isOpen, onClose}) {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} name='add' title='Новое место'>
      <input id="title-place-input" name="name" className="popup__input" type="text" placeholder="Название" minLength="2" maxLength="30" required/>
      <span className="title-place-input-error popup__error"></span>
      <input id="source-image-input" name="link" className="popup__input" type="url" placeholder="Ссылка на картинку" required/>
      <span className="source-image-input-error popup__error"></span>
      <button className="popup__submit-button button" type="submit">Создать</button>
    </PopupWithForm>
  );
}