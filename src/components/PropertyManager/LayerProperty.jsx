import React from "react";
import "./PropertyManager.css";
export const LayerProperty = ({
  setRarity,
  deleteLayer,
  layerData,
  selectedLayer,
  setLayerData,
}) => {
  const changeLayerName = (e) => {
    const newState = layerData.map((obj) =>
      obj.id === selectedLayer ? { ...obj, title: e } : obj
    );
    setLayerData(newState);
  };
  return (
    <div className="property_container layer_container">
      <div className="property_item">
        <p>Layer Name</p>
        <input
          type="text"
          placeholder="Layer Name"
          value={
            layerData.length > 0
              ? layerData.filter((item) => item.id === selectedLayer).length > 0
                ? layerData.filter((item) => item.id === selectedLayer)[0].title
                : "sss"
              : ""
          }
          onChange={(e) => changeLayerName(e.target.value)}
        />
      </div>
      <button className="export_button" onClick={() => setRarity(true)}>
        Rarity Settings
      </button>
      <button className="setting_button" onClick={() => deleteLayer()}>
        Layer Settings&nbsp;&times;
      </button>
    </div>
  );
};
