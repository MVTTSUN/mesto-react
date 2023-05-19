import { useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import useClosePopup from '../hooks/useClosePopup';

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const textButton = isLoading ? 'Сохранение...' : 'Сохранить';

  const handleChangeName = (evt) => setName(evt.target.value);
  const handleChangeDescription = (evt) => setDescription(evt.target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({ name, about: description});
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  useClosePopup(isOpen, onClose);

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} name='edit' title='Редактировать профиль' textButton={textButton}>
      <input onChange={handleChangeName} value={name} id="name-input" name="name" className="popup__input" type="text" placeholder="Имя" minLength="2" maxLength="40" required/>
      <span className="name-input-error popup__error"></span>
      <input onChange={handleChangeDescription} value={description} id="status-input" name="about" className="popup__input" type="text" placeholder="Статус" minLength="2" maxLength="200" required/>
      <span className="status-input-error popup__error"></span>
    </PopupWithForm>
  );
}