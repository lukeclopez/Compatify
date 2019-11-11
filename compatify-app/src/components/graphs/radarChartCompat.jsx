import React, { Component } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import CustomTooltipContent from "../common/customTooltipContent";

const baseData = [
  {
    trait: "V",
    fullMark: 1
  },
  {
    trait: "I",
    fullMark: 1
  },
  {
    trait: "P",
    fullMark: 1
  },
  {
    trait: "E",
    fullMark: 1
  },
  {
    trait: "R",
    fullMark: 1
  }
];

class RadarChartCompat extends Component {
  state = {};

  makeDataObject = profileOrProfiles => {
    const metricsArr = profileOrProfiles.map(p => {
      const {
        avg_track_valence,
        avg_track_instru,
        avg_track_popularity,
        avg_track_energy,
        range
      } = p;
      const metrics = {
        avg_track_valence,
        avg_track_instru,
        avg_track_popularity,
        avg_track_energy,
        range
      };
      return metrics;
    });

    if (metricsArr.length === 1) {
      const values = Object.values(metricsArr[0]);
      console.log(values);

      const data = baseData.map((obj, index) => {
        return { ...obj, A: values[index] };
      });

      return data;
    } else if (metricsArr.length === 2) {
      const values = metricsArr.map(m => {
        return Object.values(m);
      });

      const data = baseData.map((obj, index) => {
        return { ...obj, A: values[0][index], B: values[1][index] };
      });

      return data;
    }
  };

  render() {
    const { name, data } = this.props;
    const radarData = this.makeDataObject(data);

    return (
      <div className="card text-white bg-dark mb-3">
        <div className="card-body">
          <ResponsiveContainer height={300}>
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
                name={data[0].user_id}
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              {data[1] && (
                <Radar
                  name={data[1].user_id}
                  dataKey="B"
                  stroke="#800000"
                  fill="#800000"
                  fillOpacity={0.6}
                />
              )}
              <Legend />
              <Tooltip content={<CustomTooltipContent />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default RadarChartCompat;
