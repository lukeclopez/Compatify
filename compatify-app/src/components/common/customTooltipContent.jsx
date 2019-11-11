import React from "react";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";
import { shortDescriptions } from "../../content";

const letterMap = {
  V: "Valence",
  I: "Instrumentalness",
  P: "Popularity",
  E: "Energy",
  R: "Range"
};

const Test = props => {
  const { trait } = props;

  return (
    <>
      <b>{trait}</b>
      <div>Is my music taste...</div>
      <div>{shortDescriptions[trait.toLowerCase()]}</div>
    </>
  );
};

const CustomTooltipContent = props => {
  if (props.payload[0] != null) {
    const newPayload = [
      {
        value: <Test trait={letterMap[props.payload[0].payload.trait]} />
      },
      ...props.payload
    ];

    return <DefaultTooltipContent {...props} payload={newPayload} />;
  }

  return <DefaultTooltipContent {...props} />;
};

export default CustomTooltipContent;
