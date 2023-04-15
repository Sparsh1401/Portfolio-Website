import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EmailIcon from "@material-ui/icons/Email";
import GithubIcon from "@material-ui/icons/GitHub";
import { Typewriter } from 'react-simple-typewriter'
import Skills from "../components/Skills";
import "../styles/Home.css";
function Home() {
  return (
    <div className="home">
      <div className="about">
        <h2> Hi,I'm Sparsh Agarwal</h2>
        <span className="hero-text">
          <Typewriter
            words={['FrontEnd Developer', 'BackEnd Developer', 'FullStack Devloper']}
            loop={5}
            cursor
            typeSpeed={100}
            deleteSpeed={70}
            delaySpeed={1000}
          />
        </span>
        <div className="prompt">
          <p>A software developer with a passion for learning and creating.</p>
          <a href="https://www.linkedin.com/in/sparsh-agarwal1401/"><LinkedInIcon /></a>
          <a href="mailto:sparshagarwal811@gmail.com"><EmailIcon /></a>
          <a href="https://github.com/Sparsh1401"><GithubIcon /></a>
        </div>
      </div>
      <div className="skills">
        <Skills />
      </div>
    </div>
  );
}

export default Home;
