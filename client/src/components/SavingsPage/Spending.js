//Spending.js
import React from 'react';
import './Spending.css'; 
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const SpendingPage = () => {
  const breadcrumbs = [
    { name: 'Savings', to: '/savings' },
    { name: 'Spending', to: '/spendings' },
  ];
  return (
    <div className="spending-container">
        <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
        </div>
      <header className="spending-header">
        <h1>Spending</h1>
      </header>
      <div className="spending-content-container">
        <aside className="spending-sidebar-container">
          <h3>Contents</h3>
          <ol className="spending-video-contents">
            <li>ALDI's = Best Savings</li>
            <li>Using a Basket instead of a cart</li>
            <li>Buy bulk carbs</li>
            <li>Meats</li>
            <li>Fruits/Vegetable</li>
            <li>Buying Frozen Food</li>
            <li>Buying Canned Food</li>
          </ol>
        </aside>
        <div className="spending-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/bbWTMBDWfIQ" 
            title="Knife Instructional Video" 
            frameBorder="0" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default SpendingPage;
