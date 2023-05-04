import PopupWithForm from './PopupWithForm';

export default function PopupConfirmDelete() {
  return (
    <PopupWithForm name='confirm-delete' title='Вы уверены?' textButton='Да' />
  );
}