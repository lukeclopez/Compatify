import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import SpotifyForm from "./components/spotifyForm";
import CreateProfile from "./components/createProfile";
import DisplayProfile from "./components/displayProfile";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/spotify" component={SpotifyForm} />
            <Route path="/create-profile" component={CreateProfile} />
            <Route path="/display-profile" component={DisplayProfile} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/spotify" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
