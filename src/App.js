import "./App.css";
import { ImageManager } from "./components/ImageManager/ImageManager";
import { PropertyManager } from "./components/PropertyManager/PropertyManager";
import { Sidebar } from "./components/SiderBar/Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <ImageManager />
      <PropertyManager />
    </div>
  );
}

export default App;
