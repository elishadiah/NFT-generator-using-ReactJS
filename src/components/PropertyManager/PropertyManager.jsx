import React from "react";
import { ProjectProperty } from "./ProjectProperty";

export const PropertyManager = ({
  collectionSize,
  setCollectionSize,
  price,
  projectName,
  projectDesc,
  setProjectName,
  setProjectDesc,
}) => {
  return (
    <div>
      <ProjectProperty
        collectionSize={collectionSize}
        setCollectionSize={setCollectionSize}
        price={price}
        projectName={projectName}
        projectDesc={projectDesc}
        setProjectName={setProjectName}
        setProjectDesc={setProjectDesc}
      />
    </div>
  );
};
