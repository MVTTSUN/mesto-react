import useClosePopup from '../hooks/useClosePopup';
import PopupWithForm from './PopupWithForm';

export default function ConfirmDeletePopup({ isOpen, onClose, onCardDelete, isLoading }) {
  const textButton = isLoading ? 'Удаление...' : 'Да';
  
  useClosePopup(isOpen, onClose);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm isLoading={isLoading} onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} name='confirm-delete' title='Вы уверены?' textButton={textButton} />
  );
}