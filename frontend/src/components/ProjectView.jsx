import React from "react";
import "../App.css";
import Project from "./Project";

const ProjectView = ({ projectList, loadFromDB }) => {
  return (
    <>
      <div className="project-view">
        {/* dynamically populate projects */}
        {projectList.length > 0 ? (
          projectList.map((i, index) => (
            <Project project={i} key={index} loadFromDB={loadFromDB} />
          ))
        ) : (
          <div>Add projects</div>
        )}
      </div>
    </>
  );
};

export default ProjectView;
