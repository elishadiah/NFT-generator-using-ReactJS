import React from "react";
import "./PropertyManager.css";
export const LayerProperty = () => {
  return (
    <div className="property_container layer_container">
      <div className="property_item">
        <p>Layer Name</p>
        <input type="text" placeholder="Layer Name" />
      </div>
      <button className="export_button">Rarity Settings</button>
      <button className="setting_button">Layer Settings&nbsp;x</button>
    </div>
  );
};
