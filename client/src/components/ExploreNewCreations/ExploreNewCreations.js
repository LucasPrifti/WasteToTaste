// ExploreNewCreations.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExploreNewCreations.css'; 
import DescriptionModal from '../ViewAllRecipes/DescriptionModal'; 
import AllergenModal from '../ViewAllRecipes/AllergenModal'; 

const ExploreNewCreations = () => {
  const [sharedRecipes, setSharedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  ////////////////////////////////////////////////
  // State Hooks for Search, filter, and sort
  ////////////////////////////////////////////////
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTags, setFilterTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [sortOption, setSortOption] = useState('');

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

      useEffect(() => {
        const fetchSharedRecipes = async () => {
          setLoading(true);
          try {
            const response = await fetch('http://localhost:8080/api/sharedRecipes');
            if (!response.ok) throw new Error('Failed to fetch shared recipes');
            const data = await response.json();
            setSharedRecipes(data);
      
            // Collect all unique tags from the fetched recipes
            const tags = new Set(data.flatMap(recipe => recipe.tags || []));
            setAvailableTags([...tags]);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
      
        fetchSharedRecipes();
      }, []);

  const handleSearchAndFilter = () => {
    return sharedRecipes.filter(recipe => {
      const matchTags = filterTags.length === 0 || (recipe.tags && filterTags.every(filter => recipe.tags.includes(filter)));
      const matchSearchTerm = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recipe.tags && recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchSearchTerm && matchTags;
    });
  };
  
  const filteredRecipes = handleSearchAndFilter();

  const handleTagFilterChange = (tag) => {
    if (filterTags.includes(tag)) {
      setFilterTags(filterTags.filter(t => t !== tag));
    } else {
      setFilterTags([...filterTags, tag]);
    }
  };

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
        return new Date(a.sharedOn) - new Date(b.sharedOn);
      } else if (sortOption === 'date-late') {
        return new Date(b.sharedOn) - new Date(a.sharedOn);
      } else {
        return 0; 
      }
    });
  };
  // Inside the render section, replace the filteredRecipes with getSortedRecipes(filteredRecipes)
const sortedFilteredRecipes = getSortedRecipes(filteredRecipes);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (  
    <div className="explore-new-creations-page">
      <h1>Explore New Creations</h1>

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

      <div className="explore-new-creations-recipes-list">
      {sortedFilteredRecipes.length > 0 ? (
        sortedFilteredRecipes.map((recipe) => (
            <div key={recipe._id} className="explore-new-creations-recipe-card">
              <h3>{recipe.title}</h3>
              <Link to={`/explore/${recipe._id}`} className="explore-new-creations-view-recipe">View Recipe</Link>
              {/* RECIPE CARD DESCRIPTION THAT IS VIEWABLE VIA CLICK */}
              <p className="explore-new-creations-description" onClick={() => openModalWithDescription(recipe.description)}>
                {recipe.description.length > 15 ? recipe.description.substring(0, 15) + '...' : recipe.description}
              </p>
              <div className="explore-new-creations-tags-container">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="explore-new-creations-tag">{tag}</span>
                ))}
                {/* Renders placeholders for the remaining tags so it'll space evenly */}
                {Array.from({ length: 6 - recipe.tags.length }).map((_, index) => (
                  <span key={`placeholder-${index}`} className="explore-new-creations-tag placeholder"></span>
                ))}
              </div>  
              {/* Display allergens */}
              <div className="explore-new-creations-allergens" onClick={() => openAllergenModal(recipe.allergens)}>
                {recipe.allergens && recipe.allergens.length > 0 ? (
                  <>
                    {recipe.allergens.slice(0, 2).map((allergen, index) => (
                      <span key={index} className="explore-new-creations-allergen">{allergen}</span>
                    ))}
                    {recipe.allergens.length > 2 && <span> +more</span>}
                  </>
                ) : (
                  <span className="explore-new-creations-allergen-free">Allergen-FREE</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No shared recipes found.</p>
        )}
      </div>
      {/* Conditionally render the modal outside of the map function */}
      {isModalOpen && <DescriptionModal description={currentDescription} onClose={closeModal} />}
      {isAllergenModalOpen && <AllergenModal allergens={currentAllergens} onClose={closeAllergenModal} />}
    </div>
  );
};

export default ExploreNewCreations;