import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import LogInWithSpotify from "./logInWithSpotify";
import RadarChartCompat from "./graphs/radarChartCompat";

class SharedProfile extends Component {
  state = { data: {}, loading: true, error: "" };

  componentDidMount() {
    this.getSharedProfileData();
  }

  getSharedProfileData = async () => {
    const code = this.props.match.params.shareCode;
    try {
      const data = await sptfy.getSharedProfile(code);
      this.setState({ data: data.data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ loading: false, error: "Invalid code!" });
      }
    }
  };

  render() {
    const { data, loading, error } = this.state;
    const { user_id, share_url } = data;
    const currentUser = sptfy.getSpotifyUserId();

    if (loading) return <Loader message={"Getting profile"} />;

    if (error) return <>{error}</>;

    return (
      <>
        <h1>{user_id}</h1>
        {user_id === currentUser &&
          "This is what others will see when they use your share URL."}
        <RadarChartCompat name={user_id} data={data} />
        <p>Are we musically compatible? Log in with Spotify to find out!</p>
        <LogInWithSpotify compatifyShareUrl={share_url} />
      </>
    );
  }
}

export default SharedProfile;
