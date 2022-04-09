import React from "react";
import "./PropertyManager.css";
export const ProjectProperty = ({
  collectionSize,
  setCollectionSize,
  price,
  projectName,
  projectDesc,
  setProjectName,
  setProjectDesc,
  resultToZip,
}) => {
  return (
    <div className="property_container">
      <div className="property_item `">
        <p>Project Name</p>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="property_item">
        <p>Project Description</p>
        <input
          type="text"
          placeholder="Project Description"
          value={projectDesc}
          onChange={(e) => setProjectDesc(e.target.value)}
        />
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
      {/* <div className="property_item">
        <p>Dimesion</p>
        <div className="property_dimension">
          <input type="number" placeholder="" max={420} min={30} />
          <input type="number" placeholder="" max={420} min={30} />
        </div>
      </div> */}
      <div className="property_item">
        <p>Price (USD)</p>
        <p className="collection_price">{Math.round(price * 100) / 100} $</p>
      </div>
      <div className="property_item">
        <p>Export:</p>
        <button className="export_button" onClick={() => resultToZip()}>
          Zip
        </button>
      </div>
    </div>
  );
};
