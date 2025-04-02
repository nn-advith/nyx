import { useEffect, useState } from "react";
import "./App.css";
import { EditProject, EditTask, LoadFromDB } from "../wailsjs/go/main/App";

import { LogInfo, LogError } from "../wailsjs/runtime/runtime";
import { DeleteProject } from "../wailsjs/go/main/App";

import TitleBar from "./components/TitleBar";
import ControlPanel from "./components/ControlPanel";
import ProjectView from "./components/ProjectView";
import ProjectForm from "./components/ProjectForm";
import ProjectTaskForm from "./components/ProjectTaskForm";
import DeleteConfirmForm from "./components/DeleteConfirmForm";
import EditTaskForm from "./components/EditTaskForm";
import EditProjectForm from "./components/EditProjectForm";

function App() {
  const [projectList, setProjectList] = useState([]);

  const [taskCount, setTaskCount] = useState({
    pending: 0,
    ongoing: 0,
    completed: 0,
  });

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deleteRefName, setDeleteRefName] = useState(null);

  const [showEditTaskForm, setShowEditTaskForm] = useState(false);
  const [showEditProjectForm, setShowEditProjectForm] = useState(false);
  const [updateTaskDetails, setUpdateTaskDetails] = useState({
    tid: "",
    name: "",
    status: "",
    deadline: "",
  });
  const [updateProjectDetails, setUpdateProjectDetails] = useState({
    name: "",
    pid: "",
  });

  const [projectId, setProjectId] = useState(null);

  const loadFromDB = () => {
    LoadFromDB()
      .then((e) => {
        var jsondata = JSON.parse(e);
        setProjectList(jsondata.projectlist);
      })
      .catch((err) => LogError(err));
  };

  const updateTaskCount = () => {
    let newcounts = {
      pending: 0,
      ongoing: 0,
      completed: 0,
    };

    projectList.forEach((i) => {
      i["tasklist"].forEach((j) => {
        newcounts[j.status] += 1;
      });
    });

    setTaskCount(newcounts);
  };

  const deleteProject = () => {
    //call delete on wails backend

    DeleteProject(projectId)
      .then(() => {
        loadFromDB();
      })
      .catch((err) => LogError(err));
  };

  const editTask = () => {
    EditTask(
      updateTaskDetails["tid"],
      updateTaskDetails["name"],
      updateTaskDetails["status"],
      updateTaskDetails["deadline"]
    )
      .then(() => {
        loadFromDB();
        setShowEditTaskForm(false);
      })
      .catch((err) => LogError(err));
  };

  const editProject = () => {
    EditProject(updateProjectDetails["pid"], updateProjectDetails["name"])
      .then(() => {
        loadFromDB();
        setShowEditProjectForm(false);
      })
      .catch((err) => LogError(err));
  };

  const showPF = () => {
    setShowProjectForm(true);
  };

  useEffect(() => {
    loadFromDB();
    const interval = setInterval(() => {
      loadFromDB();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateTaskCount();
  }, [projectList]);

  return (
    <div id="app" className="app" onContextMenu={(e) => e.preventDefault()}>
      <TitleBar />
      <ControlPanel showPF={showPF} />
      <ProjectView
        projectList={projectList}
        loadFromDB={loadFromDB}
        setProjectId={setProjectId}
        setShowTaskForm={setShowTaskForm}
        taskCount={taskCount}
        setShowDeleteForm={setShowDeleteForm}
        setDeleteRefName={setDeleteRefName}
        setShowEditTaskForm={setShowEditTaskForm}
        setUpdateTaskDetails={setUpdateTaskDetails}
        setUpdateProjectDetails={setUpdateProjectDetails}
        setShowEditProjectForm={setShowEditProjectForm}
      />
      <ProjectForm
        showProjectForm={showProjectForm}
        setShowProjectForm={setShowProjectForm}
        loadFromDB={loadFromDB}
      />
      <ProjectTaskForm
        setShowTaskForm={setShowTaskForm}
        showTaskForm={showTaskForm}
        setProjectId={setProjectId}
        pid={projectId}
        loadFromDB={loadFromDB}
      />
      <DeleteConfirmForm
        setShowDeleteForm={setShowDeleteForm}
        showDeleteForm={showDeleteForm}
        deleteRefName={deleteRefName}
        setDeleteRefName={setDeleteRefName}
        deleteProject={deleteProject}
        setProjectId={setProjectId}
      />
      <EditTaskForm
        showEditTaskForm={showEditTaskForm}
        setShowEditTaskForm={setShowEditTaskForm}
        editTask={editTask}
        updateTaskDetails={updateTaskDetails}
        setUpdateTaskDetails={setUpdateTaskDetails}
      />
      <EditProjectForm
        showEditProjectForm={showEditProjectForm}
        setShowEditProjectForm={setShowEditProjectForm}
        editProject={editProject}
        updateProjectDetails={updateProjectDetails}
        setUpdateProjectDetails={setUpdateProjectDetails}
      />
    </div>
  );
}

export default App;
