// AllergenModal.js
import React from 'react';
import './AllergenModal.css'; 

const AllergenModal = ({ allergens, onClose }) => {
  return (
    <div className="allergen-modal-overlay">
      <div className="allergen-modal-content">
        <h4>Allergens</h4>
      
        {allergens.map((allergen, index) => (
          <p key={index}>{allergen}</p>
        ))}
        
        <button onClick={onClose}>Okay</button>
      </div>
    </div>
  );
};

export default AllergenModal;
