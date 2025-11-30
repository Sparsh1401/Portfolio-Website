import React, { useEffect, useState } from "react";
import { useSpring, animated } from '@react-spring/web';
import "../styles/Home.css";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { tension: 150, friction: 25 };
  const cursorX = useSpring({ to: mousePosition.x, config: springConfig });
  const cursorY = useSpring({ to: mousePosition.y, config: springConfig });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <animated.div
        className="custom-cursor"
        style={{
          left: cursorX.to,
          top: cursorY.to,
        }}
      />
      <animated.div
        className="custom-cursor-dot"
        style={{
          left: cursorX.to,
          top: cursorY.to,
        }}
      />
    </>
  );
};

export default CustomCursor;
