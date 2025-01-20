import React from "react";
import "../App.css";

import MinIcon from "../assets/icons/window-minimize-regular.svg";
import MaxIcon from "../assets/icons/expand-solid.svg";
import CloseIcon from "../assets/icons/xmark-solid.svg";

import {
  Quit,
  WindowToggleMaximise,
  WindowMinimise,
} from "../../wailsjs/runtime/runtime";

const TitleBar = () => {
  return (
    <>
      <div className="title-bar draggable">
        <div className="title-name">Nyx</div>
        <div className="window-controls">
          <div className="window-icon minimize" onClick={WindowMinimise}>
            <img src={MinIcon} width={15} height={20} />
          </div>
          <div className="window-icon maximize" onClick={WindowToggleMaximise}>
            <img src={MaxIcon} width={15} height={15} />
          </div>
          <div className="window-icon terminate-icon" onClick={Quit}>
            <img src={CloseIcon} width={15} height={15} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TitleBar;
