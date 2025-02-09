import React, { useState, useRef, useEffect } from "react";

const DeleteConfirmForm = ({
  showDeleteForm,
  setShowDeleteForm,
  deleteRefName,
  setDeleteRefName,
  deleteProject,
  setProjectId,
}) => {
  const [name, setName] = useState("");
  const [confirmError, setConfirmError] = useState(false);
  const wrapper = useRef();

  const handleDeleteConfirm = () => {
    if (name !== deleteRefName) {
      setConfirmError(true);
      return;
    } else {
      deleteProject();
      setConfirmError(false);
      setDeleteRefName(null);
      setProjectId(null);
      setName("");
      setShowDeleteForm(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapper.current &&
        !wrapper.current.contains(e.target) &&
        !document.getElementById("title-bar").contains(e.target)
      ) {
        setShowDeleteForm(false);
        setName("");
        setConfirmError(false);
        setDeleteRefName(null);
        setProjectId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDeleteForm]);

  return (
    <>
      {showDeleteForm ? (
        <div className="project-form">
          <div className="pf-blur"></div>
          <div className="pf-wrapper" ref={wrapper}>
            <div className="pf-info-message">
              Are you sure you want to delete Project &nbsp;
              <span style={{ fontWeight: "700" }}>{deleteRefName}</span>&nbsp;?
              Input project name to confirm.
            </div>
            <input
              type="text"
              placeholder=""
              value={name}
              className="pf-input"
              onChange={(e) => setName(e.target.value)}
            />

            <div
              className={
                confirmError ? "pf-error-message" : "pf-error-message hidden"
              }
            >
              Name mismatch
            </div>

            <div className="pf-button danger" onClick={handleDeleteConfirm}>
              Delete
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DeleteConfirmForm;
