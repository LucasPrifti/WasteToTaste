import React from 'react';
import './SimpleModal.css'; // Ensure you create this CSS file for styling

const SimpleModal = ({ isOpen, onClose, onConfirm, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <div className="modal-actions">
                    {onConfirm && <button onClick={onConfirm}>Confirm</button>}
                </div>
            </div>
        </div>
    );
};

export default SimpleModal;
