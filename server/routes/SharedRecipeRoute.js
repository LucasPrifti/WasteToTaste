// routes/SharedRecipeRoute.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const verifyToken = require('./verifyToken');
const SharedRecipe = require('../models/SharedRecipe');
const { shareRecipe } = require('../controllers/recipeController');
const { findAllRecipes } = require('../controllers/recipeController');


// Endpoint to get all shared recipes
router.get('/', async (req, res) => {
    try {
      const sharedRecipes = await SharedRecipe.find().populate('originalRecipeId');
      res.json(sharedRecipes);
    } catch (error) {
      console.error('Error retrieving shared recipes:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Endpoint to get a single shared recipe by ID, including the original recipe details
  router.get('/:id', async (req, res) => {
    try {
      const sharedRecipe = await SharedRecipe.findById(req.params.id).populate('originalRecipeId');
      if (sharedRecipe) {
        res.json(sharedRecipe);
      } else {
        res.status(404).json({ message: 'Shared recipe not found' });
      }
    } catch (error) {
      console.error('Error retrieving shared recipe:', error);
      res.status(500).json({ message: error.message });
    }
  });
  

  module.exports = router;