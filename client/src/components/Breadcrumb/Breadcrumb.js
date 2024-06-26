import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css'; 

const Breadcrumb = ({ pathSegments }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {pathSegments.map((segment, index) => (
          <li key={index} className={`breadcrumb-item ${index === pathSegments.length - 1 ? 'active' : ''}`}>
            {index === pathSegments.length - 1 ? (
              segment.name
            ) : (
              <Link to={segment.to}>{segment.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
