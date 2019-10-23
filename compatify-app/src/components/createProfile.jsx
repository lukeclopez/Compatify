import React, { Component } from "react";
import sptfy from "../services/spotifyService";

class CreateProfile extends Component {
  state = {};

  componentDidMount() {
    const userId = sptfy.getUserId();
    const currentUrl = window.location;

    this.createProfile(userId, currentUrl);
  }

  createProfile = async (userId, authUrl) => {
    const response = await sptfy.createProfile(userId, authUrl);
    console.log(response);
  };

  render() {
    const user = sptfy.getUserId();

    return <h1>Creating Profile for {user}...</h1>;
  }
}

export default CreateProfile;
