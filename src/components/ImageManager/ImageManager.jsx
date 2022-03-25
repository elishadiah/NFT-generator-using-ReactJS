import React, { useEffect, useState } from "react";
import "./ImageManager.css";

export const ImageManager = ({ selectedLayer, layerData, setLayerData }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState([]);
  const [imageData, setImageData] = useState(
    layerData.lengh > 0
      ? layerData.filter((obj) => obj.id === selectedLayer)[0].images
      : []
  );

  const handleFile = (file) => {
    //you can carry out any file validations here...
    setImageFiles(() => [...imageFiles, file]);
    setPreviewUrl(() => [...previewUrl, URL.createObjectURL(file)]);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
    var dates = new Date();
    const newImage = {
      id: new Date(dates).getTime(),
      url: URL.createObjectURL(imageFile),
      title: imageFile.name,
      rarity: 0,
    };
    const newState = layerData.map((obj) =>
      obj.id === selectedLayer
        ? { ...obj, images: [...imageData, newImage] }
        : obj
    );
    setLayerData(newState);
  };
  const selectImage = (e) => {
    console.log("SelectFiles", previewUrl, imageFiles);
    setImageFiles(() => [...imageFiles, e.target.files[0]]);
    setPreviewUrl(() => [
      ...previewUrl,
      URL.createObjectURL(e.target.files[0]),
    ]);
  };

  useEffect(() => {}, []);
  return (
    <div className="image_manager">
      <div className="image_show">
        {previewUrl && (
          <div className="image_view">
            {previewUrl.map((item, key) => (
              <div className="image_item" key={key}>
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
