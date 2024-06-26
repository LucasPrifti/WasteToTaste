// CreateNewRecipe.js
import React, { useState } from 'react';
import './CreateNewRecipe.css'; 

const predefinedTags = ["Vegan", "Vegetarian", "Pescatarian","Gluten-Free","Low-Fat","High-Protein",
"Low-Carb", "Affordable","Korean","Chinese","Japanese","Filipino","Chicken", "Korean", "Gluten-Free",
"Expensive","Indian","Mediterranean","Allergen-Free", "Easy", "Difficult", "Baking", "Bread", "Cake",
"Dessert","Time: Short", "Time: Long",]; // Will add more tags as needed

const allergensList = ["Shellfish", "Peanuts", "Tree nuts", "Egg", "Soy", "Fish", "Wheat", "Dairy", "Sesame"];

const CreateRecipePage = () => {
  ///////////////////////////
  //STATES FOR ALL COMPONENTS
  ///////////////////////////
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);
  const [videoUrl, setVideoUrl] = useState('');
  
  // state for the description
  const [description, setDescription] = useState('');  

  // State Hooks for notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  
  
  // State Hooks for Allergens
  const [selectedAllergens, setSelectedAllergens] = useState([]);

  ///////////////////////
  //NEW TAG FEATURE CONST
  ///////////////////////
  const [tags, setTags] = useState([]);

  ///////////////////////////////
  // ADD TAG FROM DROPDOWN
  ///////////////////////////////
  const addTag = (tag) => {
    if (tags.length < 6 && !tags.includes(tag)) {
      setTags([...tags, tag]);
    } else {
      if (tags.length >= 6) {
        setNotificationMessage('You can only add up to 6 tags.');
      } else {
        setNotificationMessage('This tag has already been added.');
      }
      setShowNotification(true);
    }
  };
  

  /////////////////////////
  //HANDLER TO UPDATE SPECIFIC TAG INPUT
  /////////////////////////
  const updateTag = (index, value) => {
  const newTags= [...tags];
    newTags[index] = value;
    setTags(newTags);
  };  

  ////////////
  //INGREDIENT
  ////////////
  // Handler to add new ingredient input
  const addIngredientInput = () => {
    setIngredients([...ingredients, '']);
  };

  // Handler to update specific ingredient input
  const updateIngredient = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };  

  /////////////
  //INSTRUCTION
  ///////////// 
  // Handler to add new instruction input
  const addInstructionInput = () => {
  setInstructions([...instructions, '']);
  };

  // Handler to update specific instruction input
  const updateInstruction = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };


  ////////////
  //SUBMISSION/SAVE FORM HANDLER
  ////////////
  const saveRecipe = async (event) => {
    event.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, user must be logged in to save a recipe');
      setNotificationMessage('No token found, user must be logged in to save a recipe.');
      setShowNotification(true);
      return;
    }
  
    const newRecipe = {
      title,
      ingredients,
      instructions,
      videoUrl,
      description,
      tags,
      allergens: selectedAllergens.length ? selectedAllergens : ["Allergen-FREE"]
    };

    try {
      const response = await fetch('http://localhost:8080/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(newRecipe)
      });
      

      if (response.ok) {
        const savedRecipe = await response.json();
        console.log('Recipe saved successfully', savedRecipe);
        setNotificationMessage('Recipe saved successfully!');
        setShowNotification(true);

      } else {
        const errorResponse = await response.text(); 
        console.error('Failed to save recipe', errorResponse);
        //alert(`Failed to save recipe: ${errorResponse}`);
        setNotificationMessage('Failed to save recipe');
        setShowNotification(true);

      }
    } catch (error) {
      console.error('Error saving recipe', error);
      setNotificationMessage('Error saving recipe. Please check the console for more information.');
      setShowNotification(true);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const Notification = ({ message, onClose }) => (
    <div className="create-recipe-notification-container">
      <p>{message}</p>
      <button className="create-recipe-notification-container-button" onClick={onClose}>Okay</button>
    </div>
  );
  

  return (
    <div className="create-recipe-container">
      {/*/////////////*/}
      {/*NOTIFICATIONS*/}
      {/*/////////////*/}
       {showNotification && (
      <Notification message={notificationMessage} onClose={handleCloseNotification} />
      )}

      {/*//////////*/}
      {/*PAGE TITLE*/}
      {/*//////////*/}
      <h1>Create New Recipe</h1>
      <h4>* are required fields</h4>      


      {/*RECIPE TITLE*/}
      <h3>Title*</h3>
      <form onSubmit={saveRecipe}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />     
        
        {/*INGREDIENT INPUT FIELD*/}
        <div className="create-recipe-ingredient-instruction-container">
          <div className="create-recipe-ingredient-container">
            <h3>Ingredients*</h3>
            {ingredients.map((ingredient, index) => (
              <div key={`ingredient-${index}`}>
                <input
                  type="text"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={addIngredientInput}>Add Ingredient</button>
          </div>

        {/*INSTRUCTION INPUT FIELD*/}
          <div className="create-recipe-instruction-container">
            <h3>Instructions*</h3>
            {instructions.map((instruction, index) => (
              <div key={`instruction-${index}`}>
                <input
                  type="text"
                  placeholder={`Instruction ${index + 1}`}
                  value={instruction}
                  onChange={(e) => updateInstruction(index, e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={addInstructionInput}>Add Instruction</button>
          </div>
        </div>

        {/*DESCRIPTION TEXT FIELD*/}
        <h3>Description*</h3>
          <textarea
            className="create-recipe-description-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for your recipe"
          />

        {/*TAGS DROPDOWN FIELD*/}
          <h3>Tags: Select up to 6</h3>
          <div className="create-recipe-tags-container">
            <select onChange={(e) => addTag(e.target.value)} value="">
              <option value="">Add a tag...</option>
              {predefinedTags.filter(tag => !tags.includes(tag)).map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
            {tags.map((tag, index) => (
              <div key={index} className="create-recipe-tag-item">
                {tag}
                {/* Add event.preventDefault() here */}
                <button type="button" onClick={(e) => {
                  e.preventDefault(); // Prevent form submission
                  setTags(tags.filter((_, i) => i !== index));
                }}>Remove</button>
              </div>
            ))}
          </div>

          {/* Allergen Checklist */}
          <h3>Allergens: check if it includes</h3>
          <div className="create-recipe-allergens-list">
            {allergensList.map((allergen, index) => (
              <div key={index} className="create-recipe-allergen-item">
                <label>
                  <input
                    type="checkbox"
                    value={allergen}
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
              </div>
            ))}
            {!selectedAllergens.length && <p>Allergen-FREE</p>}
          </div>
          
        {/*VIDEO INPUT FIELD*/}
        <h3>YouTube Video URL</h3>
        <input
          type="text"
          placeholder="YouTube Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        {/*SAVE BUTTON*/}
        <div className="create-recipe-save-button">
          <button type="submit" className="create-recipe-save-button">Save Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipePage;