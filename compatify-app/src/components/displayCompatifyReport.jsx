import React, { Component } from "react";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartTwoProfiles from "./graphs/radarChartTwoProfiles";

class DisplayCompatifyReport extends Component {
  state = {
    user1Data: {},
    user2Data: {},
    report: { content: { differences: {} } },
    loading: true,
    error: ""
  };

  async componentDidMount() {
    try {
      const data = await this.getData();
      const { user1Data, user2Data, report } = data;
      this.setState({
        user1Data,
        user2Data,
        report,
        loading: false
      });
    } catch (ex) {
      this.setState({
        loading: false,
        error: "Couldn't get compatibility report."
      });
    }
  }

  getData = async () => {
    const { user2Id } = this.props.match.params;
    const user1Data = await this.getUser1Data();
    const user2Data = await this.getUser2Data(user2Id);
    const report = await this.getReport(user1Data.user_id, user2Id);

    const obj = {
      user1Data,
      user2Data,
      report
    };

    return obj;
  };

  getUser1Data = async () => {
    const refreshToken = sptfy.getRefreshToken();

    if (!refreshToken) {
      this.props.history.push("/login");
      return null;
    }

    const currentUser = await sptfy.getCurrentSpotifyUser(refreshToken);
    const userId = currentUser.data.id;
    const user1Data = await sptfy.getProfile(userId);

    return user1Data;
  };

  getUser2Data = async user2Id => {
    const response = await sptfy.getUserShareUrl(user2Id);
    const user2Data = await sptfy.getSharedProfile(response.data.share_url);

    return user2Data;
  };

  getReport = async (userId1, userId2) => {
    const report = await sptfy.getCompatibilityReport(userId1, userId2);

    return report.data;
  };

  render() {
    const { user1Data, user2Data, report, loading, error } = this.state;
    const {
      overlapping_genres,
      overlapping_artists,
      overlapping_tracks,
      differences,
      average_difference
    } = report.content;
    const {
      valence_diff,
      instru_diff,
      popularity_diff,
      energy_diff,
      range_diff
    } = differences;

    if (error) return <>{error}</>;

    if (loading) return <Loader message={"Getting Compatify report"} />;

    return (
      <>
        <h1>
          {user1Data.user_id} and {user2Data.user_id}
        </h1>
        <h4>{report.creation_date}</h4>
        <RadarChartTwoProfiles data1={user1Data} data2={user2Data} />
        <p>
          Differences: {valence_diff}, {instru_diff}, {popularity_diff},
          {energy_diff}, {range_diff}
        </p>
        <p>Average Difference: {average_difference}</p>
        <h4>Genres in Common</h4>
        <ul>
          {overlapping_genres &&
            overlapping_genres.map((g, index) => {
              return <li key={index}>{g}</li>;
            })}
        </ul>
        <h4>Artists in Common</h4>
        <ul>
          {overlapping_artists &&
            overlapping_artists.map((a, index) => {
              return <li key={index}>{a.name}</li>;
            })}
        </ul>
        <h4>Tracks in Common</h4>
        <ul>
          {overlapping_tracks &&
            overlapping_tracks.map((t, index) => {
              return (
                <li key={index}>
                  {t.name} by {t.artists[0].name}
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}

export default DisplayCompatifyReport;
