import React from "react";
import "./Sidebar.css";

export const Layer = (layerData) => {
  return (
    <div className="layer_single">
      <div className="layer_title">{layerData.data.title}</div>
      <div className="layer_values">
        <p>{layerData.data.count}</p>
        <p>{layerData.data.rarity}%</p>
      </div>
    </div>
  );
};
