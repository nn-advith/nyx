import { useEffect, useState } from "react";
import "./App.css";
import { LoadFromDB } from "../wailsjs/go/main/App";

import { LogInfo, LogError } from "../wailsjs/runtime/runtime";
import { DeleteProject } from "../wailsjs/go/main/App";

import TitleBar from "./components/TitleBar";
import ControlPanel from "./components/ControlPanel";
import ProjectView from "./components/ProjectView";
import ProjectForm from "./components/ProjectForm";
import ProjectTaskForm from "./components/ProjectTaskForm";
import DeleteConfirmForm from "./components/DeleteConfirmForm";

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

  const showPF = () => {
    setShowProjectForm(true);
  };

  useEffect(() => {
    loadFromDB();
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
    </div>
  );
}

export default App;
