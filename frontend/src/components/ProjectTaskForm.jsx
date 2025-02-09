import React, { useState, useRef, useEffect } from "react";
import { CreateNewTask } from "../../wailsjs/go/main/App";

const ProjectTaskForm = ({
  showTaskForm,
  setShowTaskForm,
  pid,
  loadFromDB,
  setProjectId,
}) => {
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState(
    new Date().toLocaleDateString("en-CA")
  );

  const wrapper = useRef();

  const createNewTask = () => {
    CreateNewTask(pid, name, deadline)
      .then(() => {
        setShowTaskForm(false);
        setName("");
        setDeadline(new Date().toLocaleDateString("en-CA"));
        setProjectId(null);
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapper.current &&
        !wrapper.current.contains(e.target) &&
        !document.getElementById("title-bar").contains(e.target)
      ) {
        setShowTaskForm(false);
        setName("");
        setDeadline(new Date().toLocaleDateString("en-CA"));
        setProjectId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showTaskForm]);

  return (
    <>
      {showTaskForm ? (
        <div className="project-form">
          <div className="pf-blur"></div>
          <div className="pf-wrapper" ref={wrapper}>
            <input
              type="text"
              placeholder="Enter Task name"
              value={name}
              className="pf-input"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              placeholder="Deadline"
              value={deadline}
              className="pf-input"
              onChange={(e) => setDeadline(e.target.value)}
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
