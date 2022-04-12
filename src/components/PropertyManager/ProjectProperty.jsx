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
  setIsZipping,
  imgDimension,
  setIsPreview,
}) => {
  const onClickZip = () => {
    setIsZipping(true);
    resultToZip();
  };

  const changeColSize = (e) => {
    setCollectionSize(
      e.target.value > 15000 ? 15000 : e.target.value < 0 ? 0 : e.target.value
    );
    setIsPreview(false);
  };
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
          onChange={(e) => changeColSize(e)}
        />
      </div>
      <div className="property_item">
        <p>Dimension</p>
        <div className="property_dimension">
          <p className="collection_price">
            {imgDimension ? imgDimension[0] : 0}
          </p>
          <p className="collection_price">
            {imgDimension ? imgDimension[1] : 0}
          </p>
        </div>
      </div>
      <div className="property_item">
        <p>Price (USD)</p>
        <p className="collection_price">{Math.round(price * 100) / 100} $</p>
      </div>
      <div className="property_item">
        <p>Export:</p>
        <button className="export_button" onClick={() => onClickZip()}>
          Zip
        </button>
      </div>
    </div>
  );
};
