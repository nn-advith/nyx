import React, { useEffect } from "react";
import "../App.css";

import { LogError, LogInfo } from "../../wailsjs/runtime";
import { DeleteProject } from "../../wailsjs/go/main/App";

const Project = ({ project, key, loadFromDB }) => {
  const deleteProject = () => {
    //call delete on wails backend

    DeleteProject(project.pid)
      .then(() => {
        LogInfo("YES");
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  return (
    <>
      <div className="project" key={key}>
        <div className="project-info-bar">
          <div className="project-name">{project.name}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="project-controls">Edit</div>
            <div className="project-controls">Add</div>
            <div className="project-delete" onClick={() => deleteProject()}>
              Delete
            </div>
          </div>
        </div>
        <div className="task-section">
          <div className="task-column">{/* dynamically populate tasks */}</div>
          <div className="task-column"></div>
          <div className="task-column"></div>
        </div>
      </div>
    </>
  );
};

export default Project;
