import React from 'react';
import { Link } from 'react-router-dom';
import UTILIZINGUTENSILSpng from '../../Photos/UTILIZINGUTENSILS.png'; 
import POTSANDPANSpng from '../../Photos/POTSANDPANS.png'; 
import PROPERPROCEDURESpng from '../../Photos/PROPERPROCEDURES.png'; 
import './TechniquesPage.css'; 
import Breadcrumb from '../Breadcrumb/Breadcrumb';


const TechniquesPage = () => {
  return (
    <div className="technique-page-container">
      <header className="technique-page-header">
        <h1>MASTER YOUR KITCHEN</h1>
      </header>
      <section className="technique-page-options">
        <div className="technique-page-item">
          <img src={UTILIZINGUTENSILSpng} alt="Utilizing Utensils" />
          <Link to="/utilizing-utensils" className="Utilizing-Utensils-Button">Utilizing Utensils</Link>
        </div>
        <div className="technique-page-item">
        <img src={POTSANDPANSpng} alt="Pots and Pans" />
        <Link to="/pots-and-pans" className="Pots-and-Pans-Button">Pots and Pans</Link> 
      </div>
        <div className="technique-page-item">
          <img src={PROPERPROCEDURESpng} alt="Proper Procedures" />
          <Link to="/proper-procedures" className="Proper-Procedures-Button">Proper Procedures</Link>
        </div>
      </section>
    </div>
  );
};
export default TechniquesPage;
