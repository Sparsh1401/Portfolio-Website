import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/DiagramPreview.css";

const DiagramPreview = ({ imageSrc }) => {
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 12);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  // Define exact flow paths based on the diagram arrows
  const dataFlows = [
    // Driver API flows
    { id: 0, path: "M 430 94 L 520 94", label: "Driver→Mapbox" },
    { id: 1, path: "M 430 168 L 520 168", label: "Driver→Stripe" },
    { id: 2, path: "M 620 168 L 700 168 L 700 260", label: "Stripe→Webhook→Kafka" },

    // Rider API flows
    { id: 3, path: "M 310 500 L 500 500 L 500 330", label: "Rider→Event Bus" },

    // Event Bus to services
    { id: 4, path: "M 810 312 L 920 312", label: "Kafka→Spark" },
    { id: 5, path: "M 1020 312 L 1140 312 L 1140 220", label: "Spark→Redis" },

    // Pricing API flows
    { id: 6, path: "M 820 312 L 920 312 L 920 120", label: "Kafka→Pricing" },
    { id: 7, path: "M 1020 120 L 1140 120 L 1140 180", label: "Pricing→Redis" },

    // Database flows
    { id: 8, path: "M 310 500 L 500 500", label: "API→Database" },

    // Driver API (right side) flows
    { id: 9, path: "M 1010 460 L 1200 460", label: "Driver API→Rides API" },
    { id: 10, path: "M 1200 490 L 1350 490", label: "Rides→ETA Service" },
    { id: 11, path: "M 1200 580 L 1310 610", label: "Rides→Matching" },
  ];

  return (
    <div className="diagram-preview">
      <div className="diagram-wrapper">
        <img
          src={imageSrc}
          alt="Distributed System Architecture"
          className="diagram-bg"
        />

        {/* Animated SVG Overlay */}
        <svg className="diagram-svg-overlay" viewBox="0 0 1500 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="glow-preview">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <radialGradient id="packetGradient">
              <stop offset="0%" stopColor="#c4ff00" stopOpacity="1"/>
              <stop offset="50%" stopColor="#c4ff00" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#c4ff00" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* Animated Data Packets following exact arrow paths */}
          {dataFlows.map((flow, index) => (
            <g key={flow.id}>
              {/* Show flowing data packet on active flow */}
              {activeFlow === index && (
                <>
                  {/* Trail effect */}
                  <motion.circle
                    r="8"
                    fill="url(#packetGradient)"
                    filter="url(#glow-preview)"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.4, 0.4, 0],
                      offsetDistance: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "linear",
                    }}
                    style={{
                      offsetPath: `path('${flow.path}')`,
                    }}
                  />

                  {/* Main data packet */}
                  <motion.circle
                    r="5"
                    fill="#c4ff00"
                    filter="url(#glow-preview)"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      offsetDistance: ["0%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "linear",
                    }}
                    style={{
                      offsetPath: `path('${flow.path}')`,
                    }}
                  />

                  {/* Highlight the path being used */}
                  <motion.path
                    d={flow.path}
                    stroke="#c4ff00"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "linear" }}
                  />
                </>
              )}
            </g>
          ))}

          {/* Pulsing Service Nodes */}
          {/* Kafka Event Bus */}
          <motion.circle
            cx="680" cy="312" r="30"
            fill="none"
            stroke="#c4ff00"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0.2 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            filter="url(#glow-preview)"
          />

          {/* Redis */}
          <motion.circle
            cx="1180" cy="190" r="25"
            fill="none"
            stroke="#c4ff00"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0.2 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
            filter="url(#glow-preview)"
          />

          {/* Spark */}
          <motion.circle
            cx="970" cy="312" r="28"
            fill="none"
            stroke="#c4ff00"
            strokeWidth="2"
            initial={{ scale: 0.8, opacity: 0.2 }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            filter="url(#glow-preview)"
          />

          {/* Database Shards - Pulsing effect */}
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={`db-shard-${i}`}
              x={560 + i * 120}
              y={460}
              width="90"
              height="60"
              fill="none"
              stroke="#c4ff00"
              strokeWidth="1.5"
              rx="4"
              initial={{ opacity: 0.1 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default DiagramPreview;
