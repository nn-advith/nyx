import React, { useRef, useEffect } from "react";

const EditProjectForm = ({
  showEditProjectForm,
  setShowEditProjectForm,
  editProject,
  updateProjectDetails,
  setUpdateProjectDetails,
}) => {
  const wrapper = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapper.current &&
        !wrapper.current.contains(e.target) &&
        !document.getElementById("title-bar").contains(e.target)
      ) {
        setShowEditProjectForm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditProjectForm]);

  return (
    <>
      {showEditProjectForm ? (
        <div className="project-form">
          <div className="pf-blur"></div>
          <div className="pf-wrapper" ref={wrapper}>
            <div className="pf-info-message">Edit Task</div>
            <input
              type="text"
              placeholder="Enter Task name"
              value={updateProjectDetails["name"]}
              className="pf-input"
              onChange={(e) => {
                setUpdateProjectDetails((p) => {
                  const old = { ...p };
                  old["name"] = e.target.value;

                  return old;
                });
              }}
            />

            <div className="pf-button" onClick={editProject}>
              Edit
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default EditProjectForm;
