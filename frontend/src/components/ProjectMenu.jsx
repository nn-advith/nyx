import React, { useState } from "react";

import { FaRegEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";

const ProjectMenu = ({ deleteProject, setShowTaskForm, pid, setProjectId }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="menu-wrapper">
        <div className={menuOpen ? "menu-buttons" : "menu-buttons-closed"}>
          <div className="menu-button-item">
            <FaRegEdit />
          </div>
          <div
            className="menu-button-item"
            onClick={() => {
              setShowTaskForm(true);
              setProjectId(pid);
            }}
          >
            <IoMdAdd style={{ transform: "scale(1.4)" }} />
          </div>
          <div
            className="menu-button-item"
            onClick={() => {
              deleteProject();
              setMenuOpen(false);
            }}
          >
            <MdDeleteOutline style={{ transform: "scale(1.2)" }} />
          </div>
        </div>
        <div
          className={menuOpen ? "menu-control" : "menu-control-closed"}
          onClick={() => setMenuOpen(!menuOpen)}
        ></div>
      </div>
    </>
  );
};

export default ProjectMenu;
