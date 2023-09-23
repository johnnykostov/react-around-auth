import React from "react";
export default function ImagePopup(props) {
  return (
    <div
      className={`popup_type_preview popup ${props.isOpen ? "popup_open" : ""}`}
    >
      <div className="popup__content_content_preview">
        <button
          className="popup__close popup__close_preview"
          onClick={props.onClose}
          type="button"
        />
        <img
          src={props.card.link}
          alt={props.card.name}
          className="popup__image"
        />
        <p className="popup__caption">{props.card.name}</p>
      </div>
    </div>
  );
}