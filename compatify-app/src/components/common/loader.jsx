import React from "react";

const Loader = props => {
  const style = {
    width: "6rem",
    height: "6rem",
    margin: "10%",
    textAlign: "center"
  };
  return (
    <div className="text-center text-white">
      <div className="spinner-grow" role="status" style={style}>
        <span className="sr-only">{props.message}</span>
      </div>
    </div>
  );
};

export default Loader;
