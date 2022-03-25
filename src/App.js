import React, { useEffect, useState } from "react";
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
    console.log("Deleting", selectedLayer, layerData);
    if (layerData.length > 0) {
      const newLayerData = layerData.filter(
        (item) => item.id !== selectedLayer
      );
      setSelectedLayer(newLayerData.length > 0 ? newLayerData[0].id : null);
      setLayerData(newLayerData.length > 0 ? newLayerData : []);
    }
  };

  useEffect(() => {}, [layerData, selectedLayer]);
  return (
    <div className="App">
      <Sidebar
        layerData={layerData}
        setLayerData={setLayerData}
        selectedLayer={selectedLayer}
        setSelectedLayer={setSelectedLayer}
      />
      <ImageManager
        selectedLayer={selectedLayer}
        layerData={layerData}
        setLayerData={setLayerData}
      />
      <PropertyManager
        setRarity={setIsRarity}
        deleteLayer={deleteLayer}
        layerData={layerData.length > 0 ? layerData : []}
        selectedLayer={selectedLayer}
      />
      {isRarity && (
        <RaritySettings
          setRarity={setIsRarity}
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
          layerData={layerData.length > 0 ? layerData : []}
          setLayerData={setLayerData}
        />
      )}
    </div>
  );
}

export default App;
