import React, { Component } from "react";

class ReportTitleCard extends Component {
  handleChangeTab = tabTitle => {
    this.setState({ activeTab: tabTitle });
  };

  render() {
    const { user1Data, user2Data, report } = this.props;
    const { differences, average_difference } = report.content;
    const {
      valence_diff,
      instru_diff,
      popularity_diff,
      energy_diff,
      range_diff
    } = differences;

    return (
      <div className="card bg-dark mb-3 text-center text-white">
        <div className="card-body">
          <h4 className="card-title">
            {user1Data.user_id} and {user2Data.user_id}
          </h4>
          <h6 className="card-title">Created on {report.creation_date}</h6>
          <p className="card-text">
            Differences: {valence_diff}, {instru_diff}, {popularity_diff},
            {energy_diff}, {range_diff}
          </p>
          <p>Average Difference: {average_difference}</p>
        </div>
      </div>
    );
  }
}

export default ReportTitleCard;
