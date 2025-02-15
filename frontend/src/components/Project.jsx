import React, { useEffect, useState } from "react";
import "../App.css";

import { LogError, LogInfo } from "../../wailsjs/runtime";
import { DeleteProject, CreateNewTask } from "../../wailsjs/go/main/App";
import TaskSection from "./TaskSection";
import ProjectTaskForm from "./ProjectTaskForm";
import ProjectMenu from "./ProjectMenu";

const Project = ({
  project,
  loadFromDB,
  setShowTaskForm,
  setProjectId,
  setShowDeleteForm,
  setDeleteRefName,
  menuOpenIn,
  setMenuOpenIn,
  setShowEditTaskForm,
  setUpdateTaskDetails,
}) => {
  // const [showTaskForm, setShowTaskForm] = useState(false);

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
      <div className="project" key={project.pid}>
        <div className="project-info-bar">
          <div className="project-name">{project.name}</div>
          <ProjectMenu
            deleteProject={deleteProject}
            setShowDeleteForm={setShowDeleteForm}
            setShowTaskForm={setShowTaskForm}
            pid={project.pid}
            setProjectId={setProjectId}
            setDeleteRefName={setDeleteRefName}
            pname={project.name}
          />
        </div>
        <TaskSection
          taskList={project.tasklist}
          pid={project.pid}
          loadFromDB={loadFromDB}
          menuOpenIn={menuOpenIn}
          setMenuOpenIn={setMenuOpenIn}
          setShowEditTaskForm={setShowEditTaskForm}
          setUpdateTaskDetails={setUpdateTaskDetails}
        />
      </div>
    </>
  );
};

export default Project;
