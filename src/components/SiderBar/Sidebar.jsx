import React, { useEffect, useState } from "react";
import { priceData } from "../../constant/priceData";
import { Divider } from "./Divider";
import { Layer } from "./Layer";
import { NewLayer } from "./NewLayer";

export const Sidebar = ({
  layerData,
  setLayerData,
  selectedLayer,
  setSelectedLayer,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const generateCollection = (item) => {
    console.log("Generate Function: ", item);
    setIsOpen(false);
  };
  useEffect(() => {}, [layerData, selectedLayer]);
  return (
    <div className="sidebar">
      <div className="sidebar_title">Layers</div>
      {layerData.map((item) => (
        <Layer
          data={item}
          key={item.id}
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
        />
      ))}
      <NewLayer
        layerData={layerData}
        setLayerData={setLayerData}
        setSelectedLayer={setSelectedLayer}
      />
      <div className="buttons">
        <button>Preview</button>
        <button onClick={() => setIsOpen(!isOpen)}>Pay & Generate Col.</button>
      </div>
      {isOpen && (
        <div className="generate_collection">
          <p className="collection_size">Collection Size:</p>
          <Divider />
          <div className="generate_main">
            {priceData.map((item) => (
              <div
                className="generate_item"
                onClick={() => generateCollection(item.link)}
              >
                <p>{item.title}</p>
                <p>(${item.price})</p>
              </div>
            ))}
          </div>
          <Divider />
          <p className="generate_item">
            My Collection is smaller or equal to 100
          </p>
          <Divider />
          <p>
            Want another size? <br /> Select a number up to 10,000 in the
            right-hand column of your scren.
          </p>
        </div>
      )}
    </div>
  );
};
