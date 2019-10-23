import React, { Component } from "react";

class DisplayProfile extends Component {
  state = {};
  render() {
    const { data } = this.props.location.state;
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
