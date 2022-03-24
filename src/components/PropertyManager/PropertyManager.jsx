import React from "react";
import { LayerProperty } from "./LayerProperty";
import { ProjectProperty } from "./ProjectProperty";

export const PropertyManager = () => {
  return (
    <div>
      <ProjectProperty />
      <LayerProperty />
    </div>
  );
};
