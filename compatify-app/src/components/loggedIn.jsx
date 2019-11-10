import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";

class LoggedIn extends Component {
  state = { data: {}, loading: true, profileExists: true };

  async componentDidMount() {
    const currentUrl = window.location;
    await this.saveRefreshToken(currentUrl);

    const refreshToken = sptfy.getRefreshToken();
    const response = await sptfy.getCurrentSpotifyUser(refreshToken);
    this.getProfileData(response.data.id);
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
