import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./admin.module.css";
import classes from "./course.module.css";
import CourseAddition from "./CourseAddition";

import * as coursesActions from "../../store/courses/coursesActions";

import LessCourseData from "./LessCourseData";

const CoursesData = (props) => {
  const { color } = useLocation().state;

  const { courses } = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(coursesActions.getCourses());
  }, [dispatch]);

  const [addCourse, setAddCourse] = useState(false);

  return (
    <div className={classes.courseContainer}>
      <div className={classes.buttonContainer}>
        <button
          className={styles.additionBtn}
          onClick={() => setAddCourse(true)}
        >
          +Add New Course
        </button>
      </div>
      <div className={addCourse ? classes.courseModal : classes.removeModal}>
        <CourseAddition add={addCourse} close={() => setAddCourse(false)} />
      </div>
      {courses && courses.length > 0 && (
        <div className={classes.courseShow}>
          {courses && courses.length > 0 && (
            <div className={classes.courseShowContainer}>
              {courses.map((c, i) => {
                return (
                  <div className={classes.singleCourse} key={i}>
                    <LessCourseData course={c} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoursesData;
