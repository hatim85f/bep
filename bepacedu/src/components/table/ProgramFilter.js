import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as coursesActions from "../../store/courses/coursesActions";

import classes from "./ReusableTable.css";
const ProgramFilter = ({ column }) => {
  const { courses } = useSelector((state) => state.courses);
  const { filterValue, setFilter } = column;
  const [coursesNames, setCoursesNames] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(coursesActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    const courseNames = courses.map((a) => a.name);
    courseNames.push("All");
    setCoursesNames(courseNames);
  }, [courses]);

  const changeFilter = (e) => {
    if (e === "All") {
      setFilter("");
    } else {
      setFilter(e);
    }
  };

  return (
    <span>
      <select
        name="status"
        value={filterValue || ""}
        onChange={(e) => changeFilter(e.target.value)}
        placeholder="Select"
        className={classes.select}
      >
        <option value="" disabled selected className={classes.placeholder}>
          Select Porgram
        </option>
        {coursesNames.map((f, i) => {
          return (
            <option value={f} key={i} className={classes.options}>
              {f}
            </option>
          );
        })}
      </select>
    </span>
  );
};

export default ProgramFilter;
