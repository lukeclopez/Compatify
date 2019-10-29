import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import DisplayCompatifyReport from "./displayCompatifyReport";

class LoggedIn extends Component {
  state = { data: {}, loading: true, profileExists: true };

  componentDidMount() {
    const userId = sptfy.getUserId();
    const currentUrl = window.location;

    this.getProfileData(userId);
    this.saveRefreshToken(currentUrl);
  }

  getProfileData = async userId => {
    try {
      const data = await sptfy.getProfile(userId);
      this.setState({ data: data.data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        console.log("This user does not have a profile yet.");
      this.setState({ loading: false, profileExists: false });
    }
  };

  saveRefreshToken = async currentUrl => {
    const tokenInfo = await sptfy.getToken(currentUrl);
    sptfy.saveRefreshToken(tokenInfo.data.refresh_token);
  };

  render() {
    const { loading, profileExists } = this.state;
    const { userId } = this.props.match.params;
    const shareUrl = sptfy.getShareUrl();

    if (loading) {
      return (
        <Loader message={"Checking whether profile exists for " + userId} />
      );
    }

    if (shareUrl && profileExists) return <Redirect to="/compatify" />;
    if (profileExists) return <Redirect to="/profile" />;
    if (!profileExists) return <Redirect to="/create-profile" />;

    return <></>;
  }
}

export default LoggedIn;
