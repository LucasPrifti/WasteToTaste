//Storage.js
import React from 'react';
import './Storage.css'; 
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const StoragePage = () => {
  const breadcrumbs = [
    { name: 'Savings', to: '/savings' },
    { name: 'Storage', to: '/storage' },
  ];
  return (
    <div className="storage-container">
        <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
        </div>
      <header className="storage-header">
        <h1>Storage</h1>
      </header>
      <div className="storage-content-container">
        <aside className="storage-sidebar-container">
          <h3>Contents</h3>
          <ol className="storage-video-contents">
            <li>Storing Dairy</li>
            <li>Storing Veggies/Fruit</li>
            <li>Storing Meats</li>
            <li>Storing Grains/Legumes</li>
            <li>Storing Condiments</li>
            <li>Storing Breads</li>
          </ol>
        </aside>

        <div className="storage-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/cDfiiUsObpo" 
            title="Knife Instructional Video" 
            frameBorder="0" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default StoragePage;
