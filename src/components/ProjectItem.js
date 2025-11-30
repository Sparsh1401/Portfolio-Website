import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ProjectItem({ image, name, id }) {
  const navigate = useNavigate();

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="projectItem"
      variants={itemVariants}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 }
      }}
      onClick={() => {
        navigate("/project/" + id);
      }}
    >
      <div style={{ backgroundImage: `url(${image})` }} className="bgImage" />
      <h1> {name} </h1>
    </motion.div>
  );
}

export default ProjectItem;
