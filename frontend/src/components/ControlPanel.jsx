import React from "react";
import "../App.css";

const ControlPanel = () => {
  return (
    <>
      <div className="control-panel">
        <div className="workspace-name">Workspace</div>
        <div className="control-ops">
          <div className="cp-button">Create</div>
          <div className="cp-filter-section"></div>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
