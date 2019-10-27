import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";

class LogInWithSpotify extends Component {
  state = {};

  logInWithSpotify = async () => {
    const authURl = await sptfy.authorizeSpotifyAccountAccess();
    window.location = authURl;
  };

  render() {
    return (
      <button className="btn btn-primary" onClick={this.logInWithSpotify}>
        Log In With Spotify
      </button>
    );
  }
}

export default LogInWithSpotify;
