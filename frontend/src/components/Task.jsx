import React from "react";
import { DeleteTask } from "../../wailsjs/go/main/App";
import { LogError } from "../../wailsjs/runtime/runtime";

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
        onDragStart={(e) => handleDragStart(e, task.tid, zone)}
        onContextMenu={(e) => {
          e.preventDefault();
          handleDelete(task.tid);
        }}
      >
        {task.name}
      </div>
    </>
  );
};

export default Task;
