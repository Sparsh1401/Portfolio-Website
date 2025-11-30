import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ScrollRevealText = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Split text into words if it's a string
  const words = typeof children === 'string' ? children.split(" ") : [];

  if (words.length === 0) {
      return (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className={className}
          >
              {children}
          </motion.div>
      )
  }

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} style={{ marginRight: "0.25em" }}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default ScrollRevealText;
