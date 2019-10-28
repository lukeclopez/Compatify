import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartCompat from "./graphs/radarChartCompat";

class DisplayProfile extends Component {
  state = { data: {}, loading: true, error: "" };

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData = async () => {
    const refreshToken = sptfy.getRefreshToken();
    if (!refreshToken) {
      this.props.history.push("/login");
      return null;
    }
    const currentUser = await sptfy.getCurrentSpotifyUser(refreshToken);
    try {
      const data = await sptfy.getProfile(currentUser.data.id);
      this.setState({ data: data.data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ loading: false, error: "Could not find profile!" });
      }
    }
  };

  newShareUrl = async () => {
    return await sptfy.getNewShareUrl();
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) return <Loader message={"Getting profile"} />;

    if (error) return <>{error}</>;

    return (
      <>
        <h1>{data.user_id}</h1>
        <Link to="/create-profile">
          <button className="btn btn-primary">Update Profile</button>
        </Link>
        <h3>
          Let others see your profile:
          {data.share_url && " compatify.io/" + data.share_url}
        </h3>
        <button className="btn btn-primary" onClick={this.newShareUrl}>
          Get a new share URL
        </button>

        <RadarChartCompat
          name={data.user_id}
          valence={data.avg_track_valence}
          instrumentalness={data.avg_track_instru}
          popularity={data.avg_track_popularity}
          energy={data.avg_track_energy}
          range={data.range}
        />
        <h4>Genres</h4>
        {data.genres.map((g, index) => {
          return <li key={index}>{g}</li>;
        })}
        <h4>Artists</h4>
        <ul>
          {data.artists.map((a, index) => {
            return <li key={index}>{a.name}</li>;
          })}
        </ul>
      </>
    );
  }
}

export default DisplayProfile;
