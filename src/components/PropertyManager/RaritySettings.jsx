import React from "react";
import Range from "react-range-progress";
import "./PropertyManager.css";

export const RaritySettings = ({
  setRarity,
  selectedLayer,
  layerData,
  setLayerData,
}) => {
  const targetData = layerData.find((item) => item.id === selectedLayer);
  const onMainRangeChanged = (value) => {
    const newState = layerData.map((obj) =>
      obj.id === selectedLayer ? { ...obj, rarity: value } : obj
    );
    setLayerData(newState);
  };

  const onChildRangeChanged = (value, id) => {
    if (layerData.length > 0) {
      const index = targetData.images.findIndex((option) => option.id === id);
      const newImageData = targetData.images[index];
      const newImageState = { ...newImageData, rarity: value };
      let newState = [...layerData];
      newState[layerData.findIndex((item) => item.id === selectedLayer)].images[
        index
      ] = newImageState;
      setLayerData(newState);
    }
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
                fillColor={{ r: 4, g: 217, b: 217, a: 1 }}
                tractColor={{ r: 255, g: 0, b: 0, a: 0.5 }}
                height={18}
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
          {targetData.images.map((item) => (
            <div className="range_area" key={item.id}>
              <div className="range_item_property">
                <p>{item.title}</p>
                <img src={item.url} alt="ttt" />
              </div>
              <div className="range_area_input">
                <input
                  type="number"
                  value={item.rarity}
                  onChange={(e) => onChildRangeChanged(e.target.value, item.id)}
                />
                <p>%</p>
              </div>
              <div className="range_area_picker_child">
                <Range
                  value={item.rarity}
                  fillColor={{ r: 4, g: 217, b: 217, a: 1 }}
                  tractColor={{ r: 255, g: 0, b: 0, a: 0.5 }}
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
