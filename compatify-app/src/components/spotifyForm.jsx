import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
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
    await sptfy.authorizeSpotifyAccountAccess(this.state.data.userId);

    window.location = sptfy.getAuthUrl();

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
