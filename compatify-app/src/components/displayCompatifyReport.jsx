import React, { Component } from "react";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartTwoProfiles from "./graphs/radarChartTwoProfiles";
import ReportTitleCard from "./reportTitleCard";
import ArtistsCards from "./artistsCards";
import Genres from "./genres";
import Tracks from "./tracks";

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
        error: ex
      });
    }
  }

  getData = async () => {
    const { pk } = this.props.match.params;
    const report = await this.getReport(pk);
    const user1Data = await this.getUser1Data();
    const user2 = await sptfy.getSpotifyUserByPk(report.user2);
    const user2Data = await this.getUser2Data(user2.user_id);

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

  getReport = async pk => {
    if (!pk) {
      throw "For some reason, the system is trying to get a report with no ID number, which doesn't exactly work, so... yeah.";
    }
    const report = await sptfy.getCompatibilityReport(pk);

    return report.data;
  };

  render() {
    const { user1Data, user2Data, report, loading, error } = this.state;
    const {
      overlapping_genres,
      overlapping_artists,
      overlapping_tracks
    } = report.content;

    if (error) return <>{error}</>;

    if (loading) return <Loader message={"Getting Compatify report"} />;

    return (
      <>
        <ReportTitleCard
          user1Data={user1Data}
          user2Data={user2Data}
          report={report}
        />

        <RadarChartTwoProfiles data1={user1Data} data2={user2Data} />

        <h4>Genres in Common</h4>
        <Genres genres={overlapping_genres} />

        <h4>Artists in Common</h4>
        <ArtistsCards artists={overlapping_artists} />

        <h4>Tracks in Common</h4>
        <Tracks tracks={overlapping_tracks} />
      </>
    );
  }
}

export default DisplayCompatifyReport;
