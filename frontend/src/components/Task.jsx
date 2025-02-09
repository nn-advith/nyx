import React from "react";
import { DeleteTask } from "../../wailsjs/go/main/App";
import { LogError, LogInfo } from "../../wailsjs/runtime/runtime";

const Task = ({ task, handleDragStart, zone, loadFromDB }) => {
  const handleDelete = (tid) => {
    DeleteTask(tid)
      .then(() => {
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  return (
    <>
      <div
        className="task-item"
        draggable
        onDragStart={(e) => {
          handleDragStart(e, task.tid, zone);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          handleDelete(task.tid);
        }}
      >
        <div className="task-name">{task.name}</div>

        <div className="task-status-circle"></div>
      </div>
    </>
  );
};

export default Task;
