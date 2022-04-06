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
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [collectionSize, setCollectionSize] = useState(5);
  const [isNewLayer, setIsNewLayer] = useState(false);
  const [price, setPrice] = useState(0);

  const deleteLayer = () => {
    if (layerData.length > 0) {
      const newLayerData = layerData.filter(
        (item) => item.id !== selectedLayer
      );
      setSelectedLayer(newLayerData.length > 0 ? newLayerData[0].id : null);
      setLayerData(newLayerData.length > 0 ? newLayerData : []);
    }
  };

  const deleteImage = () => {
    if (layerData.length > 0) {
      const newImageData = layerData
        .filter((item) => item.id === selectedLayer)[0]
        .images.filter((option) => option.id !== selectedImg);
      const newState = layerData.map((obj) =>
        obj.id === selectedLayer ? { ...obj, images: newImageData } : obj
      );
      setLayerData(newState.length > 0 ? newState : []);
    }
  };

  useEffect(() => {
    setPrice(
      215 * Math.floor(collectionSize / 5000) +
        (4.99 * (collectionSize % 5000)) / 100
    );
  }, [layerData, selectedLayer, collectionSize]);
  return (
    <div className="App">
      <PropertyManager
        collectionSize={collectionSize}
        setCollectionSize={setCollectionSize}
        price={price}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Sidebar
          setRarity={setIsRarity}
          deleteLayer={deleteLayer}
          layerData={layerData}
          setLayerData={setLayerData}
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
          setCollectionSize={setCollectionSize}
          isNewLayer={isNewLayer}
          setIsNewLayer={setIsNewLayer}
        />
        <ImageManager
          selectedLayer={selectedLayer}
          layerData={layerData}
          setLayerData={setLayerData}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          deleteImage={deleteImage}
        />
      </div>

      {isRarity && (
        <RaritySettings
          setRarity={setIsRarity}
          selectedLayer={selectedLayer}
          layerData={layerData.length > 0 ? layerData : []}
          setLayerData={setLayerData}
        />
      )}
    </div>
  );
}

export default App;
