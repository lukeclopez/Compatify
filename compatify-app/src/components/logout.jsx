import { Component } from "react";
import sptfy from "../services/spotifyService";

class Logout extends Component {
  componentDidMount() {
    sptfy.removeRefreshToken();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
