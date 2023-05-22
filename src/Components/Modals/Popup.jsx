import React from "react";
import "./Modals.css";
import CloseIcon from "../../assets/icons/close.svg";
import WarningIcon from "../../assets/icons/warning-icon.svg";
import SuccessIcon from "../../assets/icons/success-icon.svg";

const Popup = ({
  isOpen,
  handleClose,
  text,
  type = "success",
  choice,
  action,
}) => {
  const handleConfirm = () => {
    handleClose();
    action && action();
  };
  return (
    <>
      {isOpen && (
        <div className="popup__backdrop">
          <div className="popup__content">
            <div className="popup__content_header">
              <span className="popup__icon" onClick={handleClose}>
                <img
                  src={type === "success" ? SuccessIcon : WarningIcon}
                  alt=""
                />
              </span>
              <button className="modal__close" onClick={handleClose}>
                <img src={CloseIcon} alt="" />
              </button>
            </div>

            <div className="popup__content_body">
              <p>{text}</p>
            </div>
            <div className="popup__content_footer">
              <button
                className="popup__content_fbtnfilled"
                onClick={handleConfirm}
              >
                확인
              </button>
              {choice && (
                <button
                  className="popup__content_fbtnoutlined"
                  onClick={handleClose}
                >
                  취소
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
