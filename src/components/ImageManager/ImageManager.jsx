import React, { useState } from "react";
import "./ImageManager.css";

export const ImageManager = ({ selectedLayer, layerData, setLayerData }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const handleFile = (file) => {
    //you can carry out any file validations here...
    setImageFiles(() => [...imageFiles, file]);
    setPreviewUrl(() => [...previewUrl, URL.createObjectURL(file)]);
    console.log("DragFiles", URL.createObjectURL(file), previewUrl, imageFiles);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    //prevent the browser from opening the image
    event.preventDefault();
    event.stopPropagation();
    //let's grab the image file
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };
  const selectImage = (e) => {
    console.log("SelectFiles", previewUrl, imageFiles);
    setImageFiles(() => [...imageFiles, e.target.files[0]]);
    setPreviewUrl(() => [
      ...previewUrl,
      URL.createObjectURL(e.target.files[0]),
    ]);
  };
  return (
    <div className="image_manager">
      <div className="image_show">
        {previewUrl && (
          <div className="image_view">
            {previewUrl.map((item) => (
              <div className="image_item">
                <img src={item} alt="img" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className="upload_image"
        onDragOver={handleDragOver}
        onDrop={handleOnDrop}
      >
        <p>Click or drop images here!</p>
        <p style={{ fontSize: 16, fontStyle: "italic" }}>
          (image/png, image/git, video/mp4, Max size: 10MB)
        </p>
        <input
          id="hidden-input"
          type="file"
          multiple=""
          className="image_input"
          onChange={(e) => selectImage(e)}
        />
      </div>
    </div>
  );
};
