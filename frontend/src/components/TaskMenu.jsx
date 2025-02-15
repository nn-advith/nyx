import React, { useRef, useEffect, useState } from "react";

const TaskMenu = ({
  task,
  setShowCMenu,
  menuOpenIn,
  tid,
  showCMenu,
  cMenuX,
  cMenuY,
  handleDelete,
  setShowEditTaskForm,
  setUpdateTaskDetails,
}) => {
  const menuRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    return () => {
      const handleClickOutside = (e) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target) &&
          !document.getElementById("title-bar").contains(e.target)
        ) {
          setShowCMenu(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    };
  }, [showCMenu]);

  return (
    <>
      {menuOpenIn === tid && showCMenu && (
        <div
          ref={menuRef}
          className="task-menu"
          style={{
            top: `${cMenuY}px`,
            left: `${cMenuX}px`,
            //   opacity: menuOpenIn === tid && showCMenu ? "1" : "0",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setShowCMenu(false);
          }}
        >
          <div
            className="task-menu-item bb"
            onClick={() => {
              setShowEditTaskForm(true);
              setUpdateTaskDetails({
                tid: task.tid,
                name: task.name,
                status: task.status,
                deadline: task.deadline,
              });
            }}
          >
            Edit
          </div>
          {!showConfirm ? (
            <div
              className="task-menu-item "
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
            >
              Delete
            </div>
          ) : (
            <div
              className="task-menu-item "
              style={{ backgroundColor: "red" }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(tid);
                setShowCMenu(false);
                setShowConfirm(false);
              }}
            >
              Confirm?
            </div>
          )}
          {/* <div className="task-menu-item bt">Something</div> */}
        </div>
      )}
    </>
  );
};

export default TaskMenu;
