import React from "react";
import "../App.css";

import { RiCloseLargeFill } from "react-icons/ri";
import { CgMaximize } from "react-icons/cg";
import { FaRegWindowMinimize } from "react-icons/fa6";

import {
  Quit,
  WindowToggleMaximise,
  WindowMinimise,
} from "../../wailsjs/runtime/runtime";

const TitleBar = () => {
  return (
    <>
      <div className="title-bar draggable" id="title-bar">
        <div className="title-name">Nyx</div>
        <div className="window-controls">
          <div className="window-icon minimize" onClick={WindowMinimise}>
            <FaRegWindowMinimize style={{ marginBottom: "10px" }} />
          </div>
          <div className="window-icon maximize" onClick={WindowToggleMaximise}>
            <CgMaximize />
          </div>
          <div className="window-icon terminate-icon" onClick={Quit}>
            <RiCloseLargeFill />
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleBar;
