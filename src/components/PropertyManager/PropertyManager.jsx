import React from "react";
import { LayerProperty } from "./LayerProperty";
import { ProjectProperty } from "./ProjectProperty";

export const PropertyManager = ({
  setRarity,
  deleteLayer,
  layerData,
  selectedLayer,
  setLayerData,
}) => {
  return (
    <div>
      <ProjectProperty />
      <LayerProperty
        setRarity={setRarity}
        deleteLayer={deleteLayer}
        layerData={layerData}
        selectedLayer={selectedLayer}
        setLayerData={setLayerData}
      />
    </div>
  );
};
