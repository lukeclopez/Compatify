import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LogInWithSpotify} />
            <Route path="/logout" component={Logout} />
            <Route path="/create-profile" component={CreateProfile} />
            <Route path="/logged-in" component={LoggedIn} />
            <Route path="/compatify" component={CreateCompatifyReport} />
            <Route
              path="/display-report/:user1Id/:user2Id"
              component={DisplayCompatifyReport}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/profile" component={DisplayProfile} />
            <Route path="/p:shareCode" component={SharedProfile} />
            <Redirect from="/" exact to="/login" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
