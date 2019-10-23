import React from "react";

const Loader = props => {
  return (
    <>
      <div className="center loader">
        <i className="fa fa-spinner fa-spin" />
        <p className="loading-ellipse" style={{ fontSize: "0.25em" }}>
          {props.message}
        </p>
      </div>
    </>
  );
};

export default Loader;
