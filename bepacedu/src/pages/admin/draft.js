import React, { useCallback, useEffect, useState } from "react";

import close from "../../assets/close.png";
import add from "../../assets/add.png";
import remove from "../../assets/remove.png";

import classes from "./course.module.css";

import Input from "../../components/input/Input";
import ErrorModal from "../../components/error/ErrorModal";

import * as authActions from "../../store/auth/authActions";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import * as coursesActions from "../../store/courses/coursesActions";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

const CourseAddition = (props) => {
  const { error, errorMessage } = useSelector((state) => state.auth);

  const [courseName, setCourseName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [numberOfSessions, setNumberOfSessions] = useState(0);
  const [learningObjective, setLearningObjective] = useState("");
  const [numberOfHourse, setNumberOfHourse] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [modules, setModules] = useState([]);
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [numberOfModules, setNumberOfModules] = useState(null);

  const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

  useEffect(() => {
    if (
      courseName.length > 0 &&
      abbreviation.length > 0 &&
      numberOfHourse &&
      numberOfSessions &&
      learningObjective.length > 10 &&
      currentPrice
    ) {
      setDisabled(false);
    }
  }, [
    courseName,
    abbreviation,
    numberOfHourse,
    numberOfSessions,
    currentPrice,
    learningObjective,
  ]);

  const uploadPhoto = (e) => {
    if (!abbreviation) {
      dispatch(
        authActions.setError(
          "Error !!!",
          "You must add Course abbreviation first"
        )
      );
      return;
    }

    if (e.target.files) {
      setImage(e.target.files[0]);
    }

    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, `${abbreviation}/image`);
    const uploadTask = uploadBytesResumable(
      storageRef,
      e.target.files[0],
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        if (snapshot.state === "paused") {
          console.log("Upload is paused");
        }
        if (snapshot.state === "running") {
          console.log("Upload is running");
        }
      },
      (error) => {
        if (error.code === "storage/unauthorized") {
          return;
        }
        if (error.code === "storage/canceled") {
          return;
        }

        if (error.code === "storage/unknown") {
          return;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  const addModule = () => {
    audio.play();
    let newModules = modules;
    modules.push({ title: "", points: [""] });
    setModules(newModules);

    let num = numberOfModules;
    let newNum = num + 1;
    setNumberOfModules(newNum);
  };
  const removeModule = () => {
    audio.play();
    let newModules = modules;

    const index = newModules.length - 1;
    newModules.splice(index, 1);

    setModules(newModules);

    let num = numberOfModules;
    let newNum = num - 1;

    if (newNum < 0) {
      newNum = 0;
    }
    setNumberOfModules(newNum);
  };

  const addPoint = (moduleIndex, itemIndex) => {
    let newModules = modules;
    newModules[moduleIndex]["points"].push("");

    setModules(newModules);
  };

  const changeModuleTitle = (text, index) => {};
  const changeObjective = (text, index) => {};

  const dispatch = useDispatch();

  const submitCourse = () => {
    dispatch(
      coursesActions.addCourses({
        courseName,
        abbreviation,
        numberOfHourse,
        numberOfSessions,
        currentPrice,
        learningObjective,
      })
    );

    setAbbreviation("");
    setAbbreviation("");
    setCurrentPrice(null);
    setNumberOfHourse(null);
    setNumberOfSessions(null);
    setLearningObjective("");

    props.close();
  };

  return (
    <div>
      <div className={classes.closeDiv} onClick={props.close}>
        <img src={close} alt="close" className={classes.closeImg} />
      </div>
      <div className={classes.mainContainer}>
        <Input
          title="Course Name"
          onChange={(e) => setCourseName(e.target.value)}
        />
        <Input
          title="Course Abbreviation"
          onChange={(e) => setAbbreviation(e.target.value)}
          placeholder="CKAM, SMC, ...etc"
        />
        <Input
          type="file"
          onChange={(e) => uploadPhoto(e.target.value)}
          title="Course Image"
        />

        <strong className={classes.label}> Number of Modules </strong>
        <div className={classes.modulesNumber}>
          <div className={classes.numberContainer}>
            <strong className={classes.number}> {numberOfModules} </strong>
          </div>
        </div>
        <div className={classes.containerMain}>
          <div className={classes.btns}>
            <div className={classes.btn} onClick={removeModule}>
              <img src={remove} className={classes.closeImg} alt="Remove" />
            </div>
            <div className={classes.btn} onClick={addModule}>
              <img src={add} className={classes.closeImg} alt="Add" />
            </div>
          </div>
        </div>
        <div className={classes.moduleContainer}>
          {modules.length > 0 &&
            modules.map((a, i) => {
              return (
                <div key={i}>
                  <Input
                    title={`Module (${i + 1}) Title`}
                    onChange={(e) => changeModuleTitle(e.target.value, i)}
                  />
                  <div className={classes.container}>
                    {a.points.map((p, indx) => {
                      return (
                        <Input
                          title={`Module (${indx + 1}) Objective`}
                          onChange={(e) =>
                            changeObjective(e.target.value, i, indx)
                          }
                          onEnded={() => addPoint(i, indx)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
        <Input
          title="Number of Hours"
          onChange={(e) => setNumberOfHourse(e.target.value)}
        />
        <Input
          title="Number of Sessions"
          onChange={(e) => setNumberOfSessions(e.target.value)}
          type="number"
        />
        <label htmlFor="area" className={classes.label}>
          Learning Objectives
        </label>
        <div className={classes.areaDiv}>
          <textarea
            onChange={(e) => setLearningObjective(e.target.value)}
            placeholder="What student expected to carry out from this course ?"
            className={classes.area}
            id="area"
          />
        </div>

        <Input
          title="Price"
          placeholder="$"
          type="number"
          onChange={(e) => setCurrentPrice(e.target.value)}
        />
      </div>
      <div className={classes.buttonContainer}>
        <button
          className={classes.submitBtn}
          onClick={submitCourse}
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CourseAddition;
