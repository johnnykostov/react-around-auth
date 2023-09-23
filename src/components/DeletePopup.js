import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePopup({
  isOpen,
  onClose,
  onSubmitDelete,
  isLoading,
}) {
  return (
    <PopupWithForm
      title="Are you sure?"
      name="popup popup_type_confirm-delete"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? "Deleting..." : "Yes"}
      onSubmit={onSubmitDelete}
    />
  );
}