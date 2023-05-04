import { useEffect, useState } from 'react';
import emptyAvatar from '../images/no-avatar.jpg';
import { api } from '../utils/api';
import Card from './Card';

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState(emptyAvatar);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(({name, about, avatar}) => {
        setUserName(name);
        setUserDescription(about);
        setUserAvatar(avatar);
      })
      .catch((err) => console.log(err));
  }, [])

  useEffect(() => {
    api.getCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err));
  }, [])

  return (
    <main>
      <section className="profile" aria-label="Профиль">
        <div className="profile__container">
          <button onClick={onEditAvatar} type="button" className="profile__avatar-button button" aria-label="Изменить аватар">
            <img src={userAvatar} alt="Аватар" className="profile__avatar"/>
          </button>
          <div>
            <div className="profile__name-container">
              <h1 className="profile__name">{userName}</h1>
              <button onClick={onEditProfile} type="button" className="profile__edit-button button" aria-label="Редактировать профиль"></button>
            </div>
            <p className="profile__status">{userDescription}</p>
          </div>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__add-button button" aria-label="Добавить фотографию"></button>
      </section>
      <section className="photos" aria-label="Фотографии">
        <ul className="photos__cards-container">
          {cards.map((card) => (<Card key={card._id} card={card} onCardClick={onCardClick} />))}
        </ul>
      </section>
    </main>
  );
}