//RecipeDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../CreateNewRecipe/CreateNewRecipe.css';
import './RecipeDetails.css'; 
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const predefinedTags = ["Vegan", "Vegetarian", "Pescatarian","Gluten-Free","Low-Fat","High-Protein",
"Low-Carb", "Affordable","Korean","Chinese","Japanese","Filipino","Chicken", "Korean", "Gluten-Free",
"Expensive","Indian","Mediterranean","Allergen-Free", "Easy", "Difficult", "Baking", "Bread", "Cake",
"Dessert","Time: Short", "Time: Long",];// Will add more tags as needed

const allergensList = ["Shellfish", "Peanuts", "Tree nuts", "Egg", "Soy", "Fish", "Wheat", "Dairy", "Sesame"];


const RecipeDetailPage = () => {
  // BREADCRUMBS
  const breadcrumbs = [
    { name: 'View All Recipes', to: '/ViewAll' },
    { name: 'RecipeDetails', to: '/recipe' },
  ];

  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 

////////////////////////////
//STATE HOOKS
////////////////////////////
  // Adding extra states to manage the form fields
  const [editedTitle, setEditedTitle] = useState('');
  const [editedIngredients, setEditedIngredients] = useState(['']);
  const [editedInstructions, setEditedInstructions] = useState(['']);
  const [editedVideoUrl, setEditedVideoUrl] = useState('');
  const [editedTags, setEditedTags] = useState([]);
  const [editedDescription, setEditedDescription] = useState('');
  // State Hooks for notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  // State Hooks for Allergens
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  // State to track checked items
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedInstructions, setCheckedInstructions] = useState({});
  //confirmation popup
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

/***************************/
////////////////////////////
//VIEWING PAGE FUNCTIONS
////////////////////////////
/***************************/
  // Initialize the checked states based on the number of ingredients and instructions
  const initialCheckedState = (items) => items.reduce((acc, _, index) => ({ ...acc, [index]: false }), {});

  // Function to extract video url to
  function extractVideoID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Function to toggle the checked state of an ingredient
  const toggleIngredientCheck = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
    
  // Function to toggle the checked state of an instruction
  const toggleInstructionCheck = (index) => {
    setCheckedInstructions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  

//FETCHING RECIPE INFORMATION
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/recipes/${id}`);
        if (response.ok) {
          const recipeData = await response.json();
          setRecipe(recipeData);
          
          // Initialize the checked states
          setCheckedIngredients(initialCheckedState(recipeData.ingredients));
          setCheckedInstructions(initialCheckedState(recipeData.instructions));
          setEditedDescription(recipeData.description || '');
          setEditedTags(recipeData.tags || []);
          setSelectedAllergens(recipeData.allergens || []); 
        } else {
          console.error('Failed to fetch recipe details');
        }
      } catch (error) {
        console.error('There was an error fetching recipe details:', error);
      }
    };

    fetchRecipe();
  }, [id]);

/***************************/
////////////////////////////
/////EDIT PAGE FUNCTIONS
////////////////////////////
/***************************/
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
  const handleEdit = () => {
    // Prepare for editing
    setIsEditing(true);
    setEditedTitle(recipe.title);
    setEditedIngredients(recipe.ingredients);
    setEditedInstructions(recipe.instructions);
    setEditedVideoUrl(recipe.videoUrl);
    setEditedDescription(recipe.description);
    setEditedTags(recipe.tags);
    setSelectedAllergens(recipe.allergens || [])
  };

  const handleTagChange = (index, value) => {
    const newTags = [...editedTags];
    newTags[index] = value;
    setEditedTags(newTags);
  };
  
  const handleAddTag = (selectedTag) => {
    if (editedTags.length >= 6) {
      setNotificationMessage('You can only add up to 6 tags.');
      setShowNotification(true);
      return; 
    }
  
    // Check if the tag is already added
    if (editedTags.includes(selectedTag)) {
      setNotificationMessage('This tag has already been added.');
      setShowNotification(true);
      return; 
    }
  
    // Add the selected tag to the array of tags
    setEditedTags([...editedTags, selectedTag]);
  };
  
  const handleRemoveTag = (index) => {
    const newTags = editedTags.filter((_, i) => i !== index);
    setEditedTags(newTags);
  };

  const handleAddIngredient = () => {
    setEditedIngredients([...editedIngredients, '']); 
  };
  
  // Function to handle adding a new instruction field
  const handleAddInstruction = () => {
    setEditedInstructions([...editedInstructions, '']); 
  };
  
  // Function to handle ingredient change for a specific index
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...editedIngredients];
    newIngredients[index] = value;
    setEditedIngredients(newIngredients);
  };
  
  // Function to handle instruction change for a specific index
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...editedInstructions];
    newInstructions[index] = value;
    setEditedInstructions(newInstructions);
  };
  

// Function to remove an ingredient field
const handleRemoveIngredient = (index) => {
  const newIngredients = editedIngredients.filter((_, i) => i !== index);
  setEditedIngredients(newIngredients);
};

// Function to remove an instruction field
const handleRemoveInstruction = (index) => {
  const newInstructions = editedInstructions.filter((_, i) => i !== index);
  setEditedInstructions(newInstructions);
};

  const handleSaveChanges = async () => {
    const updatedRecipe = {
      title: editedTitle,
      ingredients: editedIngredients,
      instructions: editedInstructions,
      videoUrl: editedVideoUrl,
      description: editedDescription, 
      tags: editedTags,
      allergens: selectedAllergens.length ? selectedAllergens : ["Allergen-FREE"],
    };


  //For rendering individual ingredient fields
  const renderIngredientFields = () => {
    return editedIngredients.map((ingredient, index) => (
      <div key={`ingredient-${index}`} className="recipe-details-edit-ingredient-edit-field">
        <textarea
          value={ingredient}
          onChange={(e) => handleIngredientChange(index, e.target.value)}
        />
        {index > 0 && (
          <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
        )}
      </div>
    ));
  };
  //For rendering individual instruction fields
  const renderInstructionFields = () => {
    return editedInstructions.map((instruction, index) => (
      <div key={`instruction-${index}`} className="recipe-details-edit-instruction-edit-field">
        <textarea
          value={instruction}
          onChange={(e) => handleInstructionChange(index, e.target.value)}
        />
        {index > 0 && (
          <button type="button" onClick={() => handleRemoveInstruction(index)}>Remove</button>
        )}
      </div>
    ));
  };

    try {
      const response = await fetch(`http://localhost:8080/api/recipes/${id}`, {
        method: 'PUT', // PUT to update the recipe
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Use token from storage
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (response.ok) {
        const savedRecipe = await response.json();
        setRecipe(savedRecipe); // Update the UI with the new recipe
        setIsEditing(false); // Exit editing mode
        setNotificationMessage('Recipe Successfully Saved!');
        setShowNotification(true);
      } else {
        throw new Error('Failed to update the recipe');
        setNotificationMessage('Failed to update the recipe');
        setShowNotification(true);
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      setNotificationMessage('Error updating recipe');
      setShowNotification(true);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

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

  const handleDelete = () => {
    setShowConfirmPopup(true);
  };
  
  {/*/////////////*/}
  {/*CONFIRMATION */}
  {/*/////////////*/}
  const onConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.ok) {
        setIsEditing(false); // Exit editing mode
        setNotificationMessage('Recipe deleted successfully.');
        setShowNotification(true);
      } else {
        throw new Error('Failed to delete the recipe');
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      setNotificationMessage('Error deleting recipe.');
      setShowNotification(true);
    } finally {
      setShowConfirmPopup(false); 
    }
  };
  
  const onCancelDelete = () => {
    setShowConfirmPopup(false);
  };

  
  

