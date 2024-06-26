// RecipesPage.js
import React from 'react';
import './RecipesPage.css'; 
import VIEWALLRECIPEpng from '../../Photos/VIEWALLRECIPE.png'; 
import CREATENEWRECIPEpng from '../../Photos/CreateNewRecipe.png'; 
import FOODLISTpng from '../../Photos/FoodList.png'; 
import { Link } from 'react-router-dom';
import CreateNewRecipe from '../CreateNewRecipe/CreateNewRecipe';


const RecipesPage = () => {
  return (
    <div className="recipe-page-container">
      <header className="recipe-page-header">
        <h1>MAKE YOUR MENU</h1>
      </header>
      <Link to="/explore" className="recipe-page-explore-button">Explore new creations</Link>
      <section className="recipe-page-recipe-options">
        <div className="recipe-page-recipe-item">
          <img src={VIEWALLRECIPEpng} alt="View all recipes" />
          <Link to="/ViewAll" className="View-All-Recipes-Button">View all recipes</Link>
        </div>
        <div className="recipe-page-recipe-item">
        <img src={CREATENEWRECIPEpng} alt="Create new recipe" />
        <Link to="/CreateNew" className="Create-New-Recipe-Button">Create new recipe</Link> 
      </div>
        <div className="recipe-page-recipe-item">
          <img src={FOODLISTpng} alt="Foodlist" />
          <Link to="/FoodList" className="FoodList-Button">Create Foodlists</Link>
        </div>
      </section>
    </div>
  );
};

export default RecipesPage;