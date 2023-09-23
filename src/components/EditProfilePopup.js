import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
}) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const [name, setName] = useState(" ");
  const [about, setDescription] = useState(" ");

  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about,
    });
  }
  return (
    <PopupWithForm
      title="Edit profile"
      name="popup popup_type_profile"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "saving..." : "save"}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          id="name_input"
          type="text"
          className="form__input form__input_type_name"
          placeholder="Name"
          name="name"
          required
          minLength={2}
          maxLength={40}
          onChange={handleNameChange}
          value={name || ""}
        />
        <span id="name_input-error" className="form__input-error"></span>
        <input
          id="job_input"
          type="text"
          className="form__input form__input_type_job"
          placeholder="About me"
          name="job"
          required
          minLength={2}
          maxLength={400}
          onChange={handleDescriptionChange}
          value={about || ""}
        />
        <span id="job_input-error" className="form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}