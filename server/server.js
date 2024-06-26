//server.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();


// Import routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const RecipeRoute = require('./routes/RecipeRoute');
const SharedRecipeRoute = require('./routes/SharedRecipeRoute');
const adminDashboardRoute = require('./routes/adminDashboard');



const foodListRoutes = require('./routes/foodListRoute');

// Connection to the database
const connection = require("./db");
require('dotenv').config();
const passwordResetRoutes = require("./routes/passwordReset");
require('dotenv').config({ path: path.resolve(__dirname, '.env') });



// database connection
connection();

// Use JSON parsing and CORS middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));




// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/recipes', RecipeRoute);
app.use("/api/password-reset", passwordResetRoutes);
app.use('/api/sharedRecipes', SharedRecipeRoute); 
app.use('/api/admin/dashboard', adminDashboardRoute);
app.use('/api/foodlists', foodListRoutes);


// Set up port
const port = process.env.PORT || 8080;

// Start the server
const startServer = async () => {
  try {
    await connection(); // Establish database connection
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database and start the server:', error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();