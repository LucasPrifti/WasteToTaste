// models/SharedRecipe.js
const mongoose = require('mongoose');

const sharedRecipeSchema = new mongoose.Schema({
  originalRecipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  title: { type: String, required: true },
  ingredients: { type: [String], required: true }, 
  instructions: { type: [String], required: true }, 
  description: {
    type: String,
    required: true // Set to true if it should be required
  },
  videoUrl: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  tags: [String],
  allergens: { type: [String], default: [] },
  sharedOn: { type: Date, default: Date.now } 
});

const SharedRecipe = mongoose.model('SharedRecipe', sharedRecipeSchema);

module.exports = SharedRecipe;
