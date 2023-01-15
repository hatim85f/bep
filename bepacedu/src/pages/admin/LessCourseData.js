import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./course.module.css";
import DataCard from "./DataCard";

const LessCourseData = (props) => {
  const { course } = props;

  const navigate = useNavigate();
  return (
    <DataCard notShow>
      <div className={classes.internalDivContainer}>
        <div className={classes.dataContainer}>
          <div className={classes.imageContainer}>
            <img src={course.image} className={classes.logoImage} alt="logo" />
          </div>
          <div className={classes.data}>
            <strong> {course.name} </strong>
            <h3> ({course.abbreviation}) </h3>
          </div>
        </div>
        <div className={classes.objectivesContainer}>
          <p className={classes.dataParagraph}>
            {" "}
            {course.learningObjective.title}{" "}
          </p>
          <div className={classes.objectives}>
            <ul>
              {course.learningObjective.objectives.map((a, i) => {
                return <li key={i}> {a} </li>;
              })}
            </ul>
          </div>
        </div>
      </div>
      <p
        className={classes.anchor}
        onClick={() =>
          navigate("/admin/courses/course_details", { state: { course } })
        }
      >
        Learn more ...
      </p>
    </DataCard>
  );
};

export default LessCourseData;
