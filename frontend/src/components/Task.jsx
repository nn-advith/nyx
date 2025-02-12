import React, { useEffect, useState } from "react";
import { DeleteTask } from "../../wailsjs/go/main/App";
import { LogError, LogInfo } from "../../wailsjs/runtime/runtime";

import { taskStatusCode } from "../utils/common";

const Task = ({ task, handleDragStart, zone, loadFromDB }) => {
  const [showTask, setShowTask] = useState(false);
  const [statusDeadline, setStatusDeadline] = useState(null);

  const handleDelete = (tid) => {
    DeleteTask(tid)
      .then(() => {
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  useEffect(() => {
    const n = taskStatusCode(task.deadline);
    if (n < 0) {
      setStatusDeadline("due");
    } else if (n == 0) {
      setStatusDeadline("today");
    } else if (n > 0 && n <= 2) {
      setStatusDeadline("soon");
    } else {
      setStatusDeadline("distant");
    }
    if (task.status === "completed") {
      setStatusDeadline("distant");
    }
  }, [task]);

  return (
    <>
      <div
        className={showTask ? "task-item" : "task-item"}
        draggable
        onClick={() => setShowTask(!showTask)}
        onDragStart={(e) => {
          handleDragStart(e, task.tid, zone);
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          handleDelete(task.tid);
          // taskStatusCode(task.deadline);
          // LogInfo(e.currentTarget.getBoundingClientRect().left);
          // LogInfo(e.clientX - e.currentTarget.getBoundingClientRect().left);
        }}
      >
        <div className="task-info">
          <div className="task-name">{task.name}</div>
          <div className={`task-status-circle ${statusDeadline || ""}`}></div>
        </div>
        <div className={showTask ? "task-text" : "task-text hidden"}>
          Deadline: {task.deadline.split("-").reverse().join("-")}
        </div>
      </div>
    </>
  );
};

export default Task;
