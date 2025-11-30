import React from "react";
import { motion } from "framer-motion";
import AnimatedSystemDiagram from "../components/AnimatedSystemDiagram";
import "../styles/ProjectDisplay.css";

// Lyft/Uber distributed system architecture diagram
import systemDiagramImage from "../assets/uber-system-diagram.png";

function SystemArchitecture() {
  return (
    <motion.div
      className="project"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Distributed Ride-Sharing System Architecture</h1>

      <AnimatedSystemDiagram imageSrc={systemDiagramImage} />

      <motion.div
        className="architecture-details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <h2>System Components</h2>

        <div className="component-section">
          <h3>🚗 Driver API</h3>
          <p>
            Handles driver-side operations including location updates, trip management,
            and payment processing through Stripe integration.
          </p>
        </div>

        <div className="component-section">
          <h3>👥 Rider API</h3>
          <p>
            Manages rider requests, real-time ride matching, and ETA calculations
            through the distributed matching service.
          </p>
        </div>

        <div className="component-section">
          <h3>⚡ Event Bus (Kafka)</h3>
          <p>
            Central event streaming platform enabling real-time data flow between
            microservices with guaranteed delivery and fault tolerance.
          </p>
        </div>

        <div className="component-section">
          <h3>💰 Pricing API</h3>
          <p>
            Dynamic pricing engine using machine learning to optimize fare calculation
            based on demand, distance, and real-time market conditions.
          </p>
        </div>

        <div className="component-section">
          <h3>🗄️ Database Sharding</h3>
          <p>
            Horizontally partitioned database architecture distributing data across
            multiple nodes for improved performance and scalability.
          </p>
        </div>

        <div className="component-section">
          <h3>⚡ Redis Cache</h3>
          <p>
            In-memory data store providing sub-millisecond response times for
            frequently accessed data like driver locations and active rides.
          </p>
        </div>

        <div className="component-section">
          <h3>🔥 Apache Spark</h3>
          <p>
            Real-time analytics engine processing event streams for insights,
            anomaly detection, and predictive modeling.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default SystemArchitecture;
