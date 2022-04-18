import React from "react";
import "../PropertyManager/PropertyManager.css";
export const LayerProperty = ({
  setRarity,
  deleteLayer,
  layerData,
  selectedLayer,
  setLayerData,
  setIsNewLayer,
}) => {
  const changeLayerName = (e) => {
    const newState = layerData.map((obj) =>
      obj.id === selectedLayer ? { ...obj, title: e } : obj
    );
    setLayerData(newState);
  };
  return (
    <div className="layer_container">
      <div className="property_item_layer">
        <p>Selected Layer :</p>
        <input
          type="text"
          placeholder="Layer Name"
          value={
            layerData.length > 0
              ? layerData.filter((item) => item.id === selectedLayer).length > 0
                ? layerData.filter((item) => item.id === selectedLayer)[0].title
                : ""
              : ""
          }
          onChange={(e) => changeLayerName(e.target.value)}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p
          className="setting_button layer_property_close"
          onClick={() => setRarity(true)}
        >
          Rarity&nbsp;Settings
        </p>
        <p
          className="setting_button layer_property_close"
          onClick={() => setIsNewLayer(true)}
        >
          New&nbsp;Layer
        </p>
        <p
          className="setting_button layer_property_close"
          onClick={() => deleteLayer()}
        >
          Remove
        </p>
      </div>
    </div>
  );
};
