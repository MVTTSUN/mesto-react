import PopupWithForm from './PopupWithForm';

export default function PopupConfirmDelete() {
  return (
    <PopupWithForm name='confirm-delete' title='Вы уверены?'>
      <button className="popup__submit-button button" type="submit">Да</button>
    </PopupWithForm>
  );
}