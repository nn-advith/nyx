import React, { useEffect, useState } from "react";
import "../App.css";

import { LogError, LogInfo } from "../../wailsjs/runtime";
import { DeleteProject, CreateNewTask } from "../../wailsjs/go/main/App";
import TaskSection from "./TaskSection";
import ProjectTaskForm from "./ProjectTaskForm";

const Project = ({ project, loadFromDB }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);

  const deleteProject = () => {
    //call delete on wails backend

    DeleteProject(project.pid)
      .then(() => {
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  return (
    <>
      <div className="project">
        <div className="project-info-bar">
          <div className="project-name">{project.name}</div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="project-controls">Edit</div>
            <div
              className="project-controls"
              onClick={() => setShowTaskForm(true)}
            >
              Add
            </div>
            <div className="project-delete" onClick={() => deleteProject()}>
              Delete
            </div>
          </div>
        </div>
        <TaskSection
          taskList={project.tasklist}
          pid={project.pid}
          loadFromDB={loadFromDB}
        />
        <ProjectTaskForm
          setShowTaskForm={setShowTaskForm}
          showTaskForm={showTaskForm}
          pid={project.pid}
          loadFromDB={loadFromDB}
        />
        {/* <div className="task-section">
          <div className="task-column"></div>
          <div className="task-column"></div>
          <div className="task-column"></div>
        </div> */}
      </div>
    </>
  );
};

export default Project;
