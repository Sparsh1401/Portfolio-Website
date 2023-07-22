import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import SchoolIcon from "@material-ui/icons/School";
import WorkIcon from "@material-ui/icons/Work";

function Experience() {
  return (
    <div className="experience">
      <VerticalTimeline lineColor="#3e497a">
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="2005-2019"
          iconStyle={{ background: "#3e497a", color: "#fff" }}
          icon={<SchoolIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            St Peter's College 
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Agra
          </h4>
          <p>School</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="Aug 2019- June 2023"
          iconStyle={{ background: "#3e497a", color: "#fff" }}
          icon={<SchoolIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            Dayanand Sagar College of Engineering
          </h3>

          <h4 className="vertical-timeline-element-subtitle">
            Bachelor's Degree
          </h4>
          <h4 className="vertical-timeline-element-subtitle">
            Begaluru
          </h4>
          <p> Computer Science</p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="Aug 2022 - Dec 2022"
          iconStyle={{ background: "#e9d35b", color: "#fff" }}
          icon={<WorkIcon />}
        >
          <h3 className="vertical-timeline-element-title">
            Software Devloper Intern - EDQI 
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            Hybrid - Bengaluru
          </h4>
          <p>Developed the backend infrastructure for 2 projects.</p>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
}

export default Experience;
