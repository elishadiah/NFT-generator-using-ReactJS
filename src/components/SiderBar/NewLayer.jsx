import React from "react";
import "./Sidebar.css";

export const NewLayer = () => {
  return (
    <div className="new_layer">
      <div className="layer_title">
        <input
          type="text"
          placeholder="New Layer"
          className="new_layer_input"
        />
      </div>
      <div className="new_layer_add">+</div>
    </div>
  );
};
