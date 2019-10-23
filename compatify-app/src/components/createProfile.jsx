import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Loader from "./common/loader";
import sptfy from "../services/spotifyService";
import fakeSptfy from "../services/fakeSpotifyService";

class CreateProfile extends Component {
  state = {
    data: {},
    loading: true
  };

  componentDidMount() {
    const userId = sptfy.getUserId();
    const currentUrl = window.location;

    this.createProfile(userId, currentUrl);
  }

  createProfile = async (userId, currentUrl) => {
    const response = await fakeSptfy.createProfile(userId, currentUrl);
    this.setState({ data: response.data, loading: false });
  };

  render() {
    const user = sptfy.getUserId();
    const { data, loading } = this.state;

    if (loading) return <Loader message={"Creating profile for " + user} />;

    const redirectInfo = {
      pathname: "/display-profile",
      state: { data: data.data }
    };
    return <Redirect to={redirectInfo} />;
  }
}

export default CreateProfile;
