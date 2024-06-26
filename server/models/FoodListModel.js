// models/FoodListModel.js
const mongoose = require('mongoose');

const foodListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const FoodList = mongoose.model('FoodList', foodListSchema);

module.exports = FoodList;
