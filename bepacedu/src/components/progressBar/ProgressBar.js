import React from "react";
import classes from "./progress.module.css";
const ProgressBar = (props) => {
  const { progress } = props;

  console.log(progress);
  return (
    <div className={classes.mainProgress}>
      <div className={classes.progress}>
        <div
          style={{
            backgroundColor:
              progress > 1 && progress < 30
                ? "red"
                : "yellow" && progress >= 30 && progress <= 60
                ? "yellow"
                : "orange" && progress > 60 && progress <= 80
                ? "orange"
                : "green",
            width: `${progress}%`,
            maxWidth: "100%",
            borderRadius: 8,
          }}
          className={classes.bar}
        >
          {progress > 0 && (
            <small
              style={{
                color:
                  progress > 1 && progress < 30
                    ? "white"
                    : "black" && progress >= 30 && progress <= 60
                    ? "black"
                    : "green" && progress > 60 && progress <= 80
                    ? "green"
                    : "white",
                textAlign: "center",
                alignSelf: "center",
              }}
              className={classes.progressData}
            >
              {progress}%
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
