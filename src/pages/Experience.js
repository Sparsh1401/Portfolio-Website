import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import "../styles/Experience.css";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";
import { motion } from "framer-motion";

function Experience() {
  return (
    <div className="experience">
      <motion.h1
        className="experience-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Experience & Education
      </motion.h1>

      <VerticalTimeline lineColor="rgba(102, 126, 234, 0.4)">
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Sep 2023 - Present"
          iconStyle={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff" }}
          icon={<WorkIcon />}
          contentStyle={{
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            color: "#cbd5e1"
          }}
          contentArrowStyle={{ borderRight: "7px solid rgba(30, 41, 59, 0.8)" }}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#0ea5e9", fontWeight: "700" }}>
            Software Developer - 2
          </h3>
          <h4 className="vertical-timeline-element-subtitle" style={{ color: "#667eea", fontWeight: "600" }}>
            Wingify Software Pvt. Ltd - Remote
          </h4>
          <h5 style={{ color: "#94a3b8", marginTop: "0.5rem", fontSize: "0.9rem" }}>
            Backend and Data Platform Engineering
          </h5>
          <ul style={{ marginTop: "1rem", lineHeight: "1.8" }}>
            <li>Led development of real-time analytics system handling 50M+ daily events, reducing recording time by 67% through ClickHouse optimization</li>
            <li>Engineered analytics interconnectivity system consolidating 3 APIs, enabling 35-step user journey analysis</li>
            <li>Architected data deduplication platform handling 2TB+ daily data using BigTable and Kafka Streams with 99.99% accuracy</li>
            <li>Optimized VM configurations for PostgreSQL and Kafka, accelerating data processing by 40% and reducing latency by 60%</li>
            <li>Implemented GraphQL and Cassandra for 15+ critical APIs, achieving 20% faster data retrieval</li>
            <li>Built trigger system using custom DSL handling 10K+ rules/sec with 99.95% uptime</li>
          </ul>
          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {["Python", "Java", "Spring Boot", "ClickHouse", "PostgreSQL", "Kafka", "GCP", "Docker"].map(tech => (
              <span key={tech} style={{
                padding: "0.25rem 0.75rem",
                background: "rgba(14, 165, 233, 0.2)",
                border: "1px solid rgba(14, 165, 233, 0.3)",
                borderRadius: "1rem",
                fontSize: "0.85rem",
                color: "#0ea5e9"
              }}>
                {tech}
              </span>
            ))}
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Aug 2019 - Jul 2023"
          iconStyle={{ background: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)", color: "#fff" }}
          icon={<SchoolIcon />}
          contentStyle={{
            background: "rgba(30, 41, 59, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            color: "#cbd5e1"
          }}
          contentArrowStyle={{ borderRight: "7px solid rgba(30, 41, 59, 0.8)" }}
        >
          <h3 className="vertical-timeline-element-title" style={{ color: "#0ea5e9", fontWeight: "700" }}>
            Bachelor of Engineering in Information Science
          </h3>
          <h4 className="vertical-timeline-element-subtitle" style={{ color: "#667eea", fontWeight: "600" }}>
            Dayanand Sagar Academy of Technology and Management
          </h4>
          <h4 className="vertical-timeline-element-subtitle" style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
            Bengaluru, India
          </h4>
          <p style={{ marginTop: "1rem", fontWeight: "500" }}>CGPA: 8.5/10.0</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}

export default Experience;
