import { useEffect, useState } from "react";
import "./App.css";
import { LoadFromDB } from "../wailsjs/go/main/App";

import { LogInfo, LogError } from "../wailsjs/runtime/runtime";

import TitleBar from "./components/TitleBar";
import ControlPanel from "./components/ControlPanel";
import ProjectView from "./components/ProjectView";
import ProjectForm from "./components/ProjectForm";
import ProjectTaskForm from "./components/ProjectTaskForm";

function App() {
  const [projectList, setProjectList] = useState([]);

  const [taskCount, setTaskCount] = useState({
    pending: 0,
    ongoing: 0,
    completed: 0,
  });

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

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
    </div>
  );
}

export default App;
