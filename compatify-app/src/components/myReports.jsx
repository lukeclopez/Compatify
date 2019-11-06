import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";

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
    if (!reports) return <>No reports!</>;

    return (
      <>
        <div class="card text-white bg-dark mb-3">
          <div class="card-body">
            <p class="card-text"></p>
            <h4>My Compatify Reports</h4>
            <ul>
              {reports.map(r => {
                return (
                  <li>
                    <Link to={`/display-report/${r.id}`}>
                      You and {r.user2_name}, {r.creation_date}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default MyReports;
