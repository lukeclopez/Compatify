import React, { Component } from "react";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartTwoProfiles from "./graphs/radarChartTwoProfiles";

class DisplayCompatifyReport extends Component {
  state = {
    user1Data: {},
    user2Data: {},
    compatibilityReport: {},
    loading: true,
    error: ""
  };

  async componentDidMount() {
    try {
      const data = await this.getData();
      const { user1Data, user2Data, compatibilityReport } = data;
      this.setState({
        user1Data,
        user2Data,
        compatibilityReport,
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
    const user1Data = await this.getUser1Data();
    const user2Data = await this.getUser2Data();
    const compatibilityReport = await this.getCompatibilityReport();

    const obj = {
      user1Data,
      user2Data,
      compatibilityReport
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

    return user1Data.data;
  };

  getUser2Data = async () => {
    const shareUrl = sptfy.getShareUrl();
    const user2Data = await sptfy.getSharedProfile(shareUrl);

    return user2Data.data;
  };

  getCompatibilityReport = async () => {
    const userId = sptfy.getSpotifyUserId();
    const shareUrl = sptfy.getShareUrl();

    sptfy.removeShareUrl();

    const report = await sptfy.getCompatibilityReport(userId, shareUrl);

    return report.data;
  };

  render() {
    const {
      user1Data,
      user2Data,
      compatibilityReport,
      loading,
      error
    } = this.state;

    if (loading || !compatibilityReport)
      return <Loader message={"Calculating musical compatibility"} />;

    const {
      overlapping_artists,
      overlapping_genres,
      differences,
      average_difference
    } = compatibilityReport;
    const {
      valence_diff,
      instru_diff,
      popularity_diff,
      energy_diff,
      range_diff
    } = differences;

    if (error) return <>{error}</>;

    return (
      <>
        <h1>
          {user1Data.user_id} and {user2Data.user_id}
        </h1>
        <RadarChartTwoProfiles data1={user1Data} data2={user2Data} />
        <p>
          Differences: {valence_diff}, {instru_diff}, {popularity_diff},
          {energy_diff}, {range_diff}
        </p>
        <p>Average Difference: {average_difference}</p>
        <h4>Genres</h4>
        {overlapping_genres.map((g, index) => {
          return <li key={index}>{g}</li>;
        })}
        <h4>Artists</h4>
        <ul>
          {overlapping_artists.map((a, index) => {
            return <li key={index}>{a[0]}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default DisplayCompatifyReport;
