import React, { useState } from "react";
import "./App.css";
import { ImageManager } from "./components/ImageManager/ImageManager";
import { PropertyManager } from "./components/PropertyManager/PropertyManager";
import { RaritySettings } from "./components/PropertyManager/RaritySettings";
import { Sidebar } from "./components/SiderBar/Sidebar";
import { initLayerData } from "./constant/layerData";

function App() {
  const [isRarity, setIsRarity] = useState(false);
  const [layerData, setLayerData] = useState(initLayerData);
  const [selectedLayer, setSelectedLayer] = useState(0);

  const deleteLayer = () => {
    if (layerData.length > 0) {
      const newLayerData = layerData.filter(
        (item) => item.id !== selectedLayer
      );
      setLayerData(newLayerData);
      setSelectedLayer(layerData[0].id);
    }
  };
  return (
    <div className="App">
      <Sidebar
        layerData={layerData}
        setLayerData={setLayerData}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
      />
      <ImageManager />
      <PropertyManager setRarity={setIsRarity} deleteLayer={deleteLayer} />
      {isRarity && <RaritySettings setRarity={setIsRarity} />}
    </div>
  );
}

export default App;
