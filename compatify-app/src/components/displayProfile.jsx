import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartCompat from "./graphs/radarChartCompat";

class DisplayProfile extends Component {
  state = { data: {}, loading: true, error: false };

  componentDidMount() {
    this.getProfileData();
  }

  getProfileData = async () => {
    try {
      const refreshToken = sptfy.getRefreshToken();
      const currentUser = await sptfy.getCurrentSpotifyUser(refreshToken);
      const data = await sptfy.getProfile(currentUser.data.id);

      this.setState({ data: data.data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) return <Loader message={"Getting profile..."} />;

    if (error) return <>We couldn't find that user... sorry!</>;

    return (
      <>
        <h1>{data.user_id}'s Profile</h1>
        <Link to="/create-profile">
          <button className="btn btn-primary">Update Profile</button>
        </Link>
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
