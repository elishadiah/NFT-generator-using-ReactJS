import React, { useEffect, useState } from "react";
import "./ImageManager.css";

export const ImageManager = ({
  selectedLayer,
  layerData,
  setLayerData,
  selectedImg,
  setSelectedImg,
  deleteImage,
}) => {
  // const [previewUrl, setPreviewUrl] = useState([]);
  const [currentLayerData, setCurrentLayerData] = useState(null);

  const handleFile = (file) => {
    //you can carry out any file validations here...
    // setPreviewUrl(() => [...previewUrl, URL.createObjectURL(file)]);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files[0];
    handleFile(imageFile);
  };
  const selectImage = (e) => {
    var dates = new Date();
    const newImageData = {
      id: new Date(dates).getTime(),
      url: URL.createObjectURL(e.target.files[0]),
      title: e.target.files[0].name,
      size: e.target.files[0].size,
      rarity: 20,
    };
    const newState = layerData.map((obj) =>
      obj.id === selectedLayer
        ? { ...obj, images: [...obj.images, newImageData] }
        : obj
    );
    console.log("new state: ", newState);
    setLayerData(newState);
  };
  // Image select
  const handleClickImg = (item) => {
    console.log("clicked image", item);
    setSelectedImg(item);
  };
  const removeImg = (item) => {
    console.log("image item", item);
    deleteImage();
  };
  useEffect(() => {
    console.log("Entered to useEffect");
    setCurrentLayerData(
      layerData.length > 0
        ? layerData.filter((obj) => obj.id === selectedLayer)[0]
        : []
    );
    console.log("LayerData", layerData);
    console.log("CurrentLayerData", currentLayerData);
  }, [selectedLayer, layerData]);
  return (
    <div className="image_manager">
      <div className="image_show">
        {currentLayerData && (
          <div className="image_view">
            {currentLayerData !== null ? (
              currentLayerData.images.map((item, key) => {
                console.log("InnerValue", item);
                return (
                  <div
                    className={
                      item.id === selectedImg
                        ? "image_item selected_item"
                        : "image_item"
                    }
                    key={item.id}
                    onClick={(e) => handleClickImg(item.id)}
                  >
                    <img src={item.url} alt="img" />
                    {item.id === selectedImg && (
                      <p
                        className="remove_img"
                        onClick={() => removeImg(item.id)}
                      >
                        &times;
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      {selectedLayer !== null && (
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
      )}
    </div>
  );
};
