import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import DisplayCompatifyReport from "./displayCompatifyReport";

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
        error: "Couldn't create compatibility report."
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
    const { user, getUser } = this.props;
    const forceLogin = true;

    if (!user) getUser(forceLogin);

    const user1Data = user.id;

    return user1Data;
  };

  getUser2Data = async shareUrl => {
    const user2Data = await sptfy.getSharedProfile(shareUrl);

    return user2Data;
  };

  createReport = async (userId, shareUrl) => {
    sptfy.removeShareUrl();

    const report = await sptfy.createCompatibilityReport(userId, shareUrl);

    return report.data;
  };

  render() {
    const { loading, error, user1Data, user2Data } = this.state;

    if (loading)
      return <Loader message={"Calculating musical compatibility"} />;
    if (error) return <>{error}</>;

    return (
      <Redirect
        to={`/display-report/${user1Data.user_id}/${user2Data.user_id}`}
      />
    );
  }
}
export default CreateCompatifyReport;
