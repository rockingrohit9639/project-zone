import React from "react";

// Style Sheet
import "./Footer.css"

const Footer = () => {
  return (
    <footer>
        <div className="footerSection_">
          <h1 className="footerSection_title_">Project Zone</h1>
          <p>Made with ❤️ by OpenSource <a href="https://github.com/rockingrohit9639/project-zone/graphs/contributors" target="_blank" rel="noreferrer">Contributors</a>.</p>
        </div>
        <div className="footerSection_">
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Find Projects</a>
            </li>
            <li>
              <a href="">Login/Signup</a>
            </li>
            <li>
              <a href="">About</a>
            </li>
          </ul>
        </div>
    </footer>
  );
}

export default Footer;
