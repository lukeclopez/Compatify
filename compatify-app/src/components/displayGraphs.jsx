import React from "react";
import RadarChartCompat from "./graphs/radarChartCompat";
import NormalDistribution from "./graphs/normalDistribution";

const DisplayGraphs = () => {
  return (
    <>
      <NormalDistribution />
      <RadarChartCompat />
    </>
  );
};

export default DisplayGraphs;
