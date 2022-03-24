import React from "react";
import { Layer } from "./Layer";
import { NewLayer } from "./NewLayer";

const layerData = [
  {
    title: "Background",
    count: 2,
    rarity: 30,
  },
  {
    title: "Eye",
    count: 1,
    rarity: 40,
  },
  {
    title: "Head",
    count: 6,
    rarity: 20,
  },
];
export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar_title">Layers</div>
      {layerData.map((item) => (
        <Layer data={item} />
      ))}
      <NewLayer />
      <div className="buttons">
        <button>Preview</button>
        <button>Pay & Generate Col.</button>
      </div>
    </div>
  );
};
