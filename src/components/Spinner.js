import React from "react";
import { useSelector } from "react-redux";
import loader from "../assets/loader.svg";

const Spinner = () => {
  const selector = useSelector((state) => {
    return state.isLoading;
  });
  console.log("selector", selector);
  if (selector) {
    return (
      <>
        <div className="w-100 h-100 spinner">
          <img src={loader} alt="" />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Spinner;
