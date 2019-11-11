import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      <Navbar
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        collapseOnSelect
        expand="lg"
      >
        <NavLink className="navbar-brand" to="/">
          Compatify{" "}
          {process.env.REACT_APP_DEVELOPMENT === "true" ? "(Dev Mode)" : ""}
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto d-block">
            <Nav.Item>
              <NavLink className="nav-item nav-link" to="/profile">
                My Profile
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
