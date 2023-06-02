import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onOpenConfirmDeletePopup}) {
  const { link, name, likes, owner } = card;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some((like) => like._id === currentUser._id);
  const cardLikeButtonClass = `card__like-button ${isLiked ? 'card__like-button_active' : ''} button`;

  const handleLikeClick = () => onCardLike(card);

  const handleDeleteClick = () => onOpenConfirmDeletePopup(card);

  return (
    <li className="card">
      {isOwn && <button onClick={handleDeleteClick} type="button" className="card__trash-button button" aria-label="Корзина"></button>}
      <img onClick={() => onCardClick(card)} src={link} alt={name} className="card__img"/>
      <div className="card__container">
        <h2 className="card__name">{name}</h2>
        <div>
          <button onClick={handleLikeClick} type="button" className={cardLikeButtonClass} aria-label="Лайк"></button>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}