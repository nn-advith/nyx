import React, { useState } from "react";
import { CreateNewTask } from "../../wailsjs/go/main/App";

const ProjectTaskForm = ({
  showTaskForm,
  setShowTaskForm,
  pid,
  loadFromDB,
}) => {
  const [name, setName] = useState("");
  const [allotted, setAllotted] = useState(0);

  const createNewTask = () => {
    CreateNewTask(pid, name, allotted)
      .then(() => {
        setShowTaskForm(false);
        setName("");
        setAllotted(0);
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  return (
    <>
      {showTaskForm ? (
        <div className="project-form">
          <div className="pf-blur"></div>
          <div className="pf-wrapper">
            <input
              type="text"
              placeholder="Enter Task name"
              value={name}
              className="pf-input"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Allotted days"
              value={allotted}
              className="pf-input"
              onChange={(e) => setAllotted(Number(e.target.value))}
            />
            <div className="pf-button" onClick={createNewTask}>
              Add
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProjectTaskForm;
