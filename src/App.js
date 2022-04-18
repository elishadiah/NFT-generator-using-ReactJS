/* eslint-disable no-unused-vars */
import FileSaver from "file-saver";
import JSZip from "jszip";
import mergeImages from "merge-images";
import React, { useEffect, useState } from "react";
import "./App.css";
import { ImageManager } from "./components/ImageManager/ImageManager";
import { Loading } from "./components/Loading";
import { Payment } from "./components/Payment/Payment";
import { PropertyManager } from "./components/PropertyManager/PropertyManager";
import { RaritySettings } from "./components/PropertyManager/RaritySettings";
import { Sidebar } from "./components/SiderBar/Sidebar";
import { initLayerData } from "./constant/layerData";
import { WatermarkImg } from "./constant/watermark";
function App() {
  const [isRarity, setIsRarity] = useState(false);
  const [layerData, setLayerData] = useState(initLayerData);
  const [selectedLayer, setSelectedLayer] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [collectionSize, setCollectionSize] = useState(5);
  const [isNewLayer, setIsNewLayer] = useState(false);
  const [price, setPrice] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [prevResultImages, setPrevResultImages] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [isWaterMark, setIsWaterMark] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [currentPercent, setCurrentPercent] = useState(0);
  const [imgDimension, setImgDimension] = useState(null);
  const [isPayment, setIsPayment] = useState(false);

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
    layerData.map(
      (layer) => (result = result * layer.images.length * (layer.rarity / 100))
    );
    return result - 1;
  };
  const toString = (number) => {
    if (number < 10) return String("0") + String(number);
    else return String(number);
  };

  // Select image Array with Rarities
  const generateImage = () => {
    price === 0 ? generateImageStep() : setIsPayment(true);
  };
  const generateImageStep = async () => {
    const availableNumber = availableNFTs();
    if (collectionSize < availableNumber) {
      setIsGenerating(true);
      let dnaList = [];
      let imageList = [];
      let metadataList = [];
      while (dnaList.length < collectionSize) {
        const percentage = Math.floor((100 * dnaList.length) / collectionSize);
        setCurrentPercent(percentage);
        const resImage = [];
        let metadata = {
          name: `${projectName}#` + String(dnaList.length + 1),
          description: projectDesc,
          external_url: "",
          image: "/" + String(dnaList.length + 1) + ".png",
        };
        const attributes = [];
        let dna = "";
        // eslint-disable-next-line array-callback-return
        layerData.map((layer) => {
          let layerRarity = generateRandom(100);
          if (layerRarity < layer.rarity && layer.images.length > 0) {
            const images = layer.images;
            const imagesLen = images.length;
            let randTotal = 0;
            // eslint-disable-next-line array-callback-return
            images.map((image) => {
              randTotal = randTotal + image.rarity;
            });
            let i = 0;
            let traitRarity = generateRandom(randTotal);
            while (i < imagesLen && traitRarity > images[i].rarity) {
              traitRarity -= images[i].rarity;
              i = i + 1;
            }
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
          let tempRes = isWaterMark
            ? [...resImage, { src: WatermarkImg }]
            : [...resImage];
          dnaList.push(dna);
          const img = await mergeImages(tempRes);
          imageList.push(img);
          metadataList.push({ ...metadata, attributes });
        }
      }
      setIsGenerating(false);
      setIsZipping(true);
      resultToZip(imageList, metadataList);
    } else {
      alert("You can't create so much NFTs with your assets! Add more assets.");
    }
  };

  const generatePrevImg = async () => {
    const availableNumber = availableNFTs();
    const tempColSize = availableNumber > 50 ? 20 : availableNumber / 2;
    if (collectionSize < availableNumber) {
      let dnaList = [];
      let imageList = [];
      while (dnaList.length < tempColSize) {
        const resImage = [];
        const attributes = [];
        let dna = "";
        // eslint-disable-next-line array-callback-return
        layerData.map((layer) => {
          let layerRarity = generateRandom(100);
          if (layerRarity < layer.rarity && layer.images.length > 0) {
            const images = layer.images;
            const imagesLen = images.length;
            let randTotal = 0;
            // eslint-disable-next-line array-callback-return
            images.map((image) => {
              randTotal = randTotal + image.rarity;
            });
            let i = 0;
            let traitRarity = generateRandom(randTotal);
            while (i < imagesLen && traitRarity > images[i].rarity) {
              traitRarity -= images[i].rarity;
              i = i + 1;
            }
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
          let tempRes = isWaterMark
            ? [...resImage, { src: WatermarkImg }]
            : [...resImage];
          dnaList.push(dna);
          const img = await mergeImages(tempRes);
          imageList.push(img);
        }
      }
      setPrevResultImages(imageList);
    } else {
      setPrevResultImages([]);
      alert("You can't create so much NFTs with your assets! Add more assets.");
    }
  };
  const generateRandom = (num) => {
    return Math.floor(Math.random() * num);
  };

  // zip files
  const resultToZip = (imageList, metadataList) => {
    const zip = new JSZip();
    let files = imageList;
    const metadataTotal = {
      name: projectName,
      description: projectDesc,
      collection: metadataList,
    };
    for (let file = 1; file <= files.length; file++) {
      zip.folder("assets").file(file + ".png", dataURLtoFile(files[file - 1]), {
        base64: true,
      });
      const percentage = Math.floor((50 * file) / metadataList.length);
      setCurrentPercent(percentage);
    }
    zip
      .folder("metadata")
      .file("metadata.json", JSON.stringify(metadataTotal), {
        binary: false,
      });
    for (let metadata = 1; metadata <= metadataList.length; metadata++) {
      zip
        .folder("metadata")
        .file(metadata + ".json", JSON.stringify(metadataList[metadata - 1]));
      const percentage = Math.floor(50 + (50 * metadata) / metadataList.length);
      setCurrentPercent(percentage);
    }
    zip
      .generateAsync({ type: "blob" }, function updateCallback(metadata) {
        setCurrentPercent(Math.floor(metadata.percent));
      })
      .then((content) => {
        FileSaver.saveAs(content, `${projectName}`);
        setIsZipping(false);
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
    setIsPreview(false);
    setPrice(
      isWaterMark
        ? 0
        : parseFloat(
            215 * Math.floor(collectionSize / 5000) +
              (4.99 * (collectionSize % 5000)) / 100
          ).toFixed(2)
    );

    collectionSize <= 100 ? setIsWaterMark(true) : setIsWaterMark(false);
  }, [collectionSize, isWaterMark, layerData]);
  return (
    <div className="App">
      {isPayment && (
        <Payment
          setPayment={setIsPayment}
          price={price}
          generateImageStep={generateImageStep}
          setIsPayment={setIsPayment}
        />
      )}
      {isGenerating && (
        <Loading val="generating" currentPercent={currentPercent} />
      )}
      {isZipping && <Loading val="zipping" currentPercent={currentPercent} />}
      <PropertyManager
        collectionSize={collectionSize}
        setCollectionSize={setCollectionSize}
        price={price}
        projectName={projectName}
        setProjectName={setProjectName}
        projectDesc={projectDesc}
        setProjectDesc={setProjectDesc}
        resultToZip={resultToZip}
        setIsZipping={setIsZipping}
        imgDimension={imgDimension}
        setIsPreview={setIsPreview}
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
          generateImage={generateImage}
          resultImages={prevResultImages}
          generatePrevImg={generatePrevImg}
          setIsPreview={setIsPreview}
          isPreview={isPreview}
          setPayment={setIsPayment}
        />
        <ImageManager
          selectedLayer={selectedLayer}
          layerData={layerData}
          setLayerData={setLayerData}
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          deleteImage={deleteImage}
          imgDimension={imgDimension}
          setImgDimension={setImgDimension}
          setIsPreview={setIsPreview}
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
