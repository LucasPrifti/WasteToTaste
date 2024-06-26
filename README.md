<p align="center">
  <img src="https://github.com/Aluckyasian/WasteToTaste/blob/Development_Branch/client/src/Photos/logo.png" alt="Logo" width="200"/>
</p>

# <p align="center"> Waste To Taste - Recipe Creation App </p>
<p align="center">Welcome to Waste To Taste, a community-driven platform where culinary passion meets sustainability. A single stop shop place where all of your favorite recipes can be saved, shared, and organized for your own convenience. Our app is not just about sharing and discovering delicious recipes; it's a movement towards mindful cooking, reducing food waste, and embracing the joy of home cooking. </p>


### <p align="center">Our Mission in a world where food waste is a growing concern, Waste To Taste aims to inspire users to make the most of their ingredients, share their culinary inventions, and learn from each other. Whether you're a seasoned chef or a curious newbie in the kitchen, our app serves as your companion in exploring creative, waste-minimizing cooking practices. By fostering a community of like-minded individuals, we hope to create a positive impact on our planet, one recipe at a time. Our goal is to provide a platform that not only enhances your cooking experience but also promotes a sustainable lifestyle. </p>


## Table of Contents
- [Introduction](#introduction) 
- [Features](#features) 
- [Prerequisites](#prerequisites) 
- [Getting Started](#getting-started) 
- [Folder Structure](#folder-structure) 
- [Technologies Used](#technologies-used)


## Introduction
From discovering new flavors to mastering kitchen techniques, Waste To Taste is your gateway to expanding your culinary horizons while being eco-conscious. We believe that everyone has something unique to bring to the table, and through sharing, we can all contribute to a more sustainable world. Join us in making cooking an adventure that's not only about the delight of tasting but also about learning, sharing, and caring for our environment.
## Features 
- **User Authentication:** Secure user authentication and registration system. 
- **Recipe Management:** Users can create, edit, organize, and delete their recipes. 
- **Recipe Discovery:** Browse and search for recipes shared by other users, by using elements such as tags, sorting, and searching for easier filtering.
- **Favorite Recipes:** Save recipes for easy access later. 
- **Informational Content:** Learn new culinary techniques and sharpen your skills in the kitchen. There’s also content on saving money while shopping for ingredients and food storage techniques included.
- **Responsive Design:** Fully responsive, ensuring a great experience on both desktop and mobile devices.

- **Admin Dashboard:** Admin route for managing users, recipes & content.
**(In order to sign in as an admin, please check the admin credentials located in the User Manual, located in the repository. (Page 4)).**

## Prerequisites 

Before you begin, ensure you have met the following requirements:
- **Node.js**: Version 14.x or higher installed. Node.js is essential for running the server-side JavaScript code. You can download it from [Node.js official website](https://nodejs.org/).
- **MongoDB**: Running locally on your machine or hosted on a remote server. Version 4.x or higher is recommended for full compatibility with Mongoose and the application's database operations. For local development, you can install MongoDB from [MongoDB's official site](https://www.mongodb.com/try/download/community). If you're using a remote MongoDB service, ensure it's accessible and correctly configured for use with this application.
- **Git**: Installed for version control. Git is necessary for cloning the repository and managing source code changes. Version 2.x or higher is recommended. If you haven't installed Git yet, you can find the installation instructions on the [Git official website](https://git-scm.com/downloads).
- **A Text Editor or IDE**: Such as Visual Studio Code (VS Code) version 1.50 or higher, which is recommended for editing the codebase. VS Code is a popular, free, and open-source editor that provides powerful features such as syntax highlighting, IntelliSense (code completion), and debug support. Download it from [Visual Studio Code's official site](https://code.visualstudio.com/).

Please ensure that all prerequisites are properly installed and configured before proceeding with the setup and running of the "Waste To Taste" project.


## Getting Started 
To get Waste To Taste up and running on your local machine for development and testing purposes, follow these steps: 
1. **Clone the repository:**
git clone https://github.com/Aluckyasian/WasteToTaste.git
2. **Navigate to the project directory:**
cd WasteToTaste
3. **Install dependencies:**
 - For the client: ```cd client``` Then, ```npm install```
 - For the server: ```cd server``` Then, ```npm install``` 

4. **Setting up your environment variables:** 
In case you did not notice, the `.env` file has already been added and not hidden by the `.gitignore.` We decided to keep the `.env` file public so that the users and developers have easy access to all features without having to make any changes other than the self generated JWT key. In order to change the JWT key, please follow these insturctions: In the server directory, navigate to the `.env` file and replace `PRIVATE_KEY` with a secure secret for JWT.

6. **Set up connection with MongoDB Compass:**
Open MongoDB Compass and connect to your local MongoDB instance using the following URI (also provided in the `.env`) file: `mongodb+srv://wastetotaste222:sg85AQZc0zM7XePz@wastetotaste.g88qrko.mongodb.net/?retryWrites=true&w=majority`. This will allow you to visually manage the app's database.

6. **Start the server:**
Open a new Terminal and Run:
- 1. ```cd server```
- 2. ```npm start```
7. **In another new terminal, start the client:**
- 1. ```cd client``` 
- 2. ```npm start```

The client will run on `http://localhost:3000` by default. 

## Folder Structure 
### **Client Side:**
- **client/**: Contains the React frontend application. 
- **src/**: The source files for the frontend, including components, styles, and hooks. 
- **public/**: Public files like the `index.html` template and assets.
### **Server Side:**
- **server/**: Contains the Express.js backend application. 
- **config/**: Configuration files, such as the database config. 
- **controllers/**: Functions to respond to incoming requests. 
- **models/**: Mongoose models for your MongoDB documents. 
- **routes/**: API route definitions. 
- **middlewares/**: Express middleware for error handling, authentication, etc. 
- **.env**: (In server directory) An environment file for storing sensitive settings.

## Technologies Used

This project makes use of the following technologies and specific versions:

- **Frontend:**
  - **React:** A JavaScript library for building user interfaces. The project setup was created with Create React App.
- **Backend:**
  - **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine. Version used: **14.x or higher.**
  - **Express.js:** A web application framework for Node.js, designed for building web applications and APIs. Version **4.18.2**.
- **Database:**
  - **MongoDB:** A NoSQL database used for storing application data. 
  - **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js. Version **8.1.1**.
- **Authentication:**
  - **JSON Web Tokens (JWT):** For securely transmitting information between parties as a JSON object. 
  - **bcrypt:** A library to help you hash passwords. Version used ensures compatibility with the Node.js version.
- **Development Tools:**
  - **nodemon:** A utility that monitors for any changes in your source and automatically restarts your server. Version **3.0.3**.
  - **nodemailer:** An easy-to-use module to send emails from your Node.js applications. Version **6.9.8**.
- **Other Dependencies:**
  - **cors:** Version **2.8.5**, used to enable CORS with various options.
  - **dotenv:** Version **16.4.4**, used to load environment variables from a `.env` file into `process.env`.
  - **joi-password-complexity:** Version **5.2.0**, used for password complexity options and validation.

These versions are specified to ensure compatibility and functionality of the application. Ensure that your development environment matches or exceeds these versions for optimal performance.

