import { useContext } from 'react';
import emptyAvatar from '../images/no-avatar.jpg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onOpenConfirmDeletePopup, cards}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile" aria-label="Профиль">
        <div className="profile__container">
          <button onClick={onEditAvatar} type="button" className="profile__avatar-button button" aria-label="Изменить аватар">
            <img src={currentUser.avatar || emptyAvatar} alt="Аватар" className="profile__avatar"/>
          </button>
          <div>
            <div className="profile__name-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button onClick={onEditProfile} type="button" className="profile__edit-button button" aria-label="Редактировать профиль"></button>
            </div>
            <p className="profile__status">{currentUser.about}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button button" aria-label="Добавить фотографию"></button>
      </section>
      <section className="photos" aria-label="Фотографии">
        <ul className="photos__cards-container">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onOpenConfirmDeletePopup={onOpenConfirmDeletePopup}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}