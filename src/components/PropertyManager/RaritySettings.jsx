import React, { useState } from "react";
import Range from "react-range-progress";
import "./PropertyManager.css";

const CHILD_DATA = [
  {
    id: 0,
    title: "Img01",
    url: "https://",
    value: 30,
  },
  {
    id: 1,
    title: "Img02",
    url: "https://",
    value: 50,
  },
  {
    id: 2,
    title: "Img03",
    url: "https://",
    value: 20,
  },
];

export const RaritySettings = ({
  setRarity,
  selectedLayer,
  setSelectedLayer,
  layerData,
  setLayerData,
}) => {
  const targetData = layerData.filter((item) => item.id === selectedLayer)[0];
  const [childRarityData, setChildRarityData] = useState(CHILD_DATA);

  const onMainRangeChanged = (value) => {
    const newState = layerData.map((obj) =>
      obj.id === selectedLayer ? { ...obj, rarity: value } : obj
    );
    setLayerData(newState);
  };
  const onChildRangeChanged = (value, id) => {
    const newArray = childRarityData.map((element) =>
      element.id === id ? { ...element, value } : element
    );
    setChildRarityData([...newArray]);
  };
  return (
    <div className="rarity_settings">
      <div className="rarity_modal">
        <button className="close_modal" onClick={() => setRarity(false)}>
          &times;
        </button>
        <div className="parant_range">
          <p>
            Rarity Settings -{" "}
            {layerData.length > 0
              ? targetData.title
              : "Please Create New Layer"}
          </p>
          <div className="range_area">
            <div className="range_area_input">
              <input
                type="number"
                value={layerData.length > 0 ? targetData.rarity : 20}
                onChange={(e) => onMainRangeChanged(e.target.value)}
              />
              <p>%</p>
            </div>
            <div className="range_area_picker">
              <p>1%</p>
              <Range
                value={layerData.length > 0 ? targetData.rarity : 20}
                fillColor={{ r: 20, g: 150, b: 100, a: 0.75 }}
                tractColor={{ r: 10, g: 10, b: 0, a: 0.5 }}
                height={14}
                min={1}
                max={99}
                width="100%"
                onChange={(e) => onMainRangeChanged(e)}
              />
              <p>100%</p>
            </div>
          </div>
        </div>
        <div className="child_range">
          <p>Assets - </p>
          {childRarityData.map((item) => (
            <div className="range_area" key={item.id}>
              <p>{item.title}</p>
              <div className="range_area_input">
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => onChildRangeChanged(e.target.value, item.id)}
                />
                <p>%</p>
              </div>
              <div className="range_area_picker_child">
                <Range
                  value={item.value}
                  fillColor={{ r: 20, g: 150, b: 100, a: 0.75 }}
                  tractColor={{ r: 10, g: 10, b: 0, a: 0.5 }}
                  height={14}
                  min={1}
                  max={99}
                  width="100%"
                  onChange={(e) => onChildRangeChanged(e, item.id)}
                />
                <div className="child_comment">
                  <p>Rare</p>
                  <p>Common</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
