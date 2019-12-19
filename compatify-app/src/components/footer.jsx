import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
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
  );
};

export default Footer;
