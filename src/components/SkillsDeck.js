import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SkillsDeck = ({ title, skills }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="skills-deck-container">
      <h3 className="deck-title">{title}</h3>
      <div className="deck-wrapper">
        {skills.map((skill, index) => {
          // Calculate rotation based on index and total count
          const total = skills.length;
          const mid = (total - 1) / 2;
          const rotate = (index - mid) * 10; // 10 degrees per item
          const x = (index - mid) * 30; // Horizontal spread
          const y = Math.abs(index - mid) * 10; // Arch effect

          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <motion.div
              key={skill.title}
              className="deck-card"
              initial={{ rotate: 0, x: 0, y: 0 }}
              whileInView={{
                rotate: rotate,
                x: x,
                y: y,
                transition: { duration: 0.8, type: "spring" }
              }}
              viewport={{ once: true, margin: "-100px" }}
              animate={
                isHovered
                  ? { scale: 1.2, zIndex: 100, y: -50, rotate: 0 }
                  : isAnyHovered
                  ? { opacity: 0.5, scale: 0.9 } // Dim others
                  : { opacity: 1, scale: 1, rotate: rotate, x: x, y: y }
              }
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              style={{
                zIndex: index, // Default stacking
              }}
            >
              <div className="deck-card-inner">
                <img src={skill.source} alt={skill.alt} />
                <span className="deck-card-title">{skill.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillsDeck;
