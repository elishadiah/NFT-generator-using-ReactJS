import React, { useEffect, useState } from "react";
import "./ImageManager.css";

export const ImageManager = ({
  selectedLayer,
  layerData,
  setLayerData,
  selectedImg,
  setSelectedImg,
  deleteImage,
  setPreviewImg,
}) => {
  const [currentLayerData, setCurrentLayerData] = useState(null);

  const handleFile = (file) => {
    let newImgArray = [];
    let resultArray = [];
    let cloneArray = [...layerData];
    for (let i = 0; i < file.length; i++) {
      var dates = new Date();
      const newImageData = {
        id: new Date(dates).getTime() + 1,
        url: URL.createObjectURL(file[i]),
        title: file[i].name,
        size: file[i].size,
        rarity: 100,
      };
      newImgArray.push(newImageData);
    }
    newImgArray.map((item) => {
      resultArray = cloneArray.map((obj) =>
        obj.id === selectedLayer
          ? { ...obj, images: [...obj.images, item] }
          : obj
      );
      cloneArray = resultArray;
    });
    setLayerData(resultArray);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let imageFile = event.dataTransfer.files;
    handleFile(imageFile);
  };
  const selectImage = (e) => {
    let newImgArray = [];
    let cloneArray = [...layerData];
    let resultArray = [];
    for (let i = 0; i < e.target.files.length; i++) {
      var dates = new Date();
      const newImageData = {
        id: new Date(dates).getTime() + i,
        url: URL.createObjectURL(e.target.files[i]),
        title: e.target.files[i].name,
        size: e.target.files[i].size,
        rarity: 100,
      };
      newImgArray.push(newImageData);
    }
    newImgArray.map((item) => {
      resultArray = cloneArray.map((obj) =>
        obj.id === selectedLayer
          ? { ...obj, images: [...obj.images, item] }
          : obj
      );
      cloneArray = resultArray;
    });
    setLayerData(resultArray);
  };
  // Image select
  const handleClickImg = (item) => {
    setSelectedImg(item);
  };
  const removeImg = (item) => {
    deleteImage();
    setPreviewImg("");
  };
  useEffect(() => {
    setCurrentLayerData(
      layerData.length > 0
        ? layerData.find((obj) => obj.id === selectedLayer)
        : []
    );
  }, [selectedLayer, layerData]);
  return (
    <div className="image_manager">
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
            multiple={true}
            className="image_input"
            onChange={(e) => selectImage(e)}
          />
        </div>
      )}
      <div className="image_show">
        {currentLayerData && (
          <div className="image_view">
            {currentLayerData !== null ? (
              currentLayerData.images.map((item, key) => {
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
                    <p className="rarity_img">{item.rarity}%</p>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
