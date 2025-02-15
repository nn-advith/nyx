import React, { useEffect, useState } from "react";
import { DeleteTask } from "../../wailsjs/go/main/App";
import { LogError, LogInfo } from "../../wailsjs/runtime/runtime";

import { taskStatusCode } from "../utils/common";
import TaskMenu from "./TaskMenu";

const Task = ({
  task,
  handleDragStart,
  zone,
  loadFromDB,
  menuOpenIn,
  setMenuOpenIn,
  setShowEditTaskForm,
  setUpdateTaskDetails,
}) => {
  const [showTask, setShowTask] = useState(false);
  const [statusDeadline, setStatusDeadline] = useState(null);

  const [showCMenu, setShowCMenu] = useState(false);
  const [cMenuX, setCMenuX] = useState(0);
  const [cMenuY, setCMenuY] = useState(0);

  const handleDelete = (tid) => {
    DeleteTask(tid)
      .then(() => {
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowCMenu(true);
    setMenuOpenIn(task.tid);

    setCMenuX(e.clientX - e.currentTarget.getBoundingClientRect().left);
    setCMenuY(e.clientY - e.currentTarget.getBoundingClientRect().top);
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
        onClick={() => {
          !showCMenu && setShowTask(!showTask);
          setShowCMenu(false);
          setMenuOpenIn(null);
        }}
        onDragStart={(e) => {
          handleDragStart(e, task.tid, zone);
        }}
        onContextMenu={handleContextMenu}
      >
        <div className="task-info">
          <div className="task-name">{task.name}</div>
          <div className={`task-status-circle ${statusDeadline || ""}`}></div>
        </div>
        <div className={showTask ? "task-text" : "task-text hidden"}>
          Deadline: {task.deadline.split("-").reverse().join("-")}
        </div>
        {/* <div
          style={{
            width: "30px",
            // height: "30px",
            position: "absolute",
            top: `${cMenuY}px`,
            left: `${cMenuX}px`,
            backgroundColor: "red",
            opacity: menuOpenIn === task.tid && showCMenu ? "1" : "0",
            // transition: "0.2s all ease",
            // zIndex: "6",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowCMenu(false);
          }}
        >
          <div>Edit</div>
          <div>Delete</div>
          <div>Something</div>
        </div> */}
        <TaskMenu
          setShowCMenu={setShowCMenu}
          menuOpenIn={menuOpenIn}
          showCMenu={showCMenu}
          cMenuX={cMenuX}
          cMenuY={cMenuY}
          tid={task.tid}
          handleDelete={handleDelete}
          setShowEditTaskForm={setShowEditTaskForm}
          setUpdateTaskDetails={setUpdateTaskDetails}
          task={task}
        />
      </div>
    </>
  );
};

export default Task;
