import React from "react";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";
import { shortDescriptions } from "../../content/viper";

const letterMap = {
  V: "Valence",
  I: "Instrumentalness",
  P: "Popularity",
  E: "Energy",
  R: "Range"
};

const Test = props => {
  const { trait } = props;
  const style = { color: "black" };

  // At present, the text isn't made black unless
  // I give each element its own style tag.
  return (
    <>
      <b style={style}>{trait}</b>
      <div style={style}>Is my music taste...</div>
      <div style={style}>{shortDescriptions[trait.toLowerCase()]}</div>
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
