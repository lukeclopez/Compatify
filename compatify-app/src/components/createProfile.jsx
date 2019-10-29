import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loader from "./common/loader";
import sptfy from "../services/spotifyService";

class CreateProfile extends Component {
  state = {
    data: {},
    loading: true
  };

  componentDidMount() {
    const userId = sptfy.getUserId();
    const currentUrl = window.location;
    const refreshToken = sptfy.getRefreshToken();

    this.createProfile(userId, refreshToken);
  }

  createProfile = async (userId, currentUrl) => {
    const response = await sptfy.createProfile(userId, currentUrl);
    this.setState({ data: response.data, loading: false });
  };

  render() {
    const shareUrl = sptfy.getShareUrl();
    const userId = sptfy.getUserId();
    const { loading } = this.state;

    if (loading) return <Loader message={"Creating profile for " + userId} />;
    if (shareUrl) return <></>;

    return <Redirect to={`profile/${userId}`} />;
  }
}

export default CreateProfile;
