import React from "react";
export default function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  onSubmit,
  buttonText,
  children,
}) {
  return (
    <div className={`popup ${name} ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" onClick={onClose} />
        <h2 className="popup__title">{title}</h2>
        <form
          action="submit"
          onSubmit={onSubmit}
          className="form popup__form"
          name={name}
        >
          {children}
          <fieldset className="form__fieldset">
            <button className="form__button" type="submit">
              {buttonText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}