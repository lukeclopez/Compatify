import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = props => {
  const { user } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Compatify
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/profile">
            My Profile
          </NavLink>
        </div>
      </div>
      {user.id && (
        <Link className="navbar-brand" to="/profile">
          <img
            src={user.images && user.images[0].url}
            width="75"
            height="75"
            alt=""
            style={{ borderRadius: 50 }}
          />
        </Link>
      )}
    </nav>
  );
};

export default NavBar;
