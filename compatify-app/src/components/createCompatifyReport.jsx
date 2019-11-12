import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";

class CreateCompatifyReport extends Component {
  state = {
    user1Data: {},
    user2Data: {},
    report: {},
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
      console.log(ex);
      this.setState({
        loading: false,
        error: ex.message
      });
    }
  }

  getData = async () => {
    const userId = sptfy.getSpotifyUserId();
    const shareUrl = sptfy.getShareUrl();

    const user1Data = await this.getUser1Data();
    const user2Data = await this.getUser2Data(shareUrl);
    const report = await this.createReport(userId, shareUrl);

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

  getUser2Data = async shareUrl => {
    const user2Data = await sptfy.getSharedProfile(shareUrl);

    return user2Data;
  };

  createReport = async (userId, shareUrl) => {
    sptfy.removeShareUrl();

    const report = await sptfy.createCompatibilityReport(userId, shareUrl);

    if (!report.data.id) {
      throw new Error({ Error: "Empty report ID" });
    }

    return report.data;
  };

  render() {
    const { loading, error, report } = this.state;

    if (loading)
      return <Loader message={"Calculating musical compatibility"} />;
    if (error) return <>{error}</>;

    return <Redirect to={`/display-report/${report.id}`} />;
  }
}
export default CreateCompatifyReport;
