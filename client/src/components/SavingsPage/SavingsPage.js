import React from 'react';
import { Link } from 'react-router-dom';
import SPENDINGpng from '../../Photos/SPENDING.png'; 
import STORAGEpng from '../../Photos/STORAGE.png'; 
import './SavingsPage.css'; 
import Breadcrumb from '../Breadcrumb/Breadcrumb';


const SavingsPage = () => {
  return (
    <div className="savings-page-container">
      <header className="savings-page-header">
        <h1>MAXIMIZE YOUR SAVINGS</h1>
      </header>
      <section className="savings-page-options">
        <div className="savings-page-item">
          <img src={SPENDINGpng} alt="Spending" />
          <Link to="/spendings" className="Spending-Button">Spending</Link>
        </div>
        <div className="savings-page-item">
        <img src={STORAGEpng} alt="Storage" />
        <Link to="/storage" className="Storage-Button">Storage</Link> 
      </div>
      </section>
    </div>
  );
};

export default SavingsPage;