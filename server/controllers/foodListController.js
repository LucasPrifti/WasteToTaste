// controllers/foodListController.js
const FoodList = require('../models/FoodListModel');
const Recipe = require('../models/Recipe');

exports.createFoodList = async (req, res) => {
  const { name, description, recipes } = req.body;
  try {
    const newFoodList = new FoodList({
      name,
      description,
      recipes, 
      user: req.user._id 
    });
    await newFoodList.save();
    res.status(201).json(newFoodList);
  } catch (error) {
    res.status(500).json({ message: "Error creating food list", error });
  }
};

exports.getFoodListById = async (req, res) => {
  try {
    const foodList = await FoodList.findById(req.params.id).populate('recipes');
    if (!foodList) {
      return res.status(404).json({ message: 'Food list not found' });
    }
    res.json(foodList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching food list', error });
  }
};


exports.getAllFoodLists = async (req, res) => {
  try {
    const foodLists = await FoodList.find({ user: req.user._id }).populate('recipes');
    res.json(foodLists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food lists", error });
  }
};

exports.updateFoodList = async (req, res) => {
    const { id } = req.params;
    const { name, description, recipes } = req.body;
  
    try {
      const foodList = await FoodList.findById(id);
      
      if (!foodList) {
        return res.status(404).json({ message: 'Food list not found' });
      }
      
      if (foodList.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized to update this food list' });
      }
  
      foodList.name = name || foodList.name;
      foodList.description = description || foodList.description;
      foodList.recipes = recipes || foodList.recipes;
      
      const updatedFoodList = await foodList.save();
      res.json(updatedFoodList);
    } catch (error) {
      res.status(500).json({ message: "Error updating food list", error });
    }
  };

  exports.deleteFoodList = async (req, res) => {
    const { id } = req.params;
  
    try {
      const foodList = await FoodList.findById(id);
  
      if (!foodList) {
        return res.status(404).json({ message: 'Food list not found' });
      }
      
      if (foodList.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized to delete this food list' });
      }
  
      await FoodList.findByIdAndDelete(id);
      res.json({ message: 'Food list deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: "Error deleting food list", error });
    }
  };
  

exports.saveRecipeToFoodList = async (req, res) => {
  const { foodListId, sharedRecipeId } = req.body;
  try {
    const foodList = await FoodList.findById(foodListId);
    if (!foodList) {
      return res.status(404).json({ message: 'Food list not found' });
    }
    
    const sharedRecipe = await Recipe.findById(sharedRecipeId);
    if (!sharedRecipe) {
      return res.status(404).json({ message: 'Shared recipe not found' });
    }

    if (foodList.recipes.includes(sharedRecipe._id)) {
      return res.status(400).json({ message: 'Recipe already in the food list' });
    }

    foodList.recipes.push(sharedRecipe._id);
    await foodList.save();

    res.status(200).json(foodList);
  } catch (error) {
    res.status(500).json({ message: 'Error saving recipe to food list', error });
  }
};

