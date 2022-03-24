import React, { useState } from "react";
import { Divider } from "./Divider";
import { Layer } from "./Layer";
import { NewLayer } from "./NewLayer";

const layerData = [
  {
    title: "Background",
    count: 2,
    rarity: 30,
  },
  {
    title: "Eye",
    count: 1,
    rarity: 40,
  },
  {
    title: "Head",
    count: 6,
    rarity: 20,
  },
];
const priceData = [
  {
    title: "100 Generative Art",
    price: "0.00",
    link: "100",
  },
  {
    title: "1000 Generative Art",
    price: "179.00",
    link: "1000",
  },
  {
    title: "5000 Generative Art",
    price: "279.00",
    link: "5000",
  },
  {
    title: "10000 Generative Art",
    price: "389.00",
    link: "10000",
  },
];
export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const generateCollection = (item) => {
    console.log("Generate Function: ", item);
    setIsOpen(false);
  };
  return (
    <div className="sidebar">
      <div className="sidebar_title">Layers</div>
      {layerData.map((item) => (
        <Layer data={item} />
      ))}
      <NewLayer />
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
