import PopupWithForm from './PopupWithForm';

export default function PopupEditAvatar({isOpen, onClose}) {
  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} name='avatar' title='Обновить аватар' textButton='Сохранить'>
      <input id="avatar-image-input" name="avatar" className="popup__input" type="url" placeholder="Ссылка на картинку" required/>
      <span className="avatar-image-input-error popup__error"></span>
    </PopupWithForm>
  );
}