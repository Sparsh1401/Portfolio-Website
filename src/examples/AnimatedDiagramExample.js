import React from "react";
import AnimatedSystemDiagram from "../components/AnimatedSystemDiagram";

// USAGE EXAMPLE:
// 1. Save your system diagram image to: src/assets/system-diagram.png
// 2. Import it: import systemImage from "../assets/system-diagram.png";
// 3. Use the component: <AnimatedSystemDiagram imageSrc={systemImage} />

// Example 1: Simple usage
export function Example1() {
  // Replace with your actual image path
  const systemImage = require("../assets/system-diagram.png");

  return (
    <div>
      <h1>My Distributed System</h1>
      <AnimatedSystemDiagram imageSrc={systemImage} />
    </div>
  );
}

// Example 2: Add to existing ProjectDisplay
// In ProjectDisplay.js, add:
/*
import AnimatedSystemDiagram from "../components/AnimatedSystemDiagram";

function ProjectDisplay() {
  const { id } = useParams();
  const project = ProjectList[id];

  // Check if this is the system architecture project
  const isSystemProject = project.name.includes("Ride Sharing");

  return (
    <motion.div className="project">
      <h1>{project.name}</h1>

      {isSystemProject ? (
        <AnimatedSystemDiagram imageSrc={project.image} />
      ) : (
        <img className="imgCatcher" src={project.image} alt={project.name}/>
      )}

      <p><b>Skills:</b> {project.skills}</p>
    </motion.div>
  );
}
*/

// Example 3: Update ProjectList
// In ProjectList.js, add your system diagram:
/*
import systemDiagram from "../assets/system-diagram.png";

export const ProjectList = [
  // ... your existing projects ...
  {
    name: "Ride Sharing System Architecture",
    image: systemDiagram,
    skills: "Microservices, Kafka, Redis, Spark, PostgreSQL, Docker, Kubernetes",
    link: "https://github.com/yourusername/ride-sharing",
  },
];
*/
