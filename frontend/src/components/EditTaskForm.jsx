import React, { useRef, useEffect } from "react";

const EditTaskForm = ({
  showEditTaskForm,
  setShowEditTaskForm,
  editTask,
  updateTaskDetails,
  setUpdateTaskDetails,
}) => {
  const wrapper = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapper.current &&
        !wrapper.current.contains(e.target) &&
        !document.getElementById("title-bar").contains(e.target)
      ) {
        setShowEditTaskForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditTaskForm]);
  return (
    <>
      {showEditTaskForm ? (
        <div className="project-form">
          <div className="pf-blur"></div>
          <div className="pf-wrapper" ref={wrapper}>
            <div className="pf-info-message">Edit Task</div>
            <input
              type="text"
              placeholder="Enter Task name"
              value={updateTaskDetails["name"]}
              className="pf-input"
              onChange={(e) => {
                setUpdateTaskDetails((p) => {
                  const old = { ...p };
                  old["name"] = e.target.value;

                  return old;
                });
              }}
            />
            <input
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              placeholder="Deadline"
              value={updateTaskDetails["deadline"]}
              className="pf-input"
              onChange={(e) => {
                setUpdateTaskDetails((p) => {
                  const old = { ...p };
                  old["deadline"] = e.target.value;

                  return old;
                });
              }}
            />

            <select
              className="pf-dropdown"
              value={updateTaskDetails["status"]}
              onChange={(e) => {
                setUpdateTaskDetails((p) => {
                  const old = { ...p };
                  old["status"] = e.target.value;

                  return old;
                });
              }}
            >
              <option value="pending">Pending</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>

            <div className="pf-button" onClick={editTask}>
              Edit
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditTaskForm;
