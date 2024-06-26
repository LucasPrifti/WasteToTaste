//FoodList.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditFoodList.css';


const EditFoodList = () => {
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [selectedRecipeIds, setSelectedRecipeIds] = useState([]);
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch food list details and all available recipes
  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('token');

      try {
        const [foodListRes, recipesRes] = await Promise.all([
          fetch(`http://localhost:8080/api/foodlists/${id}`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('http://localhost:8080/api/recipes', { headers: { 'Authorization': `Bearer ${token}` } })
        ]);

        if (!foodListRes.ok) throw new Error('Could not fetch food list details.');
        const foodListData = await foodListRes.json();
        setListName(foodListData.name);
        setListDescription(foodListData.description);
        setSelectedRecipeIds(foodListData.recipes.map(recipe => recipe._id));

        if (!recipesRes.ok) throw new Error('Failed to fetch recipes');
        const recipesData = await recipesRes.json();
        setRecipes(recipesData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const filteredRecipes = searchTerm
    ? recipes.filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : recipes;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); 
    const updatedFoodListData = {
      name: listName,
      description: listDescription,
      recipes: selectedRecipeIds,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/foodlists/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFoodListData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update the food list.');
      }

      navigate('/foodlist');
    } catch (error) {
      console.error('There was an error updating the food list:', error);
      setError(error.message);
      alert('ERROR: failed to update the food list');
    }
  };

  const handleRecipeSelectionChange = (recipeId) => {
    setSelectedRecipeIds(prevIds =>
      prevIds.includes(recipeId) ? prevIds.filter(id => id !== recipeId) : [...prevIds, recipeId]
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="FoodListCreationEdit-container">
      <h1>Foodlist Editing</h1>
      <form onSubmit={handleSubmit} className="foodlist-edit-form">
        <input
          type="text"
          placeholder="FoodList Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search Recipes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="FoodListCreationEdit-recipe-selection">
          {filteredRecipes.map((recipe) => (
            <label key={recipe._id}>
              <input
                type="checkbox"
                checked={selectedRecipeIds.includes(recipe._id)}
                onChange={() => handleRecipeSelectionChange(recipe._id)}
              />
              {recipe.title}
            </label>
          ))}
        </div>
        <textarea
          className="FoodListCreationEdit-description-selection"
          placeholder="FoodList Description"
          value={listDescription}
          onChange={(e) => setListDescription(e.target.value)}
        />
        <button type="submit">Update FoodList</button>
      </form>
    </div>
  );
  
};

export default EditFoodList;
