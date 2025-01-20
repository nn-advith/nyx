import { useEffect, useState } from "react";
import "./App.css";
import { LoadFromDB } from "../wailsjs/go/main/App";

import { LogInfo, LogError } from "../wailsjs/runtime/runtime";

import TitleBar from "./components/TitleBar";
import ControlPanel from "./components/ControlPanel";
import ProjectView from "./components/ProjectView";

function App() {
  // const [resultText, setResultText] = useState("Please enter your name below 👇");
  const [projectList, setProjectList] = useState([]);

  // const [name, setName] = useState('');
  // const updateName = (e: any) => setName(e.target.value);
  // const updateResultText = (result: string) => setResultText(result);

  const loadFromDB = () => {
    LoadFromDB()
      .then((e) => {
        var jsondata = JSON.parse(e);
        LogInfo("This is a test" + jsondata.projectlist.length);
        setProjectList(jsondata.projectList);
      })
      .catch((err) => LogError(err));
  };

  useEffect(() => {
    loadFromDB();
  }, []);

  return (
    <div id="app" className="app">
      <TitleBar />
      <ControlPanel />
      <ProjectView projectList={projectList} />
    </div>
  );
}

export default App;
