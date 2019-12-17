import React, { Component } from "react";
import Loader from "./common/loader";
import sptfy from "../services/spotifyService";

class DeleteData extends Component {
  state = {
    data: {},
    loading: true
  };

  componentDidMount() {
    const userId = sptfy.getUserId();
    const refreshToken = sptfy.getRefreshToken();

    if (userId && refreshToken) this.deleteData(refreshToken);
  }

  deleteData = async refreshToken => {
    const userId = await sptfy.getCurrentSpotifyUser(refreshToken);
    const response = await sptfy.deleteData(userId.data.id);
    sptfy.removeRefreshToken();
    this.setState({ data: response.data, loading: false });
  };

  render() {
    const { loading } = this.state;

    if (loading) return <Loader />;

    return <p>All your data has been deleted.</p>;
  }
}

export default DeleteData;
