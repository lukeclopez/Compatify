import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import sptfy from "../services/spotifyService";

class LoginForm extends Form {
  state = {
    data: { username: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username")
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const response = await sptfy.authorizeSpotifyAccountAccess(data.username);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
