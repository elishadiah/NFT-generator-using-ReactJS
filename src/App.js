import React, { useState } from "react";
import "./App.css";
import { ImageManager } from "./components/ImageManager/ImageManager";
import { PropertyManager } from "./components/PropertyManager/PropertyManager";
import { RaritySettings } from "./components/PropertyManager/RaritySettings";
import { Sidebar } from "./components/SiderBar/Sidebar";

function App() {
  const [isRarity, setIsRarity] = useState(false);
  return (
    <div className="App">
      <Sidebar />
      <ImageManager />
      <PropertyManager setRarity={setIsRarity} />
      {isRarity && <RaritySettings />}
    </div>
  );
}

export default App;
