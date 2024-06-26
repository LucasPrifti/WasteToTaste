// NavBar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate('/', { replace: true });
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Function to determine the class for NavLink based on its active state
  const getNavLinkClass = ({ isActive }) => isActive ? "activeLink" : "";

  return (
    <div className="navbar">
      <div className="menu">
        <Link to="/view-profile">Dashboard</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/techniques">Culinary Techniques</Link>
        <Link to="/savings">Strategic Savings and Storage</Link>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
     
    </div>
  );
};

export default NavBar;
