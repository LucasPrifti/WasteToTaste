// DescriptionModal.js
import React from 'react';
import './DescriptionModal.css'; // Create and import your CSS file for styling

const DescriptionModal = ({ description, onClose }) => {
  return (
    <div className="description-modal-overlay">
      <div className="description-modal-content">
        <p>{description}</p>
        <button onClick={onClose}>Okay</button>
      </div>
    </div>
  );
};

export default DescriptionModal;
