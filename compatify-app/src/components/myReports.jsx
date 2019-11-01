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
    this.setState({ data: response.data, loading: false });
  };

  render() {
    const { data, loading } = this.state;
    const { reports } = data;

    if (loading) return <>Getting reports...</>;
    if (!reports) return <>No reports!</>;

    return (
      <>
        <ul>
          {reports.map(r => {
            return (
              <li>
                <Link to={`/display-report/${r.user_1_id}/${r.user_2_id}`}>
                  {r.user_1_id} and {r.user_2_id}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default MyReports;
