import React, { Component } from "react";
import WhiteBottomTransCard from "./common/whiteBottomTransCard";
import Table from "./common/table";

const traitsMap = [
  "avg_track_valence",
  "avg_track_instru",
  "avg_track_popularity",
  "avg_track_energy",
  "range"
];

class ReportTitleCard extends Component {
  render() {
    const { user1Data, user2Data, report } = this.props;
    const user1Id = user1Data.user_id;
    const user2Id = user2Data.user_id;
    const { differences, average_difference } = report.content;
    const {
      valence_diff,
      instru_diff,
      popularity_diff,
      energy_diff,
      range_diff
    } = differences;

    const columns = [
      { path: "trait", label: "Trait" },
      { path: user1Id, label: user1Id },
      { path: user2Id, label: user2Id },
      { path: "difference", label: "Difference" }
    ];
    const baseData = [
      {
        trait: "Valence",
        difference: valence_diff
      },
      {
        trait: "Instrumentalness",
        difference: instru_diff
      },
      {
        trait: "Popularity",
        difference: popularity_diff
      },
      {
        trait: "Energy",
        difference: energy_diff
      },
      {
        trait: "Range",
        difference: range_diff
      }
    ];
    const data = baseData.map((item, index) => {
      item[user1Id] = user1Data[traitsMap[index]];
      item[user2Id] = user2Data[traitsMap[index]];
      return { ...item };
    });

    return (
      <WhiteBottomTransCard>
        <div className="card-body">
          <h4 className="card-title">
            {user1Data.user_id} and {user2Data.user_id}
          </h4>
          <h6 className="card-title">Created on {report.creation_date}</h6>
          <p className="card-text">
            <Table data={data} columns={columns} sortColumn={columns[0]} />
          </p>
          <p>Average difference: {average_difference}</p>
        </div>
      </WhiteBottomTransCard>
    );
  }
}

export default ReportTitleCard;
