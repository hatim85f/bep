import React, { useEffect, useState } from "react";

import close from "../../assets/close.png";
import add from "../../assets/add.png";
import remove from "../../assets/remove.png";
import small_add from "../../assets/small_add.png";
import small_remove from "../../assets/small_remove.png";

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
import Selective from "../../components/input/Selective";

const CourseAddition = (props) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [price, setPrice] = useState(0);
  const [learningObjective, setLearningObjective] = useState([
    {
      title: "After completing this program participants will be able to:",
      objectives: [""],
    },
  ]);
  const [modules, setModules] = useState([]);
  const [numberOfModules, setNumberOfModules] = useState(0);
  const [numberOfSessions, setNumberOfSessions] = useState(0);
  const [numberOfHours, setNumberOfHours] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [imageURL, setImageURL] = useState("");
  const [brochureURL, setBrochureURL] = useState("");
  const [description, setDescription] = useState("");
  const [forWhom, setForWhom] = useState("");
  const [category, setCategory] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);

  const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387");

  const { error, errorMessage } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.courses);

  const dispatch = useDispatch();

  // ==============================ENABLING BUTTON==============================================================

  useEffect(() => {
    if (
      name.length > 0 &&
      abbreviation.length > 0 &&
      price &&
      learningObjective.length > 0
    ) {
      setDisabled(false);
    }
  }, [name, abbreviation, price, learningObjective]);

  // =============================================CATEGORIES==========================================

  useEffect(() => {
    dispatch(coursesActions.getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      const data = categories.map((a) => {
        return a.name;
      });
      setCategoriesData(data);
    }
  }, [categories]);

  // =============================SETTING BUTTON DISABLE========================================================

  useEffect(() => {
    if (
      name.length > 0 &&
      abbreviation.length > 0 &&
      numberOfHours &&
      numberOfSessions &&
      learningObjective.length > 10 &&
      price
    ) {
      setDisabled(false);
    }
  }, [
    name,
    abbreviation,
    numberOfHours,
    numberOfSessions,
    price,
    learningObjective,
  ]);

  // ================================================ERROR HANDLING=================================================================

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  // ====================================================ARRANGING NUMBER OF MODULES=======================================

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

  // ================================UPLOAD HEADER IMAGE========================================================

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

    const storageRef = ref(storage, `${abbreviation}/images/logo`);
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

  // ==================================================UPLOAD BRICHURE IMAGE===================================

  const uploadBrochure = (e) => {
    if (!abbreviation) {
      dispatch(
        authActions.setError(
          "Error !!!",
          "You must add Course abbreviation first"
        )
      );
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `${abbreviation}/files/brochure`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
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
          setBrochureURL(downloadURL);
        });
      }
    );
  };

  // ====================================MODULE CHANGES=================================================

  const changeModuleTitle = (text, index) => {
    let newModules = modules;
    newModules[index]["title"] = text;

    setModules(newModules);
  };

  const changePoint = (text, moduleIndex, pointIndex) => {
    let newModules = modules;

    const neededModule = newModules[moduleIndex];
    neededModule["points"][pointIndex] = text;
    setModules(newModules);
  };

  const addPoint = (moduleIndex, itemIndex) => {
    let newModules = modules;
    const modulePoints = newModules[moduleIndex].points;

    modulePoints.push("");

    setModules(newModules.map((a) => a));
  };

  const removePoint = (moduleIndex, itemIndex) => {
    let newModules = modules;
    const modulePoints = newModules[moduleIndex].points;

    modulePoints.splice(itemIndex, 1);
    setModules(newModules.map((a) => a));
  };

  // ======================================LEARNING OBJECTIVES=============================================

  const addObjective = () => {
    let newObjectives = learningObjective;

    newObjectives[0].objectives.push("");

    setLearningObjective(newObjectives.map((a) => a));
  };

  const changeObjecitve = (text, index) => {
    let newObjectives = learningObjective;

    newObjectives[0].objectives[index] = text;
    setLearningObjective(newObjectives);
  };

  const removeObjective = (index) => {
    let newObjectives = learningObjective;
    newObjectives[0].objectives.splice(index, 1);
    setLearningObjective(newObjectives.map((a) => a));
  };

  //  ======================================SUBMIT=========================================================
  const submitCourse = () => {
    const details = {
      name,
      description,
      image: imageURL,
      abbreviation,
      price: +price,
      learningObjective: learningObjective[0],
      modules,
      numberOfSessions: +numberOfSessions,
      numberOfHours: +numberOfHours,
      frequency,
      brochure: brochureURL,
      targetedParticipants: forWhom,
      category: category,
    };

    dispatch(coursesActions.addCourses(details));
    dispatch(coursesActions.getCourses());

    setName("");
    setDescription("");
    setImageURL("");
    setAbbreviation("");
    setAbbreviation("");
    setLearningObjective("");
    setPrice(null);
    setModules([]);
    setFrequency("");
    setBrochureURL("");
    setForWhom("");
    setCategory("");
    setNumberOfHours(null);
    setNumberOfSessions(null);
    setCategory("");
    setLearningObjective([
      {
        title: "After completing this program participants will be able to:",
        objectives: [""],
      },
    ]);

    props.close();
  };

  // =================================================RETURN ===================================================

  return (
    <div>
      <div className={classes.closeDiv} onClick={props.close}>
        <img src={close} alt="close" className={classes.closeImg} />
      </div>
      <div className={classes.mainContainer}>
        <Input title="Course Name" onChange={(e) => setName(e.target.value)} />
        <Input
          title="Course Abbreviation"
          onChange={(e) => setAbbreviation(e.target.value)}
          placeholder="CKAM, SMC, ...etc"
        />
        <label htmlFor="area" className={classes.label}>
          Description
        </label>
        <div className={classes.areaDiv}>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe course benefits and data"
            className={classes.area}
            id="area"
          />
        </div>
        <Input
          type="file"
          onChange={(e) => uploadPhoto(e)}
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
        <div className={classes.modulesContainer}>
          {modules.length > 0 &&
            modules.map((m, i) => {
              return (
                <div className={classes.singleModule} key={i}>
                  <Input
                    title={`Module (${i + 1}) title`}
                    onChange={(e) => changeModuleTitle(e.target.value, i)}
                  />

                  {m.points.length > 0 &&
                    m.points.map((p, indx) => {
                      return (
                        <div className={classes.internalRow} key={indx}>
                          <input
                            className={classes.modulePoints}
                            onChange={(e) =>
                              changePoint(e.target.value, i, indx)
                            }
                          />
                          <div
                            className={classes.addPoint}
                            onClick={() => removePoint(i, indx)}
                          >
                            <img
                              src={small_remove}
                              alt="remove"
                              className={classes.smallIcon}
                            />
                          </div>
                          <div
                            className={classes.addPoint}
                            onClick={() => addPoint(i, indx)}
                          >
                            <img
                              src={small_add}
                              alt="add"
                              className={classes.smallIcon}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              );
            })}
        </div>
        <Input
          title="Number of Hours"
          type="number"
          onChange={(e) => setNumberOfHours(e.target.value)}
        />
        <Input
          title="Number of Sessions"
          onChange={(e) => setNumberOfSessions(e.target.value)}
          type="number"
        />
        <label htmlFor="area" className={classes.label}>
          Learning Objectives
        </label>
        <div className={classes.objectives}>
          {learningObjective[0].objectives.map((o, i) => {
            return (
              <div className={classes.internalRow} key={i}>
                <input
                  className={classes.modulePoints}
                  onChange={(e) => changeObjecitve(e.target.value, i)}
                />
                <div
                  className={classes.addPoint}
                  onClick={() => removeObjective(i)}
                >
                  <img
                    src={small_remove}
                    alt="remove"
                    className={classes.smallIcon}
                  />
                </div>
                <div className={classes.addPoint} onClick={addObjective}>
                  <img
                    src={small_add}
                    alt="add"
                    className={classes.smallIcon}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <label htmlFor="area" className={classes.label}>
          For Whom ?
        </label>
        <div className={classes.areaDiv}>
          <textarea
            onChange={(e) => setForWhom(e.target.value)}
            placeholder="Targeted Participants"
            className={classes.area}
            id="area"
          />
        </div>
        <Selective
          title="Category"
          onChange={(e) => setCategory(e)}
          options={categoriesData}
        />
        <Input
          title="Price"
          placeholder="$"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          title="Brochure"
          onChange={(e) => uploadBrochure(e)}
          type="file"
        />
        <Input
          title="Frequence"
          placeholder="Weekly, Every two Weeks, Monthly"
          onChange={(e) => setFrequency(e.target.value)}
        />
      </div>
      <div className={classes.buttonContainer}>
        <button
          className={classes.submitBtn}
          // disabled={disabled}
          onClick={submitCourse}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CourseAddition;
