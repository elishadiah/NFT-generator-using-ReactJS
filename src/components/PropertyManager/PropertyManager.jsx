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
  resultToZip,
  setIsZipping,
  imgDimension,
  setIsPreview,
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
        resultToZip={resultToZip}
        setIsZipping={setIsZipping}
        imgDimension={imgDimension}
        setIsPreview={setIsPreview}
      />
    </div>
  );
};
