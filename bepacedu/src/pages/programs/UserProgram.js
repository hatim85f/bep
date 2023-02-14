import React, { useEffect, useState } from "react";
import classes from "./userProgram.module.css";

import { useDispatch, useSelector } from "react-redux";

import * as coursesActions from "../../store/courses/coursesActions";
import LessCourseData from "../admin/LessCourseData";
import Input from "../../components/input/Input";
import Selective from "../../components/input/Selective";

import { FcSearch } from "react-icons/fc";

const UserProgram = () => {
  const { courses } = useSelector((state) => state.courses);

  const [coursesData, setCoursesData] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(coursesActions.getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (courses.length > 0) {
      setCoursesData(courses);
    }
  }, [courses]);

  useEffect(() => {
    const neededCourse = courses.filter((a) =>
      a.category.toLowerCase().includes(searchText.toLowerCase())
    );
    setCoursesData(neededCourse);
  }, [courses, searchText]);

  useEffect(() => {
    const coursesCategory = [...new Set(courses.map((a) => a.category))];
    coursesCategory.push("");

    setCategories(coursesCategory);
  }, [courses]);

  const searchItem = (e) => {
    const neededCourse = courses.filter(
      (a) =>
        a.name.toLowerCase().includes(e.toLowerCase()) ||
        a.category.toLowerCase().includes(e.toLowerCase())
    );

    setCoursesData(neededCourse);
  };

  return (
    <div className={classes.programs}>
      <div className={classes.filterContainer}>
        <div className={classes.searchContainer}>
          <div
            className={
              openSearch ? classes.inputContainer : classes.openContainer
            }
          >
            <Input
              placeholder="Search"
              onChange={(e) => searchItem(e.target.value)}
              style={{ border: openSearch ? "" : "none" }}
              onFocus={() => setSearchText("")}
            />
          </div>
          <FcSearch
            className={classes.searchIcon}
            onClick={() => setOpenSearch(!openSearch)}
          />
        </div>
        <Selective
          placeholder="Filter Category"
          options={categories}
          onChange={(e) => setSearchText(e)}
        />
      </div>
      {courses && courses.length > 0 && (
        <div className={classes.courseShow}>
          {coursesData && coursesData.length > 0 && (
            <div className={classes.courseShowContainer}>
              {coursesData.map((c, i) => {
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

export default UserProgram;
