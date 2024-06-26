// Knives.js
import React from 'react';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import './Knives.css';

const KnivesPage = () => {
  const breadcrumbs = [
    { name: 'Culinary Techniques', to: '/techniques' },
    { name: 'Utilizing Utensils', to: '/utilizing-utensils' },
    { name: 'Knives', to: '/knives' }
  ];
  return (
    <div className="knives-container">
      <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
      </div>
      <header className="knives-header">
        <h1>Knives</h1>
      </header>
      <div className="knives-content-container">
        <aside className="knives-sidebar-container">
          <h3>Contents</h3>
          <ol className="knives-video-contents">
            <li>Types of Knives</li>
            <li>Knife Handling</li>
            <li>Ways to Cut</li>
            <li>Knife Care</li>
          </ol>
        </aside>
        <div className="knives-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/Y7jMlwDaMBY" 
            title="Knife Instructional Video" 
            frameBorder="0" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default KnivesPage;
