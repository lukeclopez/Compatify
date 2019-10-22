import React, { Component } from "react";
import sptfy from "../services/spotifyService";

class CreateProfile extends Component {
  state = {};

  componentDidMount() {
    console.log(this.props.history);
  }

  render() {
    return <h1>Create Profile</h1>;
  }
}

export default CreateProfile;
