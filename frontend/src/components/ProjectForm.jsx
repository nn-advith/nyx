import React, { useState, useRef, useEffect } from "react";
import { CreateNewProject } from "../../wailsjs/go/main/App";

const ProjectForm = ({ showProjectForm, setShowProjectForm, loadFromDB }) => {
  const wrapperRef = useRef();

  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("31-03-2025");

  const createNewProject = () => {
    // showPF();
    CreateNewProject(name, deadline)
      .then(() => {
        setShowProjectForm(false);
        setName("");
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        !document.getElementById("title-bar").contains(event.target)
      ) {
        setShowProjectForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProjectForm]);

  return (
    <>
      {showProjectForm ? (
        <div className="project-form">
          <div className="pf-blur"></div>
          <div className="pf-wrapper" ref={wrapperRef}>
            <input
              type="tezt"
              placeholder="Enter project name"
              value={name}
              className="pf-input"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="pf-button" onClick={createNewProject}>
              Create
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProjectForm;
