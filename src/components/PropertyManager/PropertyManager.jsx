import React from "react";
import { LayerProperty } from "./LayerProperty";
import { ProjectProperty } from "./ProjectProperty";

export const PropertyManager = ({ setRarity, deleteLayer }) => {
  return (
    <div>
      <ProjectProperty />
      <LayerProperty setRarity={setRarity} deleteLayer={deleteLayer} />
    </div>
  );
};
