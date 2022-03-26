import React from "react";
import "./PropertyManager.css";
export const ProjectProperty = () => {
  return (
    <div className="property_container">
      <div className="property_item">
        <p>Project Name</p>
        <input type="text" placeholder="Project Name" />
      </div>
      <div className="property_item">
        <p>Project Description</p>
        <input type="text" placeholder="Project Description" />
      </div>
      <div className="property_item">
        <p>Collection Size</p>
        <input type="text" placeholder="Collection Size" />
      </div>
      <div className="property_item">
        <p>Dimesion</p>
        <div className="property_dimension">
          <input type="text" placeholder="" />
          <input type="text" placeholder="" />
        </div>
        <button className="export_button">Export to: webp</button>
      </div>
    </div>
  );
};
