import React, { useEffect } from "react";
import successfulIcon from "../images/Union.svg";
import unsuccessfulIcon from "../images/Unsuccessful.svg";
import Popup from "./Popup";

const InfoToolTip = ({ isOpen, onClose, type }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  const getMessage = () => {
    switch (type) {
      case "successful":
        return "Success! You have now been registered.";
      case "unsuccessful":
        return "Oops, something went wrong! Please try again.";
      case "error":
        return "There was a server error. Please try again later.";
      default:
        return "";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "successful":
        return successfulIcon;
      case "unsuccessful":
        return unsuccessfulIcon;
      case "error":
        return unsuccessfulIcon;
      default:
        return "";
    }
  };

  return (
    <Popup isOpen={isOpen} name="tooltip" onClose={onClose}>
      <img
        src={getIcon()}
        className="  popup__tooltip__image"
        alt={`${type === "successful" ? "successful" : "unsuccessful"} attempt`}
      />
      <h2 className="popup__tooltip__text">{getMessage()}</h2>
    </Popup>
  );
};

export default InfoToolTip;