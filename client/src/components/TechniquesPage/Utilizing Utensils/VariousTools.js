import React from 'react';
import { Link } from 'react-router-dom';
import './VariousTools.css';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';

const VariousToolsPage = () => {
  const breadcrumbs = [
    { name: 'Culinary Techniques', to: '/techniques' },
    { name: 'Utilizing Utensils', to: '/utilizing-utensils' },
    { name: 'Various Tools', to: '/various-tools' }
  ];
  return (
    <div className="various-tools-container">
        <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
        </div>
      <header className="various-tools-header">
        <h1>Various Tools</h1>
      </header>
      <div className="various-tools-content-container">
        <aside className="various-tools-sidebar-container">
          <h3>Contents</h3>
          <ol className="various-tools-video-contents">
            <li>Whisk</li>
            <li>Rolling Pin</li>
            <li>Meat Tenderizer</li>
            <li>Measuring Cups</li>
            <li>Food Scale</li>
            <li>Knife Rod</li>
            <li>Thermometer</li>
          </ol>
        </aside>

        <div className="various-tools-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/Jk9eDtVNTqQ" 
            title="Knife Instructional Video" 
            frameBorder="0" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};


export default VariousToolsPage;
