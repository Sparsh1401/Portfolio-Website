import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GithubIcon from "@material-ui/icons/GitHub";
import EmailIcon from "@material-ui/icons/Email";
import CodeIcon from "@material-ui/icons/Code";
import { motion } from "framer-motion";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <motion.div
        className="footer-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-section">
          <h3 className="footer-title">Sparsh Agarwal</h3>
          <p className="footer-subtitle">Backend Engineer | Data Platform Developer</p>
          <p className="footer-description">
            Building scalable systems and solving complex problems
          </p>
        </div>

        <div className="socialMedia">
          <motion.a
            href="https://github.com/Sparsh1401"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/sparsh-agarwal1401/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <LinkedInIcon />
          </motion.a>
          <motion.a
            href="mailto:sparshagarwal811@gmail.com"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <EmailIcon />
          </motion.a>
          <motion.a
            href="https://leetcode.com/u/sparsh_agarwal/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <CodeIcon />
          </motion.a>
        </div>

        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Sparsh Agarwal. Built with React & Framer Motion
        </p>
      </motion.div>
    </div>
  );
}

export default Footer;
