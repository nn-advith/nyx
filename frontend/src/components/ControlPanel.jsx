import React from "react";
import "../App.css";

const ControlPanel = ({ showPF }) => {
  return (
    <>
      <div className="control-panel">
        <div className="workspace-name">Workspace</div>
        <div className="control-ops">
          <div className="cp-button" onClick={showPF}>
            Create
          </div>
          <div className="cp-filter-section"></div>
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
