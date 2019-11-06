import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";

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
      <button className="btn btn-primary" onClick={this.logInWithSpotify}>
        {this.props.message || "Log in with Spotify"}
      </button>
    );
  }
}

export default LogInWithSpotify;