//FoodListCreationForm.js
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './FoodListCreationForm.css';

const FoodListCreationForm = () => {
  const [recipes, setRecipes] = useState([]);  // State to hold recipes
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Fetch recipes when component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8080/api/recipes', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = searchTerm
    ? recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recipes;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    const foodListData = {
      name: listName,
      description: listDescription,
      recipes: selectedRecipeIds, 
    };

    try {
      const response = await fetch('http://localhost:8080/api/foodlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(foodListData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error creating food list');
      }

      navigate('/foodlist'); 
    } catch (error) {
      console.error('Failed to create food list:', error);
    }
  };

  const handleRecipeSelectionChange = (id) => {
    setSelectedRecipeIds(prevIds =>
      prevIds.includes(id)
        ? prevIds.filter(prevId => prevId !== id)
        : [...prevIds, id]
    );
  };


  return (
    <div className="FoodListCreationForm-container">
    <h1>Foodlist Creation</h1>
    <form className="FoodListCreationForm-container-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="FoodList Name"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
      />
      <h3>Recipe Search:</h3>
      <input
        type="text"
        placeholder="Search Recipes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="FoodListCreationForm-recipe-selection">
      <h3>Recipes: click to add: </h3>
        <ol>
        {filteredRecipes.map((recipe) => (
          <label key={recipe._id}>
            <input
              type="checkbox"
              checked={selectedRecipeIds.includes(recipe._id)}
              onChange={() => handleRecipeSelectionChange(recipe._id)}
            />
            <span>{recipe.title}</span>
          </label>
        ))}
        </ol>
      </div>
      <textarea
        className="FoodListCreationForm-description"
        placeholder="FoodList Description"
        value={listDescription}
        onChange={(e) => setListDescription(e.target.value)}
      />
      <div className="FoodListCreationForm-create-foodlist">
      <button type="submit">Create FoodList</button>
      </div>
    </form>
    </div>
  );
};

export default FoodListCreationForm;
