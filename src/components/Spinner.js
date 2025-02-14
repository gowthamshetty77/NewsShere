import React from "react";
import LoadingSpinner from "./loadingSpinner.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={LoadingSpinner} alt="LoadingSpinner" />
    </div>
  );
};

export default Spinner;
