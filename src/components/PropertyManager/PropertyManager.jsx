import React from "react";
// import { LayerProperty } from "./LayerProperty";
import { ProjectProperty } from "./ProjectProperty";

export const PropertyManager = ({
  setRarity,
  deleteLayer,
  layerData,
  selectedLayer,
  setLayerData,
  collectionSize,
  setCollectionSize,
}) => {
  return (
    <div>
      <ProjectProperty
        collectionSize={collectionSize}
        setCollectionSize={setCollectionSize}
      />
      {/* <LayerProperty
        setRarity={setRarity}
        deleteLayer={deleteLayer}
        layerData={layerData}
        selectedLayer={selectedLayer}
        setLayerData={setLayerData}
      /> */}
    </div>
  );
};
