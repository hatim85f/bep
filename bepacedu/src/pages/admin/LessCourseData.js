import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./course.module.css";
import DataCard from "./DataCard";

import { confirmAlert } from "react-confirm-alert";

import { MdDeleteSweep } from "react-icons/md";

import * as coursesActions from "../../store/courses/coursesActions";
import * as errorActions from "../../store/auth/authActions";

import { useDispatch, useSelector } from "react-redux";
import ErrorModal from "../../components/error/ErrorModal";
import AlertModal from "../../components/error/AlertModal";

const LessCourseData = (props) => {
  const { course } = props;

  const { error, errorMessage } = useSelector((state) => state.auth);

  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const deleteCourse = () => {
    dispatch(coursesActions.deleteCourse(course._id));
    dispatch(coursesActions.getCourses());

    console.log(course._id);
  };

  const showAlert = () => {
    setAlert(true);
  };

  const clearError = () => {
    dispatch(errorActions.clearError());
  };

  console.log(error);

  if (alert) {
    return (
      <AlertModal
        title="Warning"
        message="Are you sure you want to delete the Program ?"
        onConfirm={deleteCourse}
        onCancel={() => setAlert(false)}
      />
    );
  }

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  return (
    <DataCard notShow>
      <div className={classes.internalDivContainer}>
        <div className={classes.deleteContainer}>
          <MdDeleteSweep className={classes.icon} onClick={showAlert} />
        </div>
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
