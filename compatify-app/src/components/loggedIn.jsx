import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";

class LoggedIn extends Component {
  state = { data: {}, loading: true, profileExists: true };

  componentDidMount() {
    const userId = sptfy.getUserId();
    const currentUrl = window.location;

    sptfy.saveSpotifyCodeUrl(currentUrl);

    this.getProfileData(userId);
  }

  getProfileData = async userId => {
    // TESTING
    const cU = await sptfy.getCurrentSpotifyUser();
    console.log(cU);
    try {
      const data = await sptfy.getProfile(userId);
      this.setState({ data: data.data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      this.setState({ loading: false, profileExists: false });
    }
  };

  render() {
    const { data, loading, profileExists } = this.state;
    const { userId } = this.props.match.params;

    if (loading)
      return (
        <Loader message={"Checking whether profile exists for " + userId} />
      );

    //if (profileExists) return <Redirect to="/display-profile" />;
    //if (!profileExists) return <Redirect to="/create-profile" />;

    return <></>;
  }
}

export default LoggedIn;
