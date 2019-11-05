import React, { Component } from "react";
import { Link } from "react-router-dom";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartCompat from "./graphs/radarChartCompat";
import ShareUrl from "./shareUrl";
import MyReports from "./myReports";
import ArtistsCard from "./artistsCard";

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
      this.setState({ data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.setState({ loading: false, error: "Could not find profile!" });
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
      range,
      genres,
      artists,
      share_url
    } = data;
    const radarData = {
      avg_track_valence,
      avg_track_instru,
      avg_track_popularity,
      avg_track_energy,
      range
    };

    if (loading) return <Loader message={"Getting profile"} />;

    if (error) return <>{error}</>;

    return (
      <>
        <h1>{user_id}</h1>
        <Link to="/create-profile">
          <button className="btn btn-primary">Update Profile</button>
        </Link>

        <ShareUrl userId={user_id} shareUrl={share_url} />

        <RadarChartCompat name={user_id} data={radarData} />
        <p>
          <h4>My Reports</h4>
          <MyReports userId={user_id} />
        </p>
        <h4>Genres</h4>
        {genres.map((g, index) => {
          return <li key={index}>{g}</li>;
        })}
        <ArtistsCard artists={artists} />
      </>
    );
  }
}

export default DisplayProfile;
