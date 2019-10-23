import React, { PureComponent } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const data = [
  {
    name: "-4",
    uv: 0
  },
  {
    name: "-3",
    uv: 0.1
  },
  {
    name: "-2",
    uv: 0.2
  },
  {
    name: "-1",
    uv: 0.3
  },
  {
    name: "0",
    uv: 0.4
  },
  {
    name: "1",
    uv: 0.3
  },
  {
    name: "2",
    uv: 0.2
  },
  {
    name: "3",
    uv: 0.1
  },
  {
    name: "4",
    uv: 0
  }
];

export default class NormalDistribution extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/Lrffmzfc/";

  render() {
    return (
      <AreaChart
        width={500}
        height={200}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    );
  }
}
