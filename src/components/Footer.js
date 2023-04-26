import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <a href="https://github.com/Sparsh1401"><GithubIcon/></a>
        <a href="https://www.linkedin.com/in/sparsh-agarwal1401/"> <LinkedInIcon/></a>
        <a href="https://www.linkedin.com/in/sparsh-agarwal1401/"> <InstagramIcon/></a>
        <a href="https://www.linkedin.com/in/sparsh-agarwal1401/"> <TwitterIcon/></a>
      </div>
      <p> &copy; 2023 Sparsh1401</p>
    </div>
  );
}

export default Footer;
