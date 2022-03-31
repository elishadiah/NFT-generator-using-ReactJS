import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
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

  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var newState = [...layerData];
    const [reorderedItem] = newState.splice(droppedItem.source.index, 1);
    newState.splice(droppedItem.destination.index, 0, reorderedItem);
    setLayerData(newState);
  };

  useEffect(() => {}, [layerData, selectedLayer]);
  return (
    <div className="sidebar">
      <div className="sidebar_title">Layers</div>
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
