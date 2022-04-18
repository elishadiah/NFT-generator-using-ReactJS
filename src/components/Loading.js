import React from "react";
import ReactLoading from "react-loading";

export const Loading = ({ val, currentPercent }) => {
  return (
    <div className="loading">
      <p>
        We are {val} your NFTs now... {currentPercent} %
      </p>
      <ReactLoading type="cylon" color="#61dafb" height={"10%"} width={"10%"} />
    </div>
  );
};
