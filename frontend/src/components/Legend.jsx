import React from "react";

const Legend = ({ scrolled, taskCount }) => {
  return (
    <>
      <div className={scrolled ? "legend-simple" : "legend"}>
        <div className={scrolled ? "legend-bar-simple pending" : "legend-bar"}>
          <div className={scrolled ? "legend-text-simple" : "legend-text"}>
            To-do
          </div>
          <div
            className={
              scrolled
                ? "legend-counter-simple pending"
                : "legend-counter pending"
            }
          >
            {taskCount["pending"]}
          </div>
        </div>
        <div className={scrolled ? "legend-bar-simple ongoing" : "legend-bar"}>
          <div className={scrolled ? "legend-text-simple" : "legend-text"}>
            Ongoing
          </div>
          <div
            className={
              scrolled
                ? "legend-counter-simple ongoing"
                : "legend-counter ongoing"
            }
          >
            {taskCount["ongoing"]}
          </div>
        </div>
        <div
          className={scrolled ? "legend-bar-simple completed" : "legend-bar"}
        >
          <div className={scrolled ? "legend-text-simple" : "legend-text"}>
            Completed
          </div>
          <div
            className={
              scrolled
                ? "legend-counter-simple completed"
                : "legend-counter completed"
            }
          >
            {taskCount["completed"]}
          </div>
        </div>
      </div>
    </>
  );
};

export default Legend;
