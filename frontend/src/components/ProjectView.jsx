import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import Project from "./Project";
import Legend from "./Legend";
import { LogInfo } from "../../wailsjs/runtime/runtime";

const ProjectView = ({
  projectList,
  loadFromDB,
  setProjectId,
  setShowTaskForm,
  taskCount,
  setShowDeleteForm,
  setDeleteRefName,
  setShowEditTaskForm,
  setUpdateTaskDetails,
}) => {
  const contentRef = useRef();

  const [menuOpenIn, setMenuOpenIn] = useState(null);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const scrollTop = contentRef.current.scrollTop;
        setScrolled(scrollTop > 40); // Change 100 to your desired scroll distance
      }
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="project-view" ref={contentRef}>
        <Legend scrolled={scrolled} taskCount={taskCount} />

        {/* dynamically populate projects */}
        {projectList.length > 0 ? (
          projectList.map((i, index) => (
            <Project
              project={i}
              loadFromDB={loadFromDB}
              setProjectId={setProjectId}
              setShowTaskForm={setShowTaskForm}
              setShowDeleteForm={setShowDeleteForm}
              setDeleteRefName={setDeleteRefName}
              menuOpenIn={menuOpenIn}
              setMenuOpenIn={setMenuOpenIn}
              setShowEditTaskForm={setShowEditTaskForm}
              setUpdateTaskDetails={setUpdateTaskDetails}
            />
          ))
        ) : (
          <div style={{ fontSize: "0.8rem", opacity: "0.5" }}>
            No projects yet. Create one. Now.
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectView;
