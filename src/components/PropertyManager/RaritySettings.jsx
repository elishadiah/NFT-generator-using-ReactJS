import React, { useState } from "react";
import Range from "react-range-progress";
import "./PropertyManager.css";

const DEFAULT_VALUE = 25;
export const RaritySettings = ({ title, images }) => {
  const [value, setValue] = useState(DEFAULT_VALUE);

  const onRangeChanged = (value) => {
    setValue(value);
  };
  return (
    <div className="rarity_settings">
      <div className="rarity_modal">
        <div>
          <p>Rarity Settings - {title}</p>
          <div className="range_area">
            <input
              type="number"
              defaultValue={50}
              value={value}
              onChange={(e) => onRangeChanged(e.target.value)}
            />
            <Range
              value={value}
              fillColor={{ r: 20, g: 150, b: 100, a: 0.75 }}
              tractColor={{ r: 10, g: 10, b: 0, a: 0.5 }}
              height={14}
              width="100%"
              onChange={(e) => onRangeChanged(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
