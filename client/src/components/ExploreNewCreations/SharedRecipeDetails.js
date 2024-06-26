//SharedRecipeDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SharedRecipeDetails.css'; 
import Breadcrumb from '../Breadcrumb/Breadcrumb';


const SharedRecipeDetails = () => {
  const breadcrumbs = [
    { name: 'Explore New Creations', to: '/explore' },
    { name: 'Shared Recipe Detail', to: '/explore/:recipeId' },
  ];

  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //State to track checked items
  //shared-recipe-details-
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [checkedInstructions, setCheckedInstructions] = useState({});

  // State Hooks for notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Initialize the checked states based on the number of ingredients and instructions
  const initialCheckedState = (items) => items.reduce((acc, _, index) => ({ ...acc, [index]: false }), {});

  // Define the extractVideoID function within this component
  const extractVideoID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const toggleIngredientCheck = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleInstructionCheck = (index) => {
    setCheckedInstructions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/sharedRecipes/${recipeId}`);
        if (!response.ok) throw new Error('Failed to fetch recipe details');
        const data = await response.json();
        setRecipeDetails(data);
        // Initialize the checked states
        setCheckedIngredients(data.ingredients.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}));
        setCheckedInstructions(data.instructions.reduce((acc, _, index) => ({ ...acc, [index]: false }), {}));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipeDetails) return <div>Recipe not found</div>;

// Function to save the recipe
const saveRecipe = async (recipeDetails) => {
  const token = localStorage.getItem('token'); 
  try {
    await fetch('http://localhost:8080/api/recipes/saveSharedRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(recipeDetails), 
    });
    setNotificationMessage('Recipe saved successfully!');
    setShowNotification(true);
  } catch (error) {
    console.error('Failed to save the recipe', error);
    setNotificationMessage('ERROR: Failed to save the recipe');
    setShowNotification(true);
  }
};


  {/*/////////////*/}
  {/*NOTIFICATIONS*/}
  {/*/////////////*/}
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const Notification = ({ message, onClose }) => (
    <div className="shared-recipe-details-notification-container">
      <p>{message}</p>
      <button onClick={onClose}>Okay</button>
    </div>
  );


  /*///////////////////////*/
  /*VIEWING RECIPE DETAILS shared-recipe-details-*/
  /*///////////////////////*/
  return (
    <div className="SharedRecipeDetailPage">
      {/*/////////////*/}
      {/*NOTIFICATIONS*/}
      {/*/////////////*/}
      {showNotification && (
      <Notification message={notificationMessage} onClose={handleCloseNotification} />
      )}

       {/*BREADCRUMBS*/}     
      <div className="shared-recipe-details-mini-breadcrumb">
      <Breadcrumb pathSegments={breadcrumbs} />
      </div>
      <div className="shared-recipe-details-title-container">
        <h2>{recipeDetails.title}</h2>
      </div>
      <div className="shared-recipe-details-tags-container">
        {recipeDetails.tags.map((tag, index) => (
          <span key={index} className="shared-recipe-details-recipe-tag">{tag}</span>
        ))}
      </div>
      {/*DESCRIPTION*/}
      <p className="shared-recipe-details-description">{recipeDetails.description}</p>

      {/*ALLERGENS*/}
      <div className="shared-recipe-details-allergens-container">
      <div className="shared-recipe-details-allergens-list">
        <h3>Allergens</h3>
        {recipeDetails.allergens && recipeDetails.allergens.length > 0 ? (
          <ul>
            {recipeDetails.allergens.map((allergen, index) => (
              <li key={index}>{allergen}</li>
            ))}
          </ul>
        ) : (
          <p>Allergen-Free</p>
        )}
      </div>
      </div>
      <div className="shared-recipe-details-ingredients-container">
        <div className="shared-recipe-details-ingredients-list">
        <h3>Ingredients</h3>
        <ol>
          {recipeDetails.ingredients.map((ingredient, index) => (
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
      <div className="shared-recipe-details-instructions-container">
      <div className="shared-recipe-details-instructions-list">
        <h3>Instructions</h3>
        <ol>
          {recipeDetails.instructions.map((instruction, index) => (
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
      <div className="shared-recipe-details-video-container">
        {recipeDetails.videoUrl && (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${extractVideoID(recipeDetails.videoUrl)}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        )}
      </div>
        {/*////////////*/}
        {/*SAVE BUTTON */}
        {/*////////////*/}
        <button
          className="shared-recipe-details-save-button"
          onClick={() => saveRecipe(recipeDetails)}>
          Save Recipe
      </button>
    </div>
  );
};

export default SharedRecipeDetails;
