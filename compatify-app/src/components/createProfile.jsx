import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import sptfy from "../services/spotifyService";
import fakeSptfy from "../services/fakeSpotifyService";

class CreateProfile extends Component {
  state = {
    data: ""
  };

  componentDidMount() {
    const userId = sptfy.getUserId();
    const currentUrl = window.location;

    this.createProfile(userId, currentUrl);
  }

  createProfile = async (userId, currentUrl) => {
    const response = await fakeSptfy.fakeGenerateProfile(userId, currentUrl);
    this.setState({ data: response });
  };

  render() {
    const user = sptfy.getUserId();
    const { data } = this.state;

    return (
      <>
        {data ? (
          <Redirect
            to={{
              pathname: "/display-profile",
              state: { data }
            }}
          />
        ) : (
          <h1>Creating Profile for {user}...</h1>
        )}
      </>
    );
  }
}

export default CreateProfile;
