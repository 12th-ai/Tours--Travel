import React from 'react';
import '../.././../assets/Style/client_style/Custom.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h2>Confirm Action</h2>
        <p>{message}</p>
        <div className="confirm-modal-buttons">
          <button className="confirm-button" onClick={onConfirm}>Yes</button>
          <button className="cancel-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
