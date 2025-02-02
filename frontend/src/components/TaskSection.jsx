import React, { useEffect, useState } from "react";
import Task from "./Task";
import { LogError, LogInfo } from "../../wailsjs/runtime/runtime";
import { UpdateTaskState } from "../../wailsjs/go/main/App";

const TaskSection = ({ taskList, pid, loadFromDB }) => {
  const [zones, setZones] = useState({
    pending: [], //populate based on json data, all 3 zones
    ongoing: [],
    completed: [],
  });

  const handleDragStart = (event, item, fromZone) => {
    event.dataTransfer.setData("item", item);
    event.dataTransfer.setData("fromZone", fromZone);
  };

  const handleDrop = (event, toZone) => {
    event.preventDefault();

    const item = event.dataTransfer.getData("item");
    const fromZone = event.dataTransfer.getData("fromZone");

    if (!item || fromZone === toZone) return;

    //call state update function

    UpdateTaskState(item, toZone)
      .then(() => {
        setZones((prev) => {
          //remove from fromZone and add to toZone
          const newZones = { ...prev };

          const taskToMove = prev[fromZone].find((t) => t.tid === item);

          newZones[fromZone] = newZones[fromZone].filter((t) => t.tid !== item);
          newZones[toZone] = [...newZones[toZone], taskToMove];

          return newZones;
        });
      })
      .catch((err) => LogError(err));
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const newZones = taskList.reduce(
      (acc, task) => {
        acc[task.status] = [...(acc[task.status] || []), task];
        return acc;
      },
      { pending: [], ongoing: [], completed: [] }
    );

    setZones(newZones);
  }, [taskList]);

  return (
    <>
      <div className="task-section">
        {Object.keys(zones).map((zone, index) => (
          <div
            key={index}
            className="task-column"
            onDragOver={allowDrop}
            onDrop={(e) => handleDrop(e, zone)}
          >
            {zones[zone]?.map((task, index) => (
              <Task
                key={index}
                handleDragStart={handleDragStart}
                task={task}
                zone={zone}
                loadFromDB={loadFromDB}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskSection;
