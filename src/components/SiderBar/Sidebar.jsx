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
  generateImage,
  resultImages,
}) => {
  const [isOptiosOpen, setIsOptionsOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [index, setIndex] = useState(0);

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
    generateImage();
  };

  const previewNFT = () => {
    // setIsPreview(!isPreview);
    index === resultImages.length - 1 ? setIndex(0) : setIndex(index + 1);
    layerData
      ? console.log("this is preview button")
      : console.log("You should choose images to see your NFTs...");
  };

  useEffect(() => {
    resultImages.length > 0 ? setIsPreview(true) : setIsPreview(false);
  }, [layerData, selectedLayer, previewImg, resultImages]);
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
            src={resultImages[index]}
            alt="We can't generate any NFT now!"
          />
        </div>
      )}
    </div>
  );
};
