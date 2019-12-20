import React from "react";
import { Link } from "react-router-dom";
import LogInWithSpotify from "./logInWithSpotify";

const Homepage = () => {
  return (
    <>
      <p>
        Compare your mustic taste with that of your friends. Log in with Spotify
        to get started!
      </p>
      <p>
        <LogInWithSpotify />
      </p>
      <p>
        <Link className="text-white" to={"/privacy-policy"}>
          Privacy Policy
        </Link>
      </p>
      <p>
        <a className="text-white" href="mailto:mail@compatify.io">
          mail@compatify.io
        </a>
      </p>
    </>
  );
};

export default Homepage;
