import React, { Component } from "react";
import sptfy from "../services/spotifyService";
import Loader from "./common/loader";

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
        <h4>Average Track Age</h4>
        <span>{data.avg_track_age}</span>
        <h4>Average Track Length</h4>
        <span>{data.avg_track_length}</span>
        <h4>Average Track Popularity</h4>
        <span>{data.avg_track_popularity}</span>
        <h4>Artists</h4>
        <ul>
          {data.primary_artists.map((a, index) => {
            return <li key={index}>{a[0].name}</li>;
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
