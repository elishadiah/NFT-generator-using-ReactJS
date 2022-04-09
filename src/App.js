/* eslint-disable no-unused-vars */
import FileSaver from "file-saver";
import JSZip from "jszip";
import mergeImages from "merge-images";
import React, { useEffect, useState } from "react";
import "./App.css";
import { ImageManager } from "./components/ImageManager/ImageManager";
import { PropertyManager } from "./components/PropertyManager/PropertyManager";
import { RaritySettings } from "./components/PropertyManager/RaritySettings";
import { Sidebar } from "./components/SiderBar/Sidebar";
import { initLayerData } from "./constant/layerData";
function App() {
  const [isRarity, setIsRarity] = useState(false);
  const [layerData, setLayerData] = useState(initLayerData);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [collectionSize, setCollectionSize] = useState(5);
  const [isNewLayer, setIsNewLayer] = useState(false);
  const [price, setPrice] = useState(0);
  const [previewImg, setPreviewImg] = useState("");
  const [resultImg, setResultImg] = useState([]);
  const [resultImages, setResultImages] = useState([]);
  const [resultMatadata, setResultMetadata] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const deleteLayer = () => {
    if (layerData.length > 0) {
      const newLayerData = layerData.filter(
        (item) => item.id !== selectedLayer
      );
      setSelectedLayer(newLayerData.length > 0 ? newLayerData[0].id : null);
      setLayerData(newLayerData.length > 0 ? newLayerData : []);
    }
  };

  const deleteImage = () => {
    if (layerData.length > 0) {
      const newImageData = layerData
        .filter((item) => item.id === selectedLayer)[0]
        .images.filter((option) => option.id !== selectedImg);
      const newState = layerData.map((obj) =>
        obj.id === selectedLayer ? { ...obj, images: newImageData } : obj
      );
      setLayerData(newState.length > 0 ? newState : []);
    }
  };

  const availableNFTs = () => {
    let result = 1;
    layerData.map((layer) => (result = result * (layer.images.length + 1)));
    return result / 2;
  };
  const toString = (number) => {
    if (number < 10) return String("0") + String(number);
    else return String(number);
  };

  // Select image Array with Rarities
  const generateImage = async () => {
    const availableNumber = availableNFTs();
    if (collectionSize < availableNumber) {
      let dnaList = [];
      let imageList = [];
      let metadataList = [];
      while (dnaList.length < collectionSize) {
        const resImage = [];
        let metadata = {
          name: `${projectName}#` + String(dnaList.length + 1),
          description: projectDesc,
          external_url: "",
          image: "/" + String(dnaList.length + 1),
        };
        const attributes = [];
        let dna = "";
        // eslint-disable-next-line array-callback-return
        layerData.map((layer) => {
          let layerRarity = generateRandom();
          if (layerRarity < layer.rarity && layer.images.length > 0) {
            let traitRarity = generateRandom();
            const images = layer.images;
            const imagesLen = images.length;
            let i = 0;
            while (i < imagesLen && traitRarity >= images[i].rarity) {
              traitRarity -= images[i].rarity;
              i = i + 1;
            }
            i = i === imagesLen ? generateRandom() % imagesLen : i;
            resImage.push({ src: images[i].url });
            attributes.push({
              trait_type: layer.title,
              value: images[i].title,
            });
            dna = dna + toString(i + 1);
          } else {
            dna = dna + toString(0);
            attributes.push({ trait_type: layer.title, value: "NONE" });
          }
        });
        if (resImage.length > 0 && !dnaList.includes(dna)) {
          dnaList.push(dna);
          const img = await mergeImages(resImage);
          imageList.push(img);
          metadataList.push({ ...metadata, attributes });
        }
      }
      setResultImages(imageList);
      setResultMetadata(metadataList);
    } else {
      alert("You can't create so much NFTs with your assets! Add more assets.");
    }
  };

  const generateRandom = () => {
    return Math.floor(Math.random() * 100);
  };

  // zip files

  const resultToZip = () => {
    const zip = new JSZip();
    let files = resultImages;
    for (let file = 0; file < files.length; file++) {
      zip.folder("images").file(file + ".png", dataURLtoFile(files[file]), {
        base64: true,
      });
    }
    zip.file("metadata.json", JSON.stringify(resultMatadata), {
      binary: false,
    });
    // zip.file("metadata.json", "resultMatadata");
    zip.generateAsync({ type: "blob" }).then((content) => {
      FileSaver.saveAs(content, `${projectName}`);
    });
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    setPrice(
      215 * Math.floor(collectionSize / 5000) +
        (4.99 * (collectionSize % 5000)) / 100
    );
  }, [collectionSize, projectName, projectDesc]);
  return (
    <div className="App">
      {/* <button onClick={() => resultToZip()}>Download</button> */}
      <PropertyManager
        collectionSize={collectionSize}
        setCollectionSize={setCollectionSize}
        price={price}
        projectName={projectName}
        setProjectName={setProjectName}
        projectDesc={projectDesc}
        setProjectDesc={setProjectDesc}
        resultToZip={resultToZip}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Sidebar
          setRarity={setIsRarity}
          deleteLayer={deleteLayer}
          layerData={layerData}
          setLayerData={setLayerData}
          selectedLayer={selectedLayer}
          setSelectedLayer={setSelectedLayer}
          setCollectionSize={setCollectionSize}
          isNewLayer={isNewLayer}
          setIsNewLayer={setIsNewLayer}
          previewImg={previewImg}
          generateImage={generateImage}
          resultImages={resultImages}
        />
        <ImageManager
          selectedLayer={selectedLayer}
          layerData={layerData}
          setLayerData={setLayerData}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          deleteImage={deleteImage}
          setResultImg={setResultImg}
          setPreviewImg={setPreviewImg}
        />
      </div>

      {isRarity && (
        <RaritySettings
          setRarity={setIsRarity}
          selectedLayer={selectedLayer}
          layerData={layerData.length > 0 ? layerData : []}
          setLayerData={setLayerData}
        />
      )}
    </div>
  );
}

export default App;
