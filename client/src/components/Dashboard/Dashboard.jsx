import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [userData, setUserData] = React.useState(null);
  const [savedRecipes, setRecipes] = React.useState([]);
  const [selectedRecipeId, setSelectedRecipeId] = React.useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  React.useEffect(() => {
    fetchUserData();
    fetchRecipes(); 
  }, []);

  const fetchUserData = async () => {
    const email = localStorage.getItem("user"); // Retrieve the user's email stored in localStorage
    try {
      const response = await fetch('http://localhost:8080/api/users/getProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send the email as part of the request body
      });
  
      if (response.ok) {
        const profile = await response.json();
        setUserData({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          // notifications: profile.notifications, // Adjust or remove based on actual data structure
        });
      } else {
        throw new Error('Failed to fetch user data');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchRecipes = async () => {
    const token = localStorage.getItem('token');
    try {
      const { data } = await axios.get('http://localhost:8080/api/recipes', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setRecipes(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
      setError('Failed to fetch recipes. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const toggleRecipeDetails = (id) => {
    if (selectedRecipeId === id) {
      setSelectedRecipeId(null); // Clicking the same recipe again will hide its details
    } else {
      setSelectedRecipeId(id); // Show details for the clicked recipe
    }
  };


  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        <div className="dashboard-left">
          <div className="card">
            <div className="card-header1">Saved Recipes</div>
            <div className="card-content">
            {savedRecipes.map((recipe) => (
                <div key={recipe._id} className="recipe-card">
                  <p style={{cursor: 'pointer'}} onClick={() => toggleRecipeDetails(recipe._id)}>
                  <center>{recipe.title}</center>
                    
                  </p>
                  {selectedRecipeId === recipe._id && (
                    <div className="recipe-details">
                      <a><strong>Ingredients:</strong> {recipe.ingredients?.join(', ')}</a><br/>
                      <a><strong>Instructions:</strong> {recipe.instructions}</a><br/>
                      <a><strong>Description:</strong> {recipe.description}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header1">Recommended for You</div>
            <div className="card-content">
            <p2>Why Sautéing ?</p2>
  <p> <center>Sautéing is more than just a cooking technique; it's a gateway to culinary creativity. By understanding the science behind it and practicing the art 
    of it, you can transform simple ingredients into extraordinary dishes. Remember, great cooking isn't just about following recipes—it's about mastering 
    techniques and then using them to express your culinary vision.</center></p>
            </div>
          </div>
        </div>
        <div className="dashboard-right">
         
          <div className="card account-management-card">
            <div className="card-header1">Account Management</div>
            <div className="card-content">
              <div className="user-info-row">
              <strong className="label">First Name: </strong>
                <span>{userData?.firstName}</span>
              </div>
              <div className="user-info-row">
                <strong className="label">Last Name: </strong>
                <span>{userData?.lastName}</span>
              </div>
              <div className="user-info-row">
              <strong className="label">Email: </strong>
                <span>{userData?.email}</span>
              </div>
              <Link to="/update-profile">
              <button className='button'>Edit Personal Info</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
