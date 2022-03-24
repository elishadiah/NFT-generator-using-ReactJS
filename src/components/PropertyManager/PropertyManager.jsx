import React from "react";
import { LayerProperty } from "./LayerProperty";
import { ProjectProperty } from "./ProjectProperty";

export const PropertyManager = ({ setRarity }) => {
  return (
    <div>
      <ProjectProperty />
      <LayerProperty setRarity={setRarity} />
    </div>
  );
};
