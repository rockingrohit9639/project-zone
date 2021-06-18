import React from "react";
import { Link } from "react-router-dom";

// Style Sheet
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
        <div className="footerSection_">
          <h1 className="footerSection_title_">Project Zone</h1>
          <p>Made with ❤️ by OpenSource <a href="https://github.com/rockingrohit9639/project-zone/graphs/contributors" target="_blank" rel="noreferrer">Contributors</a>.</p>
        </div>
        <div className="footerRight">
          <ul>
          <li>
            <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">Find Projects</Link>
            </li>
            <li>
              <Link to="/login">Login/Signup</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
          </ul>
        </div>
    </footer>
  );
}

export default Footer;
