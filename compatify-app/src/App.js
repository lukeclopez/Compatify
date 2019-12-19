import React, { Component } from "react";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LogInWithSpotify from "./components/logInWithSpotify";
import CreateProfile from "./components/createProfile";
import DisplayProfile from "./components/displayProfile";
import DisplayCompatifyReport from "./components/displayCompatifyReport";
import SharedProfile from "./components/sharedProfile";
import CreateCompatifyReport from "./components/createCompatifyReport";
import LoggedIn from "./components/loggedIn";
import NotFound from "./components/notFound";
import DeleteData from "./components/deleteData";
import NavBar from "./components/navBar";
import Logout from "./components/logout";
import PrivacyPolicy from "./components/privacyPolicy";
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
            <Route path="/delete-data" component={DeleteData} />
            <Route path="/logged-in" component={LoggedIn} />
            <Route path="/compatify" component={CreateCompatifyReport} />
            <Route
              path="/display-report/:pk"
              component={DisplayCompatifyReport}
            />
            <Route path="/not-found" component={NotFound} />
            <Route path="/profile" component={DisplayProfile} />
            <Route path="/privacy-policy" component={PrivacyPolicy} />
            <Route path="/p:shareCode" component={SharedProfile} />
            <Redirect from="/" exact to="/login" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
        <footer className="footer">
          <div className="container">
            <Link className="text-white" to={"/privacy-policy"}>
              Privacy Policy
            </Link>
            &nbsp; | &nbsp;
            <a className="text-white" href="mailto:mail@compatify.io">
              mail@compatify.io
            </a>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
