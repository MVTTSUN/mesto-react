import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ link: '', name: '' });
  const [currentUser, setCurrentUser] = useState({ name: '', about: '', avatar: '', _id: '' });
  const [cards, setCards] = useState([]);
  const [focusCardDelete, setFocusCardDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard({ link: '', name: '' })
  };

  const handleCardLike = (currCard) => {
    const isLiked = currCard.likes.some((like) => like._id === currentUser._id);
    
    !isLiked
      ? api.sendLike(currCard._id)
          .then((newCard) => {
            setCards((prevState) => prevState.map((card) => card._id === currCard._id ? newCard : card));
          })
          .catch((err) => console.log(err))
      : api.deleteLike(currCard._id)
          .then((newCard) => {
            setCards((prevState) => prevState.map((card) => card._id === currCard._id ? newCard : card));
          })
          .catch((err) => console.log(err));
  };

  const handleOpenConfirmDeletePopup = (currCard) => {
    setIsConfirmDeletePopupOpen(true);
    setFocusCardDelete(currCard);
  };

  const handleCardDelete = () => {
    setIsLoading(true);

    api.deleteCard(focusCardDelete._id)
      .then(() => {
        setCards((prevState) => prevState.filter((card) => card._id !== focusCardDelete._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateUser = (user) => {
    setIsLoading(true);

    api.updateUserInfo(user)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);

    api.updateUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const handleAddPlace = (dataCard) => {
    setIsLoading(true);

    api.sendCard(dataCard)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    api.getCards()
      .then((cards) => setCards(cards))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api.getUserInfo()
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, _id });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onOpenConfirmDeletePopup={handleOpenConfirmDeletePopup}
        cards={cards}
      />

      <Footer />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
        isLoading={isLoading}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}
