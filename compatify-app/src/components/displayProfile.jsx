import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class DisplayProfile extends Component {
  state = {};
  render() {
    console.log(this.props);
    return <h1>Profile</h1>;
  }
}

export default DisplayProfile;
