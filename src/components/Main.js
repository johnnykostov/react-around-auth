import React, { useContext } from "react";
import profileChange from "../images/edit.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfileClick,
  onEditAvatarClick,
  onAddPlaceClick,
  onCardClick,
  cards,
  onCardLike,
  onDeleteClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar">
          <button
            onClick={onEditAvatarClick}
            type="button"
            className="profile__change-button"
          >
            <img
              className="profile__change-button-icon"
              alt="vector of edit icon"
              src={profileChange}
            />
          </button>
          <img
            onClick={onEditAvatarClick}
            src={currentUser.avatar}
            alt="profile pic"
            className="profile__image"
          />
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__name-info">{currentUser.name}</h1>
              <button
                onClick={onEditProfileClick}
                type="button"
                className="profile__name-button"
              />
            </div>
            <p className="profile__info-job">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlaceClick}
          type="button"
          className="profile__button-add"
        />
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => {
            return (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onDeleteClick={onDeleteClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}