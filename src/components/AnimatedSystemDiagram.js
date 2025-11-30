import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/AnimatedSystemDiagram.css";

const AnimatedSystemDiagram = ({ imageSrc }) => {
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Data flow paths configuration
  const dataFlows = [
    // Driver API flow
    {
      id: 0,
      path: "M 360 200 L 570 200",
      label: "Driver → Mapbox",
      color: "#00d4ff"
    },
    {
      id: 1,
      path: "M 360 240 L 570 240 L 700 240",
      label: "Driver → Stripe",
      color: "#635bff"
    },
    {
      id: 2,
      path: "M 700 240 L 700 310 L 680 310",
      label: "Stripe → Kafka",
      color: "#635bff"
    },
    // Rider API flow
    {
      id: 3,
      path: "M 360 500 L 680 500 L 680 330",
      label: "Rider → Event Bus",
      color: "#ff6b6b"
    },
    // Event Bus to Services
    {
      id: 4,
      path: "M 680 310 L 920 310 L 920 180",
      label: "Kafka → Pricing API",
      color: "#ffd93d"
    },
    {
      id: 5,
      path: "M 920 310 L 970 400",
      label: "Event Bus → Spark",
      color: "#ee5a6f"
    },
  ];

  // Pulse animations for services
  const serviceNodes = [
    { id: "mapbox", x: 570, y: 95, label: "Mapbox" },
    { id: "stripe", x: 570, y: 170, label: "Stripe" },
    { id: "kafka", x: 680, y: 310, label: "Kafka" },
    { id: "spark", x: 970, y: 310, label: "Spark" },
    { id: "redis", x: 1140, y: 190, label: "Redis" },
    { id: "pricing", x: 975, y: 80, label: "Pricing" },
  ];

  return (
    <div className="animated-system-diagram">
      <motion.div
        className="diagram-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Background Image */}
        <img
          src={imageSrc}
          alt="Distributed System Architecture"
          className="system-diagram-bg"
        />

        {/* SVG Overlay for Animations */}
        <svg className="animation-overlay" viewBox="0 0 1500 800">
          <defs>
            {/* Gradient for data flow */}
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Animated Data Flows */}
          {dataFlows.map((flow, index) => (
            <g key={flow.id}>
              {/* Base path */}
              <motion.path
                d={flow.path}
                stroke={flow.color}
                strokeWidth="3"
                fill="none"
                opacity="0.2"
              />

              {/* Animated flow */}
              <motion.circle
                r="6"
                fill={flow.color}
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeFlow === index ? [0, 1, 1, 0] : 0,
                  offsetDistance: activeFlow === index ? ["0%", "100%"] : "0%",
                }}
                transition={{
                  duration: 2,
                  repeat: activeFlow === index ? Infinity : 0,
                  ease: "linear",
                }}
                style={{
                  offsetPath: `path('${flow.path}')`,
                }}
              />
            </g>
          ))}

          {/* Pulsing Service Nodes */}
          {serviceNodes.map((node, index) => (
            <motion.g key={node.id}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="25"
                fill="rgba(0, 212, 255, 0.1)"
                stroke="#00d4ff"
                strokeWidth="2"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
              />
            </motion.g>
          ))}

          {/* Load Balancer Animation */}
          <motion.g>
            {/* Driver LB */}
            <motion.rect
              x="200"
              y="160"
              width="50"
              height="120"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2"
              rx="5"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Rider LB */}
            <motion.rect
              x="200"
              y="460"
              width="50"
              height="120"
              fill="none"
              stroke="#4ade80"
              strokeWidth="2"
              rx="5"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.g>

          {/* Database Sharding Animation */}
          <motion.g>
            {[0, 1, 2, 3].map((i) => (
              <motion.rect
                key={`shard-${i}`}
                x={530 + (i % 3) * 120}
                y={460 + Math.floor(i / 3) * 80}
                width="80"
                height="50"
                fill="none"
                stroke="#a78bfa"
                strokeWidth="2"
                rx="4"
                initial={{ opacity: 0.2 }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.g>

          {/* Redis Cache Pulse */}
          <motion.rect
            x="1095"
            y="155"
            width="90"
            height="70"
            fill="none"
            stroke="#ef4444"
            strokeWidth="3"
            rx="8"
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>

        {/* Floating Labels */}
        <div className="floating-labels">
          <motion.div
            className="flow-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: activeFlow >= 0 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="label-text">
              {dataFlows[activeFlow]?.label || "System Active"}
            </span>
          </motion.div>
        </div>

        {/* Stats Overlay */}
        <motion.div
          className="stats-overlay"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="stat-item">
            <motion.span
              className="stat-value"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              99.9%
            </motion.span>
            <span className="stat-label">Uptime</span>
          </div>
          <div className="stat-item">
            <motion.span
              className="stat-value"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              &lt;50ms
            </motion.span>
            <span className="stat-label">Latency</span>
          </div>
          <div className="stat-item">
            <motion.span
              className="stat-value"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              10K+
            </motion.span>
            <span className="stat-label">Requests/sec</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AnimatedSystemDiagram;
