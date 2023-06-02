import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';
import useClosePopup from '../hooks/useClosePopup';

export default function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const textButton = isLoading ? 'Создание...' : 'Создать';

  const handleChangeName = (evt) => setName(evt.target.value);
  const handleChangeImage = (evt) => setImage(evt.target.value);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ name, link: image });
  }

  useClosePopup(isOpen, onClose);
  useEffect(() => {
    setName('');
    setImage('');
  }, [isOpen]);

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} name='add' title='Новое место' textButton={textButton}>
      <input onChange={handleChangeName} value={name} id="title-place-input" name="name" className="popup__input" type="text" placeholder="Название" minLength="2" maxLength="30" required/>
      <span className="title-place-input-error popup__error"></span>
      <input onChange={handleChangeImage} value={image} id="source-image-input" name="link" className="popup__input" type="url" placeholder="Ссылка на картинку" required/>
      <span className="source-image-input-error popup__error"></span>
    </PopupWithForm>
  );
}