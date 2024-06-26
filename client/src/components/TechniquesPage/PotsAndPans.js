import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './PotsAndPans.css';

const PotsAndPansPage = () => {
  const breadcrumbs = [
    { name: 'Culinary Techniques', to: '/techniques' },
    { name: 'Pots and Pans', to: '/pots-and-pans' }
  ];
  return (
    <div className="pots-and-pans-container">
        <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
        </div>
      <header className="pots-and-pans-header">
        <h1>Pots and Pans</h1>
      </header>
      <div className="pots-and-pans-content-container">
        <aside className="pots-and-pans-sidebar-container">
          <h3>Contents</h3>
          <ol className="pots-and-pans-video-contents">
            <li>Types of Pots/Pans</li>
            <li>Ways to Use</li>
            <li>Pots/Pans Care</li>
          </ol>
        </aside>

        <div className="pots-and-pans-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/zQanX_bN_Y0" 
            title="Knife Instructional Video" 
            frameBorder="0" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default PotsAndPansPage;
