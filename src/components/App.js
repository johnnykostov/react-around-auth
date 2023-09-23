import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import "../index.css";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import DeletePopup from "./DeletePopup.js";
import Register from "./Register.js";
import { signUp, signIn, checkToken } from "../utils/auth.js";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import InfoToolTip from "./InfoToolTip.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [infoToolTipType, setInfoToolTipType] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState([]);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.data.email);
          history.push("/react-around-auth");
        })
        .catch((err) => {
          console.log(err);
          history.push("/signIn");
          setLoggedIn(false);
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    }
  }, [loggedIn, history, token]);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleDeleteClick = (card) => {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePreviewOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoToolTipOpen(false);
  };

  const handleCardClick = (card) => {
    setIsImagePreviewOpen(true);
    setSelectedCard(card);
  };
  const handleUpdateUser = (userData) => {
    setIsLoading(true);
    api
      .editProfile(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleUpdateAvatar = (url) => {
    setIsLoading(true);

    api
      .editAvatar(url)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegister = (email, password) => {
    signUp(email, password)
      .then((res) => {
        if (res.data._id) {
          setInfoToolTipType("successful");
          history.push("/signIn");
        } else {
          setInfoToolTipType("unsuccessful");
          history.push("/signUp");
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipType("error");
      })
      .finally(() => {
        setIsInfoToolTipOpen(true);
        setIsLoading(false);
      });
  };

  const handleLogin = (email, password) => {
    signIn(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("token", res.token);
          setUserEmail(email);
          history.push("/react-around-auth");
        } else {
          setInfoToolTipType(false);
          setIsInfoToolTipOpen(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoToolTipType("error");
        setIsInfoToolTipOpen(true);
      })
      .finally(() => {
        setIsCheckingToken(false);
        setIsLoading(false);
      });
  };
  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    history.push("/signIn");
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(console.log);
  }
  function handleCardDelete(e) {
    e.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then((res) => {
        const newCards = cards.filter(
          (currentCard) => currentCard._id !== selectedCard._id
        );
        setCards(newCards);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);

    api
      .addCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch(console.log)
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="page">
      <div className="page__content">
        <CurrentUserContext.Provider
          value={{ currentUser: currentUser, userEmail: userEmail }}
        >
          <Header
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userEmail={userEmail}
            handleSignout={handleSignout}
          />
          <Switch>
            <ProtectedRoute
              path="/react-around-auth"
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              isCheckingToken={isCheckingToken}
            >
              <Main
                onEditProfileClick={handleEditProfileClick}
                onAddPlaceClick={handleAddPlaceClick}
                onEditAvatarClick={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onDeleteClick={handleDeleteClick}
                cards={cards}
              />
            </ProtectedRoute>
            <Route path="/signUp">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/signIn">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? (
                <Redirect to="/react-around-auth" />
              ) : (
                <Redirect to="/signIn" />
              )}
            </Route>
          </Switch>
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
            onAddPlaceSubmit={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <DeletePopup
            isLoading={isLoading}
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePreviewOpen}
            onClose={closeAllPopups}
          />
          <InfoToolTip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            type={infoToolTipType}
            name="tooltip"
          />
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;