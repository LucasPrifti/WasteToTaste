import React from 'react';
import { Link } from 'react-router-dom';
import KNIFESpng from '../../Photos/KNIFES.png'; 
import VARIOUSTOOLSpng from '../../Photos/VARIOUSTOOLS.png'; 
import CUTTINGBOARDpng from '../../Photos/CUTTINGBOARD.png'; 
import './UtilizingUtensils.css'; 
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const UtilizingUtensilsPage = () => {
  const breadcrumbs = [
    { name: 'Culinary Techniques', to: '/techniques' },
    { name: 'Utilizing Utensils', to: '/utilizing-utensils' },
  ];
  
  return (
    
    <div className="utilizing-utensils-container">
        <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
        </div>
      <header className="utilizing-utensils-header">
        <h1>UTILIZING UTENSILS</h1>
      </header>
      <section className="utilizing-utensils-options">
        <div className="utilizing-utensils-item">
          <img src={KNIFESpng} alt="Knives" />
          <Link to="/knives" className="knives-Button">Knives</Link>
        </div>
        <div className="utilizing-utensils-item">
        <img src={VARIOUSTOOLSpng} alt="Various Tools" />
        <Link to="/various-tools" className="various-tools-Button">Various Tools</Link> 
      </div>
        <div className="utilizing-utensils-item">
          <img src={CUTTINGBOARDpng} alt="Cutting Board" />
          <Link to="/cutting-board" className="cutting-board-Button">Cutting Board</Link>
        </div>
      </section>
    </div>
  );
};
export default UtilizingUtensilsPage;
