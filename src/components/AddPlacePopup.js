import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlaceSubmit,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState(" ");
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlaceSubmit({ name, link });
  }
  const handleCardName = (e) => {
    setName(e.target.value);
  };
  const handleCardLink = (e) => {
    setLink(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);
  return (
    <PopupWithForm
      title="New place"
      name="popup popup_type_add-card"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "saving..." : "create"}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          id="title_input"
          type="text"
          className="form__input form__input_type_title"
          placeholder="Title"
          name="title"
          required
          minLength="1"
          maxLength="30"
          onChange={handleCardName}
          value={name}
        />
        <span id="title_input-error" className="form__input-error"></span>

        <input
          id="link_input"
          type="url"
          className="form__input form__input_type_url"
          placeholder="image URL"
          name="link"
          required
          onChange={handleCardLink}
          value={link}
        />
        <span id="link_input-error" className="form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}