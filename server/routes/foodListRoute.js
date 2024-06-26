//route/foodListRoute.js
const express = require('express');
const router = express.Router();
const foodListController = require('../controllers/foodListController');
const verifyToken = require('./verifyToken');

// POST request to create a new food list
router.post('/', verifyToken, foodListController.createFoodList);

// GET request to get all food lists for a user
router.get('/', verifyToken, foodListController.getAllFoodLists);

// GET request to get a specific food list by id
router.get('/:id', verifyToken, foodListController.getFoodListById);

// PUT request to update a specific food list by id
router.put('/:id', verifyToken, foodListController.updateFoodList);

// DELETE request to delete a specific food list by id
router.delete('/:id', verifyToken, foodListController.deleteFoodList);

// POST request to save a recipe to a food list
router.post('/saveRecipeToFoodList', verifyToken, foodListController.saveRecipeToFoodList);

module.exports = router;
