import React, { useState } from "react";
import Range from "react-range-progress";
import "./PropertyManager.css";

const DEFAULT_DATA = {
  title: "Background",
  value: 25,
};
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

export const RaritySettings = ({ setRarity }) => {
  const [defaultData, setDefaultData] = useState(DEFAULT_DATA);
  const [childData, setChildData] = useState(CHILD_DATA);

  const onMainRangeChanged = (value) => {
    setDefaultData({ ...defaultData, value });
  };
  const onChildRangeChanged = (value, id) => {
    const newArray = childData.map((element) =>
      element.id === id ? { ...element, value } : element
    );
    setChildData([...newArray]);
  };
  return (
    <div className="rarity_settings">
      <div className="rarity_modal">
        <button className="close_modal" onClick={() => setRarity(false)}>
          &times;
        </button>
        <div className="parant_range">
          <p>Rarity Settings - {defaultData.title}</p>
          <div className="range_area">
            <div className="range_area_input">
              <input
                type="number"
                defaultValue={50}
                value={defaultData.value}
                onChange={(e) => onMainRangeChanged(e.target.value)}
              />
              <p>%</p>
            </div>
            <div className="range_area_picker">
              <p>1%</p>
              <Range
                value={defaultData.value}
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
          {childData.map((item) => (
            <div className="range_area">
              <p>{item.title}</p>
              <div className="range_area_input">
                <input
                  type="number"
                  defaultValue={50}
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
