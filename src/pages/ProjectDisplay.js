import React from "react";
import { useParams } from "react-router-dom";
import { ProjectList } from "../helpers/ProjectList";
import { motion } from "framer-motion";
import "../styles/ProjectDisplay.css";

function ProjectDisplay() {
  const { id } = useParams();
  const project = ProjectList[id];
  return (
    <motion.div
      className="project"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <h1>{project.name}</h1>
      </a>
      <img className="imgCatcher" src={project.image} alt={project.name}/>
      <p>
        <b>Skills:</b> {project.skills}
      </p>
    </motion.div>
  );
}

export default ProjectDisplay;
