import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './ProperProcedures.css';


const ProperProceduresPage = () => {
  const breadcrumbs = [
    { name: 'Culinary Techniques', to: '/techniques' },
    { name: 'Proper Procedures', to: '/proper-procedures' }
  ];
  return (
    <div className="proper-procedures-container">
        <div className="recipe-details-view-mini-breadcrumb">
        <Breadcrumb pathSegments={breadcrumbs} />
        </div>
      <header className="proper-procedures-header">
        <h1>Proper Procedures</h1>
      </header>
      <div className="proper-procedures-content-container">
        <aside className="proper-procedures-sidebar-container">
          <h3>Contents</h3>
          <ol className="proper-procedures-video-contents">
            <li>Sanitation</li>
            <li>Storing Food</li>
            <li>Safety</li>
          </ol>
        </aside>

        <div className="proper-procedures-video-wrapper">
          <iframe 
            src="https://www.youtube.com/embed/hgokUdSeIWo" 
            title="Knife Instructional Video" 
            frameBorder="0" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};

export default ProperProceduresPage;
