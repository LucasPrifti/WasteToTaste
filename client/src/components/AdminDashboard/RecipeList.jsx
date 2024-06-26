// src/components/RecipeList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.css'; // Make sure this path matches the location of your CSS file
import { useNavigate } from 'react-router-dom';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, []);

  
  const navigate = useNavigate();

  const handleAdminDashboard = () => {
    navigate("/AdminDashboard");
  }
  // Function to fetch all recipes from the backend
  const fetchRecipes = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      };
      // Fetch shared recipes
      const response = await axios.get('http://localhost:8080/api/sharedRecipes', config);
      const sharedRecipes = response.data;
  
      setRecipes(sharedRecipes);
    } catch (error) {
      console.error('Failed to fetch shared recipes:', error);
    }
  };


  // Function to handle selecting a recipe to view more details
  const viewRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    
      <div className={styles.admin_container}>
        <div className={styles.admin_navbar}>
        <h1>Recipe Management</h1>
      </div>
      <div className={styles.functions_container}>
        <div className={styles.main_content}>
        <h1>List of Current Recipes:</h1>
          <div className={styles.user_cards}>
            {recipes.map((recipe) => (
              <div key={recipe._id} className={styles.recipe_card}>
                <h3>{recipe.title}</h3>
                <button onClick={() => viewRecipeDetails(recipe)} className={styles.white_btn}>View Information</button>
              </div>
            ))}
          </div>
        </div>
      </div>
   {selectedRecipe && (
    <div className={styles.recipeDetails}>
        <h3>"{selectedRecipe.title}"</h3> 
        <h4>Recipe Information</h4> 
        <p><strong>Ingredients:</strong> {selectedRecipe.ingredients?.join(', ')}</p>
        <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
        <p><strong>Description:</strong> {selectedRecipe.description}</p>
        <button onClick={() => setSelectedRecipe(null)} className={styles.white_btn}>Close</button>
    </div>
  
      )}
      <div className={styles.back_button_container}>
            <button className={styles.white_btn2} onClick={handleAdminDashboard}>
                Back to Admin Dashboard</button>
            </div>
    </div>
  );
};

export default RecipeList;