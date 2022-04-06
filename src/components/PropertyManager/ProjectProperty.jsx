import React from "react";
import "./PropertyManager.css";
export const ProjectProperty = ({ collectionSize, setCollectionSize }) => {
  return (
    <div className="property_container">
      <div className="property_item `">
        <p>Project Name</p>
        <input type="text" placeholder="Project Name" />
      </div>
      <div className="property_item">
        <p>Project Description</p>
        <input type="text" placeholder="Project Description" />
      </div>
      <div className="property_item">
        <p>Collection Size</p>
        <input
          type="number"
          placeholder="Collection Size"
          value={collectionSize}
          className="collection_input"
          onChange={(e) => setCollectionSize(e.target.value)}
        />
      </div>
      <div className="property_item">
        <p>Dimesion</p>
        <div className="property_dimension">
          <input type="text" placeholder="" />
          <input type="text" placeholder="" />
        </div>
      </div>
      <div className="property_item `">
        <p>Price (USD)</p>
        <input type="number" className="collection_input" value={0} />
      </div>
      <div className="property_item">
        <p>Export:</p>
        <button className="export_button">webp</button>
      </div>
    </div>
  );
};
