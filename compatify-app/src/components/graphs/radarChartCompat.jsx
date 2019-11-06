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

  makeDataObject = data => {
    const {
      avg_track_valence,
      avg_track_instru,
      avg_track_popularity,
      avg_track_energy,
      range
    } = data;

    return [
      {
        trait: "Valence",
        A: avg_track_valence,
        fullMark: 1
      },
      {
        trait: "Instrumentalness",
        A: avg_track_instru,
        fullMark: 1
      },
      {
        trait: "Popularity",
        A: avg_track_popularity,
        fullMark: 1
      },
      {
        trait: "Energy",
        A: avg_track_energy,
        fullMark: 1
      },
      {
        trait: "Range",
        A: range,
        fullMark: 1
      }
    ];
  };

  render() {
    const { name, data } = this.props;
    const radarData = this.makeDataObject(data);

    return (
      <div class="card text-white bg-dark mb-3">
        <div class="card-body">
          <p class="card-text">
            <RadarChart
              outerRadius={120}
              width={500}
              height={300}
              data={radarData}
            >
              <PolarGrid stroke="#ffffff" />
              <PolarAngleAxis dataKey="trait" stroke="#ffffff" />
              <PolarRadiusAxis angle={18} domain={[0, 1]} />
              <Radar
                name={name}
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
              <Tooltip wrapperStyle={{ color: "black" }} />
            </RadarChart>
          </p>
        </div>
      </div>
    );
  }
}

export default RadarChartCompat;
