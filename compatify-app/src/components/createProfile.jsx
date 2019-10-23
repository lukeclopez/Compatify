import React, { Component } from "react";
import sptfy from "../services/spotifyService";
import fakeSptfy from "../services/fakeSpotifyService";

class CreateProfile extends Component {
  state = {};

  componentDidMount() {
    const userId = sptfy.getUserId();
    const currentUrl = window.location;

    this.createProfile(userId, currentUrl);
  }

  createProfile = async (userId, currentUrl) => {
    const response = await fakeSptfy.fakeGenerateProfile(userId, currentUrl);
    console.log(response);
  };

  render() {
    const user = sptfy.getUserId();

    return <h1>Creating Profile for {user}...</h1>;
  }
}

export default CreateProfile;
