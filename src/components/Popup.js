import React from "react";

const Popup = ({ isOpen, onClose, name, title, children }) => {
  return (
    <div className={`popup ${name} ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__content">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Popup;