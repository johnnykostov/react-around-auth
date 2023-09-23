import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  //  consts
  const url = useRef();
  // function
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(url.current.value);
  }
  return (
    <PopupWithForm
      title="Update profile picture"
      name="popup popup_type_avatar"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "saving..." : "save"}
      onSubmit={handleSubmit}
    >
      <fieldset className="form__fieldset">
        <input
          id="link_input-avatar"
          type="url"
          ref={url}
          className="form__input form__input_type_url"
          placeholder="image URL"
          name="link"
          required
        />
        <span id="link_input-avatar-error" className="form__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}