import React from "react";
import "./AcceptingModal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  message: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onAccept, message }) => {
  if (!isOpen) return null; // Solo renderiza el modal si está abierto

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-accept" onClick={onAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;