import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { bigPacks, priceData } from "../../constant/priceData";
import { Divider } from "./Divider";
import { Layer } from "./Layer";
import { LayerProperty } from "./LayerProperty";
import { NewLayer } from "./NewLayer";

export const Sidebar = ({
  setRarity,
  deleteLayer,
  layerData,
  setLayerData,
  selectedLayer,
  setSelectedLayer,
  setCollectionSize,
  isNewLayer,
  setIsNewLayer,
  previewImg,
}) => {
  const [isOptiosOpen, setIsOptionsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const setCollectionNumber = (item) => {
    setCollectionSize(item);
    setIsOptionsOpen(false);
  };

  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var newState = [...layerData];
    const [reorderedItem] = newState.splice(droppedItem.source.index, 1);
    newState.splice(droppedItem.destination.index, 0, reorderedItem);
    setLayerData(newState);
  };

  const generateCollection = () => {
    console.log("This is Generate button");
  };

  const previewNFT = () => {
    setIsPreview(!isPreview);
    layerData
      ? console.log("this is preview button")
      : console.log("You should choose images to see your NFTs...");
  };

  useEffect(() => {}, [layerData, selectedLayer]);
  return (
    <div className="sidebar">
      <LayerProperty
        setRarity={setRarity}
        deleteLayer={deleteLayer}
        layerData={layerData}
        selectedLayer={selectedLayer}
        setLayerData={setLayerData}
        setIsNewLayer={setIsNewLayer}
      />
      {isNewLayer && (
        <NewLayer
          layerData={layerData}
          setLayerData={setLayerData}
          setSelectedLayer={setSelectedLayer}
          setIsNewLayer={setIsNewLayer}
        />
      )}
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {layerData.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <div>
                        <Layer
                          data={item}
                          selectedLayer={selectedLayer}
                          setSelectedLayer={setSelectedLayer}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="buttons">
        <button onClick={() => previewNFT()}>Preview</button>
        <button onClick={() => generateCollection()}>
          Generate Collection
        </button>
        <button onClick={() => setIsOptionsOpen(!isOptiosOpen)}>&#9660;</button>
      </div>
      {isOptiosOpen && (
        <div className="generate_collection">
          <p className="collection_size">Collection Size:</p>
          <Divider />
          <div className="generate_main">
            {priceData.map((item) => (
              <div
                className="generate_item"
                onClick={() => setCollectionNumber(item.number)}
              >
                <p>{item.title}</p>
                <p>(${item.price})</p>
              </div>
            ))}
          </div>
          <Divider />
          <div>
            Save up by purchasing big packs
            <div className="nft_packs">
              {bigPacks.map((item) => (
                <div className="card_pack">
                  <p className="card_save">{item.save}</p>
                  <p className="card_price">${item.price}</p>
                  <p className="card_save">{item.nfts} NFTs</p>
                  <button onClick={() => setCollectionNumber(item.value)}>
                    Select
                  </button>
                </div>
              ))}
              {/* 
              <div className="card_pack">
                <p>Save 69$</p>
                <p>$430</p>
                <p>10000 NFT</p>
                <button>Select</button>
              </div>
              <div className="card_pack">
                <p>Save 104$</p>
                <p>$645</p>
                <p>15000 NFT</p>
                <button>Select</button>
              </div> */}
            </div>
          </div>
          <Divider />
          <p>
            Want another size? <br /> Select a number up to 15,000 in the top
            row of your screen.
          </p>
        </div>
      )}
      {isPreview && (
        <div>
          <img
            id="preview_id"
            style={{
              width: "98%",
              border: "solid pink 2px",
              marginTop: 20,
              borderRadius: 20,
            }}
            src={previewImg}
            alt="Preview Img"
          />
        </div>
      )}
    </div>
  );
};
