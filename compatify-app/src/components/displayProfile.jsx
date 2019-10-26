import React, { Component } from "react";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";
import RadarChartCompat from "./graphs/radarChartCompat";
import CustomShapeBar from "./graphs/customShapeBar";

class DisplayProfile extends Component {
  state = { data: {}, loading: true, error: false };

  componentDidMount() {
    this.getProfileData(this.props.match.params.userId);
  }

  getProfileData = async userId => {
    try {
      const data = await sptfy.getProfile(userId);
      this.setState({ data: data.data, loading: false });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log("x");
      this.setState({ loading: false, error: true });
    }
  };

  render() {
    const { data, loading, error } = this.state;
    const { userId } = this.props.match.params;

    if (loading) return <Loader message={"Getting profile for " + userId} />;

    if (error) return <>We couldn't find that user... sorry!</>;

    return (
      <>
        <h1>{data.user_id}'s Profile</h1>
        <RadarChartCompat
          name={data.user_id}
          energy={data.avg_track_energy}
          valence={data.avg_track_valence}
          popularity={data.avg_track_popularity}
          instrumentalness={data.avg_track_instru}
        />
        <CustomShapeBar reach={data.genre_dist} />
        <h4>Average Track Age</h4>
        <span>{data.avg_track_age}</span>
        <h4>Genres</h4>
        {data.genres.map((g, index) => {
          return <li key={index}>{g}</li>;
        })}
        <h4>Genre Distribution</h4>
        <span>{data.genre_dist}</span>
        <h4>Artists</h4>
        <ul>
          {data.primary_artists.map((a, index) => {
            return <li key={index}>{a.name}</li>;
          })}
        </ul>
        <h4>Related Artists</h4>
        <ul>
          {data.artists_tree.map((a, index) => {
            return (
              <li key={index}>
                {a.name}
                <ul>
                  {a.genres.map((g, index) => (
                    <li key={index}>{g}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default DisplayProfile;
