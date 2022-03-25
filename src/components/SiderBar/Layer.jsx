import React, { useEffect } from "react";
import "./Sidebar.css";

export const Layer = ({ data, selectedLayer, setSelectedLayer }) => {
  const changeSelectedLayer = (e) => {
    setSelectedLayer(e);
  };
  useEffect(() => {}, [selectedLayer]);
  return (
    <div
      className={
        data.id === selectedLayer
          ? "layer_single selected_layer"
          : "layer_single"
      }
      onClick={() => changeSelectedLayer(data.id)}
    >
      <div className="layer_title">{data.title}</div>
      <div className="layer_values">
        <p>{data.count}</p>
        <p>{data.rarity}%</p>
      </div>
    </div>
  );
};
