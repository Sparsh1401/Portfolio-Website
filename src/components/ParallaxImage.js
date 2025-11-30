import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxImage = ({ src, alt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1]);

  return (
    <div
      ref={ref}
      style={{
        height: "60vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "4rem 0",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          y,
          scale,
          width: "100%",
          height: "120%", // Taller than container for parallax
          position: "absolute",
          top: "-10%",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.8,
          }}
        />
        <div
            style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, #0a0e1a 0%, transparent 20%, transparent 80%, #0a0e1a 100%)" // Blend edges
            }}
        />
      </motion.div>
    </div>
  );
};

export default ParallaxImage;
