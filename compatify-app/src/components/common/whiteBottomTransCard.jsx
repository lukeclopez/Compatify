import React from "react";

const WhiteBottomTransCard = props => {
  const cardClass =
    "card text-white text-center bg-transparent border-white border-top-0 border-left-0 border-right-0 border-bottom my-3 rounded-0";
  return <div className={cardClass}>{props.children}</div>;
};

export default WhiteBottomTransCard;
