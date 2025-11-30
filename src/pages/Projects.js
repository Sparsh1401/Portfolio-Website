import React from "react";
import ProjectItem from "../components/ProjectItem";
import { ProjectList } from "../helpers/ProjectList";
import { motion } from "framer-motion";

import "../styles/Projects.css";

function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="projects">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Personal Projects
      </motion.h1>
      <motion.div
        className="projectList"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {ProjectList.map((project, idx) => {
          return (
            <ProjectItem key={idx} id={idx} name={project.name} image={project.image} />
          );
        })}
      </motion.div>
    </div>
  );
}

export default Projects;
