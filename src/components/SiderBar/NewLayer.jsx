import React, { useState } from "react";
import "./Sidebar.css";

export const NewLayer = ({ layerData, setLayerData, setSelectedLayer }) => {
  const [layerName, setLayerName] = useState("");
  const addLayer = () => {
    var dates = new Date();

    const newObj = {
      id: new Date(dates).getTime(),
      title: layerName,
      images: [],
      rarity: 0,
    };
    if (layerName) {
      if (layerData.length > 0) {
        setLayerData(() => [...layerData, newObj]);
      } else {
        setLayerData([newObj]);
        setSelectedLayer(newObj.id);
      }
    }
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
