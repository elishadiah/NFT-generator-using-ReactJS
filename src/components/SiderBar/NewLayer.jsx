import React, { useState } from "react";
import "./Sidebar.css";

export const NewLayer = ({ layerData, setLayerData }) => {
  const [layerName, setLayerName] = useState("");
  const addLayer = () => {
    console.log("Add layer", layerName);
    var dates = new Date();

    const newObj = {
      id: new Date(dates).getTime(),
      title: layerName,
      count: 0,
      rarity: 0,
    };
    if (layerName) setLayerData(() => [...layerData, newObj]);
    setLayerName("");
  };
  return (
    <div className="new_layer">
      <div className="layer_title">
        <input
          type="text"
          value={layerName}
          placeholder="New Layer"
          className="new_layer_input"
          onChange={(e) => setLayerName(e.target.value)}
        />
      </div>
      <button className="new_layer_add" onClick={() => addLayer()}>
        +
      </button>
    </div>
  );
};
