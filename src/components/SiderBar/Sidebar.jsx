import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { priceData } from "../../constant/priceData";
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
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const setCollectionNumber = (item) => {
    setCollectionSize(item);
    setIsOpen(false);
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

  useEffect(() => {}, [layerData, selectedLayer]);
  return (
    <div className="sidebar">
      {/* <div className="sidebar_title">Layers</div> */}
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
        <button>Preview</button>
        <button onClick={() => generateCollection()}>
          Generate Collection
        </button>
        <button onClick={() => setIsOpen(!isOpen)}>&#9660;</button>
      </div>
      {isOpen && (
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
          <p>
            Want another size? <br /> Select a number up to 10,000 in the
            right-hand column of your screen.
          </p>
        </div>
      )}
    </div>
  );
};
