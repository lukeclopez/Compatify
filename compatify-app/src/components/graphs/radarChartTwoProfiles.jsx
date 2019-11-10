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

class RadarChartTwoProfiles extends Component {
  state = {};

  makeDataObject = (data1, data2) => {
    const obj = [
      {
        trait: "Valence",
        A: data1.avg_track_valence,
        B: data2.avg_track_valence,
        fullMark: 1
      },
      {
        trait: "Instrumentalness",
        A: data1.avg_track_instru,
        B: data2.avg_track_instru,
        fullMark: 1
      },
      {
        trait: "Popularity",
        A: data1.avg_track_popularity,
        B: data2.avg_track_popularity,
        fullMark: 1
      },
      {
        trait: "Energy",
        A: data1.avg_track_energy,
        B: data2.avg_track_energy,
        fullMark: 1
      },
      {
        trait: "Range",
        A: data1.range,
        B: data2.range,
        fullMark: 1
      }
    ];

    return obj;
  };

  render() {
    const { data1, data2 } = this.props;
    const radarData = this.makeDataObject(data1, data2);

    return (
            <div class="card text-white bg-dark mb-3">
            <div class="card-body">
          <p class="card-text">
      <RadarChart outerRadius={120} width={500} height={400} data={radarData}>
        <PolarGrid stroke="#ffffff" />
        <PolarAngleAxis dataKey="trait" stroke="#ffffff"/>
        <PolarRadiusAxis angle={18} domain={[0, 1]} />
        <Radar
          name={data1.user_id}
          dataKey="A"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Radar
          name={data2.user_id}
          dataKey="B"
          stroke="#800000"
          fill="#800000"
          fillOpacity={0.6}
        />
        <Legend />
        <Tooltip />
      </RadarChart>
      </p>
      </div>
      </div>
    );
  }
}

export default RadarChartTwoProfiles;
