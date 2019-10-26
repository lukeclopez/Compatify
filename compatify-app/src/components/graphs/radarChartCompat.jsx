import React, { Component } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip
} from "recharts";

class RadarChartCompat extends Component {
  state = {};
  render() {
    const {
      name,
      energy,
      valence,
      popularity,
      instrumentalness,
      range
    } = this.props;
    const data = [
      {
        trait: "Valence",
        A: valence,
        fullMark: 1
      },
      {
        trait: "Instrumentalness",
        A: instrumentalness,
        fullMark: 1
      },
      {
        trait: "Popularity",
        A: popularity,
        fullMark: 1
      },
      {
        trait: "Energy",
        A: energy,
        fullMark: 1
      },
      {
        trait: "Range",
        A: range,
        fullMark: 1
      }
    ];

    return (
      <RadarChart outerRadius={120} width={500} height={400} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="trait" />
        <PolarRadiusAxis angle={30} domain={[0, 1]} />
        <Radar
          name={name}
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Legend />
        <Tooltip />
      </RadarChart>
    );
  }
}

export default RadarChartCompat;
