import React from "react";
import "../App.css";

const ProjectView = () => {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1];
  return (
    <>
      <div className="project-view">
        {/* dynamically populate projects */}
        {nums.map((i, index) => (
          <div className="project" key={index}>
            <div className="project-info-bar">
              <div className="project-name">Project </div>
              <div className="project-controls">Edit</div>
            </div>
            <div className="task-section">
              <div className="task-column">
                {/* dynamically populate tasks */}
              </div>
              <div className="task-column"></div>
              <div className="task-column"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProjectView;
