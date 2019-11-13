import React from "react";

const CompatifyButton = props => {
  const baseClass = "btn btn-outline-light rounded-0 ";
  const finalClass = baseClass + props.classes;
  return (
    <button {...props} className={finalClass}>
      {props.children}
    </button>
  );
};

export default CompatifyButton;
