import React from "react";

const CardColumn = props => {
  const { titleText, children } = props;
  return (
    <>
      {titleText && <h4>{titleText}</h4>}
      <div className="card-columns">{children}</div>
    </>
  );
};

export default CardColumn;
