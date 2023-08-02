import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, closeModal, title, children }) => {
  const handleModalDialogClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={`modal ${isOpen && "modal-open"}`} onClick={closeModal}>
      <div className="modal__dialog" onClick={handleModalDialogClick}>
        <div className="headModal">
          <h2>{title}</h2>
          <button className="btn-close" onClick={closeModal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="bodyModal">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
