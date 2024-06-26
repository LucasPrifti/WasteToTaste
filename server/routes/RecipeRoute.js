//route/RecipeRoute.js
const express = require('express');
const Recipe = require('../models/Recipe');
const SharedRecipe = require('../models/SharedRecipe');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { createRecipe } = require('../controllers/recipeController');
const verifyToken = require('./verifyToken');

router.post('/:recipeId/share', verifyToken, recipeController.shareRecipe);
router.post('/saveSharedRecipe', verifyToken, recipeController.saveSharedRecipe);

// Endpoint to get all recipes
// In your recipe routes file
router.get('/', verifyToken, recipeController.findAllRecipes);


// Endpoint to get a single recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error retrieving recipe:', error);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to save a new recipe
router.post('/', verifyToken, recipeController.createRecipe);
router.get('/', recipeController.findAllRecipes);
router.get('/:id', recipeController.findRecipeById);
router.put('/:id', verifyToken, recipeController.updateRecipe);
router.delete('/:id', verifyToken, recipeController.deleteRecipe);

module.exports = router;