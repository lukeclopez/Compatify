import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartCompat from "./graphs/radarChartCompat";
import ShareUrl from "./shareUrl";

class SharedProfile extends Component {
  state = { data: {}, loading: true, error: "" };

  componentDidMount() {
    this.getSharedProfileData();
  }

  getSharedProfileData = async () => {
    const code = this.props.match.params.shareCode;
    console.log(code);
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
    const {
      user_id,
      avg_track_valence,
      avg_track_instru,
      avg_track_popularity,
      avg_track_energy,
      range
    } = data;

    if (loading) return <Loader message={"Getting profile"} />;

    if (error) return <>{error}</>;

    return (
      <>
        <h1>{user_id}</h1>
        <RadarChartCompat
          name={user_id}
          valence={avg_track_valence}
          instrumentalness={avg_track_instru}
          popularity={avg_track_popularity}
          energy={avg_track_energy}
          range={range}
        />
      </>
    );
  }
}

export default SharedProfile;
