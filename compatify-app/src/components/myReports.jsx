import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";
import WhiteBottomTransCard from "./common/whiteBottomTransCard";

class MyReports extends Component {
  state = { data: {}, loading: true };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await sptfy.getAllReportsForUser(this.props.userId);
    this.setState({ data: response, loading: false });
  };

  render() {
    const { data, loading } = this.state;
    const { reports } = data;

    if (loading) return <>Getting reports...</>;

    return (
      <WhiteBottomTransCard>
        <div className="card-body">
          <h4>My Compatify Reports</h4>
          {reports.length === 0 && (
            <p className="card-text">
              No reports yet! Share your Compatify link with a friend to get
              started.
            </p>
          )}
          {reports.map(r => {
            return (
              <div key={r.creation_date + r.id}>
                <Link className="text-white" to={`/display-report/${r.id}`}>
                  You and {r.user2_name}, {r.creation_date}
                </Link>
              </div>
            );
          })}
        </div>
      </WhiteBottomTransCard>
    );
  }
}

export default MyReports;