return (
  /*////////////*/
  /*EDITING PAGE*/
  /*////////////*/
  <div className="RecipeDetailPage">
      {/*/////////////*/}
      {/*CONFIRMATION*/}
      {/*/////////////*/}
        <ConfirmationPopup 
        isOpen={showConfirmPopup} 
        onCancel={onCancelDelete} 
        onConfirm={onConfirmDelete} 
      />
      {/*/////////////*/}
      {/*NOTIFICATIONS*/}
      {/*/////////////*/}
      {showNotification && (
      <Notification message={notificationMessage} onClose={handleCloseNotification} />
      )}
    {isEditing ? (
      <form onSubmit={handleSaveChanges}>
        <div className="title-container">
          <input
            type="text"
            className="recipe-details-edit-title-input" 
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <button type="submit" className="recipe-details-edit-save-button">Save Changes</button>
          <button type="button" className="recipe-details-edit-delete-button" onClick={handleDelete}>Delete</button>
        </div>
        {/*/////////////*/}
        {/* INGREDIENTS */}
        {/*/////////////*/}
        <div className="recipe-details-edit-edit-details-container">
          <h3>Ingredients</h3>
            {editedIngredients.map((ingredient, index) => (
              <div key = {index} className = "recipe-details-edit-ingredient-edit-field">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                {index > 0 && (
                  <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} className="recipe-details-edit-add-ingredient-button">Add Ingredient</button>
        </div>
        {/*//////////////*/}
        {/* INSTRUCTIONS */}
        {/*//////////////*/}
        <div className="recipe-details-edit-edit-details-container">
          <h3>Instructions</h3>
          {editedInstructions.map((instruction, index) => (
            <div key = {index} className = "recipe-details-edit-instruction-edit-field">
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionChange(index, e.target.value)}
              />
              {index > 0 && (
                <button type="button" onClick={() => handleRemoveInstruction(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddInstruction} className="recipe-details-edit-add-instruction-button">Add Instruction</button>
        </div>
        {/*//////////////*/}
        {/* DESCRIPTION */}
        {/*//////////////*/}
        <div className="recipe-details-edit-description-edit-container">
        <h1>Description</h1>
           <textarea
              id="description"
              className="recipe-details-edit-recipe-description-edit"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Describe your recipe"
            />
        </div>
        {/*//////*/}
        {/* TAGS */}
        {/*//////*/}
        <div className="recipe-details-edit-tags-edit-container">
          <h1>Tags</h1>
          <select onChange={(e) => handleAddTag(e.target.value)} value="">
            <option value="">Select a tag...</option>
            {predefinedTags.filter(tag => !editedTags.includes(tag)).map((tag, index) => (
              <option key={index} value={tag}>{tag}</option>
            ))}
          </select>

          {/*Displaying selected tags with an option to remove them*/}
          {editedTags.map((tag, index) => (
          <div key={index} className="recipe-details-edit-tags-item">
            <span className="recipe-details-edit-tags-name">{tag}</span>
            <button type="button" onClick={() => setEditedTags(editedTags.filter((_, i) => i !== index))}>Remove</button>
          </div>
        ))}
        </div>

        {/*///////////*/}
        {/* ALLERGENS */}
        {/*///////////*/}
        <div className="recipe-details-edit-allergens-edit-container">
          <h3>Allergens</h3>
          {allergensList.map((allergen, index) => (
            <label key={index}>
              <input
                className="recipe-details-edit-allergens-checkbox" type="checkbox"
                checked={selectedAllergens.includes(allergen)}
                onChange={() => {
                  const newAllergens = selectedAllergens.includes(allergen)
                    ? selectedAllergens.filter(a => a !== allergen)
                    : [...selectedAllergens, allergen];
                  setSelectedAllergens(newAllergens);
                }}
              />
              {allergen}
            </label>
          ))}
        </div>
        {/*///////*/}
        {/* VIDEO */}
        {/*///////*/}
        <div className="recipe-details-edit-video-container"> 
        <h3>YouTube Video Link:</h3>
          <input
            type="text"
            className="recipe-details-edit-video-url-input" 
            value={editedVideoUrl}
            onChange={(e) => setEditedVideoUrl(e.target.value)}
          />
        </div>
      </form>
    ) : (
    
      /*///////////////////////*/
      /*VIEWING THE RECIPE PAGE*/
      /*///////////////////////*/
      <div>
        <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
        </div>
        {/*TITLE*/}
        <div className="recipe-details-view-title-container">
          <h2>{recipe.title}</h2>
          {!isEditing && recipe.description && (
          <p className="recipe-details-view-description">{recipe.description}</p>
          )}
           <button onClick={handleEdit} className="recipe-details-view-edit-button">Edit</button>
        </div>

        {/*TAGS*/}
        <div className="recipe-details-view-tags-container">
        {recipe.tags.map((tag, index) => (
          <span key={index} className="recipe-details-view-tag">{tag}</span>
          ))}
        </div>

        {/*ALLERGENS*/}
        <div className="recipe-details-view-allergens-container">
        <div className="recipe-details-view-allergens-list">
          <h3>Allergens</h3>
          {recipe.allergens && recipe.allergens.length > 0 ? (
            <ul>
              {recipe.allergens.map((allergen, index) => (
                <li key={index}>{allergen}</li>
              ))}
            </ul>
          ) : (
            <p>Allergen-Free</p>
          )}
        </div>
        </div>
        {/*INGREDIENTS*/}
        <div className="recipe-details-view-ingredients-container">
          <div className="recipe-details-view-ingredients-list">
            <h3>Ingredients</h3>
            <ol>
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className={checkedIngredients[index] ? 'checked' : ''}
                  onClick={() => toggleIngredientCheck(index)}
                >
                  {ingredient}
                </li>
              ))}
            </ol>
          </div>
        </div>
        {/*INSTRUCTIONS*/}
        <div className="recipe-details-view-instructions-container">
          <div className="recipe-details-view-instructions-list">
            <h3>Instructions</h3>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className={checkedInstructions[index] ? 'checked' : ''}
                  onClick={() => toggleInstructionCheck(index)}
                >
                  {instruction}
                </li>
              ))}
            </ol>
        </div>
        </div>
        <div className="recipe-details-view-video-container">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${extractVideoID(recipe.videoUrl)}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </div>
    )}
  </div>
);
  
};


export default RecipeDetailPage;
