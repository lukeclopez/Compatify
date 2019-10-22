import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "../services/movieService";
import sptfy from "../services/spotifyService";

class SpotifyForm extends Form {
  state = {
    data: {
      userId: ""
    },
    errors: {}
  };

  schema = {
    userId: Joi.string()
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  doSubmit = async () => {
    const response = await sptfy.authorizeSpotifyAccountAccess(
      this.state.data.userId
    );
    const authUrl = response.data.auth_url;

    window.location = authUrl;
    // this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Spotify</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("userId", "User ID")}
          {this.renderButton("Go")}
        </form>
      </div>
    );
  }
}

export default SpotifyForm;
