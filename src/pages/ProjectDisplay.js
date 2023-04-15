import React from "react";
import { useParams } from "react-router-dom";
import { ProjectList } from "../helpers/ProjectList";
import GitHubIcon from "@material-ui/icons/GitHub";
import "../styles/ProjectDisplay.css";

function ProjectDisplay() {
  const { id } = useParams();
  const project = ProjectList[id];
  return (
    <div className="project">
      <a href = {project.link}><h1> {project.name}</h1></a>
      <img src={project.image}/>
      <p>
        <b>Skills:</b> {project.skills}
      </p>
    </div>
  );
}

export default ProjectDisplay;
