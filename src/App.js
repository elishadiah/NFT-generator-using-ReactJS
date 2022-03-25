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
  return (
    <div className="App">
      <Sidebar
        layerData={layerData}
        setLayerData={setLayerData}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
      />
      <ImageManager />
      <PropertyManager setRarity={setIsRarity} />
      {isRarity && <RaritySettings setRarity={setIsRarity} />}
    </div>
  );
}

export default App;
