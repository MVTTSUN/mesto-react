export default function Card({card, onCardClick}) {
  const {link, name, likes} = card;

  return (
    <li className="card">
      <button type="button" className="card__trash-button button" aria-label="Корзина"></button>
      <img onClick={() => onCardClick(card)} src={link} alt={name} className="card__img"/>
      <div className="card__container">
        <h2 className="card__name">{name}</h2>
        <div>
          <button type="button" className="card__like-button button" aria-label="Лайк"></button>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
    </li>
  );
}