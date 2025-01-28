import { useEffect, useState } from "react";
import "./App.css";
import { LoadFromDB } from "../wailsjs/go/main/App";

import { LogInfo, LogError } from "../wailsjs/runtime/runtime";

import TitleBar from "./components/TitleBar";
import ControlPanel from "./components/ControlPanel";
import ProjectView from "./components/ProjectView";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [projectList, setProjectList] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

  const loadFromDB = () => {
    LoadFromDB()
      .then((e) => {
        var jsondata = JSON.parse(e);
        setProjectList(jsondata.projectlist);
      })
      .catch((err) => LogError(err));
  };

  const showPF = () => {
    setShowProjectForm(true);
  };

  useEffect(() => {
    loadFromDB();
  }, []);

  return (
    <div id="app" className="app">
      <TitleBar />

      <ControlPanel showPF={showPF} />
      <ProjectView projectList={projectList} loadFromDB={loadFromDB} />
      <ProjectForm
        showProjectForm={showProjectForm}
        setShowProjectForm={setShowProjectForm}
        loadFromDB={loadFromDB}
      />
    </div>
  );
}

export default App;
