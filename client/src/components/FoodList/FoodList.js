// FoodList.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FoodList.css';
import DescriptionModal from '../ViewAllRecipes/DescriptionModal'; 

const FoodList = () => {
  const [foodLists, setFoodLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //confirmation popup
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  // State Hooks for notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  // State Hooks for searching
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  // Filter food lists based on the search term
  const filteredFoodLists = foodLists.filter(list => 
    list.name.toLowerCase().includes(searchTerm) ||
    // You can add more conditions here if you want to search in descriptions etc.
    (list.description && list.description.toLowerCase().includes(searchTerm))
  );
  ///////////////////////////////////
  //DESCRIPTION MODAL
  ///////////////////////////////////
  // State Hooks for DescriptionModal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDescription, setCurrentDescription] = useState('');
    // Function to open DescriptionModal
    const openModalWithDescription = (description) => {
      setCurrentDescription(description);
      setIsModalOpen(true);
    };
      // Function to close DescriptionModal
      const closeModal = () => {
        setIsModalOpen(false);
      };
  {/*/////////////*/}
  {/*NOTIFICATIONS*/}
  {/*/////////////*/}
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const Notification = ({ message, onClose }) => (
    <div className="recipe-details-notification-container">
      <p>{message}</p>
      <button onClick={onClose}>Okay</button>
    </div>
  );
  useEffect(() => {
    const fetchFoodLists = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/api/foodlists', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch food lists');
        }
        const data = await response.json();
        setFoodLists(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodLists();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-foodlist/${id}`);
  };

  const handleDelete = (id) => {
    setShowConfirmPopup(true);
    setDeleteId(id);  
  };

  {/*/////////////*/}
  {/*CONFIRMATION POPUP*/}
  {/*/////////////*/}
  const ConfirmationPopup = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;
  
    return (
      <div className="recipe-details-edit-confirm-popup-overlay">
        <div className="recipe-details-edit-confirm-popup">
          <p>Are you sure you want to delete this recipe?</p>
          <button className="recipe-details-edit-confirm-delete-btn" onClick={onConfirm}>Yes, Delete</button>
          <button className="recipe-details-edit-cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
  };
{/*/////////////*/}
{/*HANDLING DELETE*/}
{/*/////////////*/}
const onConfirmDelete = async () => {
  if (!deleteId) return; // Check if deleteId is not null
  try {
    const response = await fetch(`http://localhost:8080/api/foodlists/${deleteId}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete food list');
    }
    setNotificationMessage('Food list deleted successfully.');
    setShowNotification(true);
    setFoodLists(currentFoodLists => currentFoodLists.filter(list => list._id !== deleteId));
  } catch (error) {
    console.error("Error deleting food list:", error.message);
    setNotificationMessage('Error deleting food list.');
    setShowNotification(true);
  } finally {
    setShowConfirmPopup(false);
    setDeleteId(null); 
  }
};

const onCancelDelete = () => {
  setShowConfirmPopup(false);
};



  if (loading) {
    return <div>Loading food lists...</div>;
  }

  return (
    <div className="FoodList-container">


      {/*////////////*/}
      {/*CONFIRMATION*/}
      {/*////////////*/}
      <ConfirmationPopup 
        isOpen={showConfirmPopup} 
        onCancel={onCancelDelete} 
        onConfirm={onConfirmDelete} 
      />
      <h1>Food Lists</h1>
      {/*SEARCH BAR*/}
      <input
        type="text"
        placeholder="Search foodlists..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="ViewAll-search-input"
      />
      <h2> </h2>
      <Link to="/create-foodlist" className="FoodList-create-foodlist-btn">Create New FoodList</Link>
      
      <div className="FoodList-display">
      {filteredFoodLists.map((list) => (
          <div key={list._id} className="FoodList-box">
            <h3>{list.name}</h3>
            <p className="foodlist-description" onClick={() => openModalWithDescription(list.description)}>
              {list.description && list.description.length > 15 ? list.description.substring(0, 15) + '...' : list.description}
            </p>
            <div className="FoodList-actions">
              <Link to={`/view-foodlist/${list._id}`} className="FoodList-view-foodlist-btn">View</Link>
              <button onClick={() => handleEdit(list._id)} className="FoodList-edit-foodlist-btn">Edit</button>
              <button onClick={() => handleDelete(list._id)} className="FoodList-delete-foodlist-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <DescriptionModal description={currentDescription} onClose={closeModal} />}
    </div>
  );
};

export default FoodList;
