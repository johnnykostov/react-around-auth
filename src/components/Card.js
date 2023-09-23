import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
export default function Card(props) {
  
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_filled"
  }`;

  
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleDelete() {
    props.onDeleteClick(props.card);
  }
  return (
    <li className="cards__item card">
      {isOwn && (
        <button
          className="card__delete-button"
          type="button"
          onClick={handleDelete}
        />
      )}
      <img
        className="card__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="card__info">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <div className="card__likes-count">{props.card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}