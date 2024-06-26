import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './FoodListDisplay.css';

const FoodListDisplay = () => {
  const { id } = useParams();
  const [foodList, setFoodList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFoodListDetails = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8080/api/foodlists/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Food list could not be fetched.');
        }
  
        const data = await response.json();
        setFoodList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFoodListDetails();
  }, [id]);
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!foodList) return <div>Food list not found.</div>;

  return (
    <div className="FoodListDisplay-container">
      <h1>{foodList.name}</h1>
      <h2>Description</h2>
      {foodList.description && (
        <p className="foodlist-description">{foodList.description}</p>
      )}

      <h3>Recipes</h3>
      <ul>
        {foodList.recipes.map((recipe) => (
          <li key={recipe._id}>
              <p className="FoodListDisplay-recipe-title">{recipe.title}</p>
            <Link to={`/recipe/${recipe._id}`} className="FoodListDisplay-view-recipe-button">View Recipe</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodListDisplay;
