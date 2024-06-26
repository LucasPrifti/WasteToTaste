//ViewAllRecipes.js
import React, { useState, useEffect } from 'react';
import './ViewAllRecipes.css';
import { Link } from 'react-router-dom';
import DescriptionModal from './DescriptionModal'; 
import AllergenModal from './AllergenModal'; 


const ViewAllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  ////////////////////////////////////////////////
  // State Hooks for Search, filter, and sort
  ////////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTags, setFilterTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [sortOption, setSortOption] = useState('');
  // State Hooks for notifications
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

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

  
  ///////////////////////////////////
  //ALLERGEN MODAL
  ///////////////////////////////////
  // State Hooks for AllergenModal
  const [isAllergenModalOpen, setIsAllergenModalOpen] = useState(false);
  const [currentAllergens, setCurrentAllergens] = useState([]);
  
    // Function to open AllergenModal
    const openAllergenModal = (allergens) => {
      setCurrentAllergens(allergens);
      setIsAllergenModalOpen(true);
    };
  // Function to close AllergenModal 
    const closeAllergenModal = () => {
      setIsAllergenModalOpen(false);
    };
    
  /////////////////////
  //MAIN FETCH RECIPE
  /////////////////////
  useEffect(() => {
    const fetchRecipes = async () => {
        setLoading(true);
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

            // Update to gather tags from fetched recipes
            const tagsSet = new Set();
            data.forEach(recipe => {
                if (recipe.tags) {
                    recipe.tags.forEach(tag => tagsSet.add(tag));
                }
            });
            setAvailableTags([...tagsSet]);
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    fetchRecipes();
}, []);
  
  const handleSearchAndFilter = () => {
    return recipes.filter((recipe) => {
      const matchTags = filterTags.length === 0 || recipe.tags && filterTags.every(filter => recipe.tags.includes(filter));
      const matchSearchTerm = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchSearchTerm && matchTags;
    });
  };

  const handleTagFilterChange = (tag) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter(t => t !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  const filteredRecipes = handleSearchAndFilter();
  

  // Function to handle sort changes
  const handleSortChange = (option) => {
    setSortOption(option);
    };
  // Sorting recipes based on selectedd option before rendering
  const getSortedRecipes = (recipes) => {
    return recipes.slice().sort((a, b) => {
      if (sortOption === 'alpha-asc') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'alpha-desc') {
        return b.title.localeCompare(a.title);
      } else if (sortOption === 'date-early') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else if (sortOption === 'date-late') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return 0; 
      }
    });
  };
  // Inside the render section, replace the filteredRecipes with getSortedRecipes(filteredRecipes)
const sortedFilteredRecipes = getSortedRecipes(filteredRecipes);

/////////////////////////////
//NEW SHARE RECIPE FUNCTION/
////////////////////////////
const shareRecipe = async (recipeId) => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('User must be logged in to share recipes');
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/recipes/${recipeId}/share`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (response.ok) {
      console.log('Recipe shared successfully');
      setNotificationMessage('Recipe shared successfully!');
    } else {
      console.error('Failed to share recipe');
      setNotificationMessage('Failed to share the recipe. Please try again.');

    }
  } catch (error) {
    console.error('Error sharing recipe', error);
    setNotificationMessage('An error occurred while sharing the recipe. Please try again.');
  }
  setShowNotification(true);
};
  ////////////////////////////////////////////////////////////////////

  //NOTIFICATION CLOSER
  const handleCloseNotification = () => {
    setShowNotification(false);
  };//NOTIFICATION CLASSNAME
  const Notification = ({ message, onClose }) => (
    <div className="ViewAll-recipe-notification-container">
      <p>{message}</p>
      <button onClick={onClose}>Okay</button>
    </div>
  );

  return (
    <div className="ViewAll-container">
      {/*/////////////*/}
      {/*NOTIFICATIONS*/}
      {/*/////////////*/}
      {showNotification && (
      <Notification message={notificationMessage} onClose={handleCloseNotification} />
      )}

      {/*//////////*/}
      {/*PAGE TITLE*/}
      {/*//////////*/}
      <h1>View All Recipes</h1>
      
      {/*SEARCH BAR*/}
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="ViewAll-search-input"
      />
      {/* Sorting Dropdown */}
      <select onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className="ViewAll-sort-select">
        <option value="">Sort Options</option>
        <option value="alpha-asc">Alphabetical A-Z</option>
        <option value="alpha-desc">Alphabetical Z-A</option>
        <option value="date-early">Date Earliest</option>
        <option value="date-late">Date Latest</option>
      </select>
      {/*TAGS BUTTON*/}
      <div className="ViewAll-tag-filter">
        <p>Filter by tags:</p>
        {availableTags.map((tag, index) => (
          <button key={index} className={`ViewAll-tag-button ${filterTags.includes(tag) ? 'active' : ''}`} onClick={() => handleTagFilterChange(tag)}>
            {tag}
          </button>
        ))}
      </div>
      {/*/////////////////////*/}
      {/*RECIPE CARDS */}
      {/*/////////////////////*/}
      <div className="ViewAll-recipes-list">
      {sortedFilteredRecipes.length > 0 ? (
        sortedFilteredRecipes.map((recipe) => (
            <div key={recipe._id} className="ViewAll-recipe-card">
              <p className="ViewAll-recipe-card-title">{recipe.title}</p>
              <Link to={`/recipe/${recipe._id}`} className="ViewAll-view-recipe">View Recipe</Link>
              
              {/* RECIPE CARD DESCRIPTION THAT IS VIEWABLE VIA CLICK */}
              <p className="ViewAll-recipe-description" onClick={() => openModalWithDescription(recipe.description)}>
                {recipe.description.length > 15 ? recipe.description.substring(0, 15) + '...' : recipe.description}
              </p>
              <div className="ViewAll-recipe-tags-container">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="ViewAll-tag">{tag}</span>
                ))}
                {/* Renders placeholders for the remaining tags so it'll space evenly */}
                {Array.from({ length: 6 - recipe.tags.length }).map((_, index) => (
                  <span key={`placeholder-${index}`} className="ViewAll-tag placeholder"></span>
                ))}
              </div>  

              <button className="ViewAll-share-button" onClick={() => shareRecipe(recipe._id)}>Share</button>
            
            {/* Display allergens */}
            <div className="ViewAll-recipe-allergens" onClick={() => openAllergenModal(recipe.allergens)}>
                {recipe.allergens && recipe.allergens.length > 0 ? (
                  <>
                    {recipe.allergens.slice(0, 2).map((allergen, index) => (
                      <span key={index} className="ViewAll-allergen">{allergen}</span>
                    ))}
                    {recipe.allergens.length > 2 && <span> more...</span>}
                  </>
                ) : (
                  <span className="ViewAll-allergen-free">Allergen-FREE</span>
                )}
              </div>
            </div>
            
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
      {/* Conditionally render the modal outside of the map function */}
      {/* MODAL CLOSERS RENDERED */}
      {isModalOpen && <DescriptionModal description={currentDescription} onClose={closeModal} />}

      {isAllergenModalOpen && (
      <AllergenModal allergens={currentAllergens} onClose={closeAllergenModal} />
      )}
    </div>
  );
};

export default ViewAllRecipes;