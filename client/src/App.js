
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import LandingPage from './components/Login/LandingPage/LandingPage';
import RecipesPage from './components/RecipesPage/RecipesPage';
import Breadcrumb from './components/Breadcrumb/Breadcrumb';

//USER FUNCTIONS
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import EmailVerify from './components/EmailVerify/EmailVerify';
import PasswordReset from './components/PasswordReset/PasswordReset';
import Dashboard from './components/Dashboard/Dashboard';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';
import AdminDashboard from './components/AdminDashboard/AdminDashboard'; // Import the AdminDashboard component
import UserList from './components/AdminDashboard/UserList'; // Adjust the import path as needed
import RecipeList from './components/AdminDashboard/RecipeList'; // Adjust the import path as needed


//CREATE NEW RECIPE
import CreateNewRecipe from './components/CreateNewRecipe/CreateNewRecipe';

//EXPLORE NEW CREATION
import ExploreNewCreations from './components/ExploreNewCreations/ExploreNewCreations';
import SharedRecipeDetails from './components/ExploreNewCreations/SharedRecipeDetails';
//VIEW ALL RECIPES
import ViewAllRecipes from './components/ViewAllRecipes/ViewAllRecipes'; 
import RecipeDetails from './components/RecipeDetails/RecipeDetails';

//TECHNIQUE PAGE
import TechniquesPage from './components/TechniquesPage/TechniquesPage';
////TECHNIQUE SUBPAGE
import PotsAndPansPage from './components/TechniquesPage/PotsAndPans';
import ProperProceduresPage from './components/TechniquesPage/ProperProcedures';
import UtilizingUtensilsPage from './components/TechniquesPage/UtilizingUtensils';
//////UTILIZING UTENSILS SUBPAGE
import KnivesPage from './components/TechniquesPage/Utilizing Utensils/Knives';
import VariousToolsPage from './components/TechniquesPage/Utilizing Utensils/VariousTools';
import CuttingBoardPage from './components/TechniquesPage/Utilizing Utensils/CuttingBoard';

//SAVINGS PAGE
import SavingsPage from './components/SavingsPage/SavingsPage'; 
import SpendingsPage from './components/SavingsPage/Spending'; 
import StoragePage from './components/SavingsPage/Storage'; 


//FOODLIST 
import FoodList from './components/FoodList/FoodList';
import FoodListCreationForm from './components/FoodList/FoodListCreationForm';
import FoodListDisplay from './components/FoodList/FoodListDisplay';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import EditFoodList from './components/FoodList/EditFoodList';


const App = () => {
  const user = localStorage.getItem("token");

  const [savedRecipes, setSavedRecipes] = useState([]);
  const [foodLists, setFoodLists] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSaveRecipe = (recipe) => {
    setSavedRecipes(prevRecipes => [...prevRecipes, recipe]);
  };

  const handleCreateFoodList = (newFoodList) => {
    setFoodLists(prevFoodLists => [...prevFoodLists, newFoodList]);
  };

  const handleDeleteFoodList = (id) => {
    setFoodLists(prevFoodLists => prevFoodLists.filter(list => list.id !== id));
  };

  const handleUpdateFoodList = (updatedFoodList) => {
    const updatedLists = foodLists.map(list => {
      if (list.id === updatedFoodList.id) {
        return updatedFoodList;
      }
      return list;
    });
    setFoodLists(updatedLists);
  };

  return (
    <Router>
      {user && <NavBar />}
      <Routes>
        {/* 
          The Routes component now directly contains Route components.
          Conditional rendering is used inside the element prop of each Route.
        */}
                <Route path="/" element={<LandingPage />} />

        {/* Render these routes if the user is logged in */}
        {user ? (
          <>
            {/*//////////////////*/}
            {/* RECIPE FUNCTIONS */}
            {/*//////////////////*/}
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/ViewAll" element={<ViewAllRecipes recipes={recipes} savedRecipes={savedRecipes} onSave={handleSaveRecipe} />} />
            <Route path="/CreateNew" element={<CreateNewRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/explore" element={<ExploreNewCreations />} />
            <Route path="/explore" element={<ExploreNewCreations onSave={handleSaveRecipe} />} />
            <Route path="/explore/:recipeId" element={<SharedRecipeDetails />} />
            <Route path="/CreateNew" element={<CreateNewRecipe />} />
            {/*//////////*/}
            {/* FOODLIST */}
            {/*//////////*/}
            <Route path="/foodlist" element={<FoodList foodLists={foodLists} />} />
            <Route path="/create-foodlist" element={<FoodListCreationForm recipes={recipes} onCreate={handleCreateFoodList} />} />
            <Route path="/edit-foodlist/:id" element={<EditFoodList recipes={recipes} onUpdate={handleUpdateFoodList} foodLists={foodLists} />} />
            <Route path="/foodlist" element={<FoodList foodLists={foodLists} onDelete={handleDeleteFoodList} />} />
            <Route path="/view-foodlist/:id" element={<FoodListDisplay foodLists={foodLists} />} />

            {/*////////////*/}
            {/* TECHNIQUES */}
            {/*////////////*/}
            <Route path="/techniques" element={<TechniquesPage />} />
            <Route path="/pots-and-pans" element={<PotsAndPansPage />} />
            <Route path="/proper-procedures" element={<ProperProceduresPage />} />
            <Route path="/utilizing-utensils" element={<UtilizingUtensilsPage />} />
              {/*////////////////////*/}
              {/* UTILIZING UTENSILS */}
              {/*////////////////////*/}
              <Route path="/knives" element={<KnivesPage />} />
              <Route path="/various-tools" element={<VariousToolsPage />} />
              <Route path="/cutting-board" element={<CuttingBoardPage />} />


            {/*/////////*/}
            {/* SAVINGS */}
            {/*/////////*/}           
            <Route path="/savings" element={<SavingsPage />} />
            <Route path="/spendings" element={<SpendingsPage />} />
            <Route path="/storage" element={<StoragePage />} />

            {/*////////////////*/}
            {/* USER FUNCTIONS */}
            {/*////////////////*/}
            <Route path="/view-profile" element={<Dashboard />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset/:id/:token" element={<PasswordReset />}/>
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/recipe-list" element={<RecipeList />} />
            <Route path="/login" element={<Login />} />



          </>
        ) : (
          <>
           <Route path="/AdminDashboard" element={<AdminDashboard />} />
           <Route path="/user-list" element={<UserList />} />
           <Route path="/view-profile" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            <Route path="/recipe-list" element={<RecipeList />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />


            {/* 
              Any additional public routes can be added here.
              For example, a route for a public landing page or help page that doesn't require login.
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
            {/* 
              Any additional public routes can be added here.
            */}
            
          </>
        )}
      </Routes>

    </Router>
  );
};

export default App;