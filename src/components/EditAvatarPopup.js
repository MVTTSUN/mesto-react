import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import useClosePopup from '../hooks/useClosePopup';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
  const avatarRef = useRef(null);
  const textButton = isLoading ? 'Сохранение...' : 'Сохранить';

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  useClosePopup(isOpen, onClose);
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} name='avatar' title='Обновить аватар' textButton={textButton}>
      <input ref={avatarRef} id="avatar-image-input" name="avatar" className="popup__input" type="url" placeholder="Ссылка на картинку" required/>
      <span className="avatar-image-input-error popup__error"></span>
    </PopupWithForm>
  );
}