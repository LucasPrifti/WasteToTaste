// recipeController.js
const Recipe = require('../models/Recipe');
const SharedRecipe = require('../models/SharedRecipe');//New SharedRecipe.js


///////////////////////////////
//Function to create new recipe
///////////////////////////////
exports.createRecipe = async (req, res) => {
  const { title, ingredients, instructions, videoUrl, description, tags, allergens} = req.body; 
    try {
        const newRecipe = await Recipe.create({
            title,
            ingredients,
            instructions,
            description, 
            videoUrl,
            tags,
            allergens,
            user: req.user._id 
          });
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json({ message: "Error creating recipe." });
    }
};

///////////////////////////////
//Function to share recipe
///////////////////////////////
exports.shareRecipe = async (req, res) => {
  const { recipeId } = req.params; 
  const userId = req.user;

  try {
    const originalRecipe = await Recipe.findById(recipeId);
    if (!originalRecipe) {
      return res.status(404).json({ message: 'Original recipe not found' });
    }

    const sharedRecipe = await SharedRecipe.create({
      originalRecipeId: recipeId,
      ...originalRecipe.toObject(),
      user: userId,
    });

    res.status(201).json(sharedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Error sharing recipe." });
  }
};
  


///////////////////////////////
//Function to SAVE SHARD recipe
///////////////////////////////
exports.saveSharedRecipe = async (req, res) => {
  const userId = req.user; 
  const { title, ingredients, instructions, videoUrl, description, tags, allergens } = req.body;
  
  try {
    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      videoUrl,
      description,
      tags,
      allergens,
      user: userId, // Associate the new recipe with the user
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Failed to save shared recipe as a new recipe', error);
    res.status(500).json({ message: 'Failed to save recipe' });
  }
};

  ///////////////////////////////
  // Function to update an existing recipe
  ///////////////////////////////
  exports.updateRecipe = async (req, res) => {
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        { ...req.body, description: req.body.description || '' }, // Include the description or empty string if not provided
        { new: true }
      );
      if (!updatedRecipe) {
        return res.status(404).send('Recipe not found');
      }
      res.json(updatedRecipe);
    } catch (error) {
      res.status(500).send('Error updating recipe');
    }
  };

    ///////////////////////////////
    // Function to delete a recipe
    ///////////////////////////////
    exports.deleteRecipe = async (req, res) => {
      try {
          const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
          if (deletedRecipe) {
              res.json({ message: 'Recipe successfully deleted' });
          } else {
              res.status(404).json({ message: 'Recipe not found' });
          }
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
    };

  ///////////////////////////////
  // Function to retrieve all recipes
  ///////////////////////////////
  exports.findAllRecipes = async (req, res) => {
    try {
        const userId = req.user._id; 
        const recipes = await Recipe.find({ user: userId });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
   
  ///////////////////////////////
  // Function to FIND ALL SHARED RECIPES
  ///////////////////////////////
  exports.findAllSharedRecipes = async (req, res) => {
    try {
        const sharedRecipes = await SharedRecipe.find();
        res.json(sharedRecipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  };


  ///////////////////////////////
  // Function to retrieve a single recipe by ID
  ///////////////////////////////
  exports.findRecipeById = async (req, res) => {
      try {
          const recipe = await Recipe.findById(req.params.id);
          if (recipe) {
              res.json(recipe);
          } else {
              res.status(404).json({ message: 'Recipe not found' });
          }
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };
  