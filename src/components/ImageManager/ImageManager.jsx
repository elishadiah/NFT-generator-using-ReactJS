import React, { useEffect, useReducer } from "react";
import "./ImageManager.css";
import { UploadImage } from "./UploadImage";

export const ImageManager = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DROP_DEPTH":
        return { ...state, dropDepth: action.dropDepth };
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };
  const [data, dispatch] = useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });
  useEffect(() => {
    console.log("Updated", data);
  });
  return (
    <div className="image_manager">
      <div className="image_show"></div>
      <UploadImage data={data} dispatch={dispatch} />
      <ol className="dropped-files">
        {data.fileList.map((f) => {
          return <li key={f.name}>{f.name}</li>;
        })}
      </ol>
    </div>
  );
};
