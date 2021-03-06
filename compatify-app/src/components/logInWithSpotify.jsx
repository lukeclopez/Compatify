import React, { Component } from "react";
import sptfy from "../services/spotifyService";
import CompatifyButton from "./common/compatifyButton";

class LogInWithSpotify extends Component {
  state = {};

  logInWithSpotify = async () => {
    const authURl = await sptfy.authorizeSpotifyAccountAccess();
    const { compatifyShareUrl } = this.props;

    if (compatifyShareUrl) {
      sptfy.saveShareUrl(compatifyShareUrl);
    }

    window.location = authURl;
  };

  render() {
    return (
      <CompatifyButton onClick={this.logInWithSpotify}>
        {this.props.message || "Log in with Spotify"}
      </CompatifyButton>
    );
  }
}

export default LogInWithSpotify;
