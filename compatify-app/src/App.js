import React, { Component } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import sptfy from "./services/spotifyService";
import LogInWithSpotify from "./components/logInWithSpotify";
import CreateProfile from "./components/createProfile";
import DisplayProfile from "./components/displayProfile";
import DisplayCompatifyReport from "./components/displayCompatifyReport";
import SharedProfile from "./components/sharedProfile";
import CreateCompatifyReport from "./components/createCompatifyReport";
import LoggedIn from "./components/loggedIn";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    this.getCurrentUserData();
  }

  getCurrentUserData = async forceLogin => {
    const refreshToken = sptfy.getRefreshToken();
    const user = await sptfy.getCurrentSpotifyUser(refreshToken);

    if (!refreshToken && forceLogin) {
      toast.warn("You need to log with Spotify first!");
      this.props.history.push("/");
      return null;
    }
    if (user) {
      toast.success(`Welcome, ${user.data.id}!`);
      this.setState({ user: user.data });
    }
  };

  handleLogout = () => {
    sptfy.removeRefreshToken();

    window.location = "/";
  };

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LogInWithSpotify} />
            <Route path="/logout" component={Logout} />
            <Route path="/create-profile" component={CreateProfile} />
            <Route path="/logged-in" component={LoggedIn} />
            <Route path="/compatify" component={CreateCompatifyReport} />
            <Route
              path="/display-report/:user1Id/:user2Id"
              render={props => (
                <DisplayCompatifyReport
                  {...props}
                  user={user}
                  getUser={this.getCurrentUserData}
                />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Route
              path="/profile"
              render={props => (
                <DisplayProfile
                  {...props}
                  user={user}
                  getUser={this.getCurrentUserData}
                />
              )}
            />
            <Route path="/p:shareCode" component={SharedProfile} />
            <Redirect from="/" exact to="/login" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default withRouter(App);
