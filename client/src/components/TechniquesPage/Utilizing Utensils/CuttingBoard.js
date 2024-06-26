import React from 'react';
import { Link } from 'react-router-dom';
import './CuttingBoard.css';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';

const CuttingBoardPage = () => {
  const breadcrumbs = [
    { name: 'Culinary Techniques', to: '/techniques' },
    { name: 'Utilizing Utensils', to: '/utilizing-utensils' },
    { name: 'Cutting Board', to: '/cutting-board' }
  ];
  return (
    <div className="cutting-board-container">
        <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
        </div>
      <header className="cutting-board-header">
        <h1>Cutting Board</h1>
      </header>
      <div className="cutting-board-content-container">
        <aside className="cutting-board-sidebar-container">
          <h3>Contents</h3>
          <ol className="cutting-board-video-contents">
            <li>Types of Boards</li>
            <li>Board Care</li>
          </ol>
        </aside>

        <div className="cutting-board-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/L4XX9ENMAhE" 
            title="Knife Instructional Video" 
            frameBorder="0" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};


export default CuttingBoardPage;
