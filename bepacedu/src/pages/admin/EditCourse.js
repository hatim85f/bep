import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import Warning from "../../components/warning/Warning";

import classes from "./editCourse.module.css";

import ProgressBar from "../../components/progressBar/ProgressBar";

import { FiMinusCircle } from "react-icons/fi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TiMinus } from "react-icons/ti";
import { BsPatchPlus } from "react-icons/bs";

import * as coursesActions from "../../store/courses/coursesActions";
import * as errorActions from "../../store/auth/authActions";

import ErrorModal from "../../components/error/ErrorModal";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";

const EditCourse = () => {
  const { course } = useLocation().state;

  const { error, errorMessage } = useSelector((state) => state.auth);

  const [name, setName] = useState(course.name);
  const [abbreviation, setAbbreviation] = useState(course.abbreviation);
  const [brochure, setBrochure] = useState(course.brochure);
  const [image, setImage] = useState(course.image);
  const [frequency, setFrequency] = useState(course.frequency);
  const [learningObjective, setLearningObjective] = useState(
    course.learningObjective.objectives
  );
  const [modules, setModules] = useState(course.modules);
  const [numberOfHours, setNumberOfHours] = useState(course.numberOfHours);
  const [numberOfSessions, setNumberOfSessions] = useState(
    course.numberOfSessions
  );
  const [offerPrice, setOfferPrice] = useState(course.offerPrice);
  const [price, setPrice] = useState(course.price);
  const [targetedParticipants, setTargetedParticipants] = useState(
    course.targetedParticipants
  );
  const [progress, setProgress] = useState(0);

  //   =====================================CHNAGING BROCHURE======================================================

  const changeBrochure = (e) => {
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
          setBrochure(downloadURL);
        });
      }
    );
  };

  // ================================================CHANGE IMAGE=================================================

  const changeImage = (e) => {
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
        setProgress(progress.toFixed(2));

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
          setImage(downloadURL);
        });
      }
    );
  };

  //   =================================CHANGING LEARNING OBJECTIVES====================================================

  const addPoint = () => {
    let newObjectives = learningObjective;
    newObjectives.push("");
    setLearningObjective(newObjectives.map((a) => a));
  };

  const changeObjective = (e, i) => {
    let newObjectives = learningObjective;
    newObjectives[i] = e.target.value;

    setLearningObjective(newObjectives.map((a) => a));
  };

  const removePoint = (index) => {
    let newObjectives = learningObjective;

    newObjectives.splice(index, 1);
    setLearningObjective(newObjectives.map((a) => a));
  };

  //   ====================================HANDLING MODULES==============================================

  const addModule = () => {
    let newModules = modules;
    newModules.push({ title: "", points: [] });
    setModules(newModules.map((a) => a));
  };

  const addModulePoint = (index) => {
    let newModules = modules;
    const modulePoints = newModules[index].points;
    modulePoints.push("");
    setModules(newModules.map((a) => a));
  };

  const removeModule = (index) => {
    let newModules = modules;
    newModules.splice(index, 1);
    setModules(newModules.map((a) => a));
  };

  const changeModuleTitle = (e, i) => {
    let newModules = modules;
    newModules[i]["title"] = e.target.value;
    setModules(newModules.map((a) => a));
  };

  const changePoint = (e, pointIndex, moduleIndex) => {
    let newModules = modules;
    const modulePoints = newModules[moduleIndex]["points"];
    modulePoints[pointIndex] = e.target.value;

    setModules(newModules.map((a) => a));
  };

  const removeModulePoint = (pointIndex, moduleIndex) => {
    let newModules = modules;
    const points = newModules[moduleIndex]["points"];
    points.splice(pointIndex, 1);
    setModules(newModules.map((a) => a));
  };

  //   ====================================================SUBMIT=====================================================

  const dispatch = useDispatch();

  const submit = () => {
    const updatedCourse = {
      abbreviation,
      brochure,
      frequency,
      learningObjective: {
        title: "After Completing this program, participants will be able to :",
        objectives: learningObjective,
      },
      modules,
      name,
      numberOfHours,
      numberOfSessions,
      image,
      offerPrice,
      price,
      targetedParticipants,
    };

    dispatch(coursesActions.updateCourse(updatedCourse, course._id));
  };

  //   ===================================================ERROR HANDLING============================================

  const navigate = useNavigate();
  const clearError = () => {
    dispatch(errorActions.clearError());

    navigate("/dashboard");
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  //   ======================================================RETURN===============================================

  return (
    <div className={classes.mainContainer}>
      <div style={{ marginTop: 25 }} />
      <Warning text="You are editing Program Details" />
      <div className={classes.innerContainer}>
        <Input
          title="Program Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          title="Abbreviation"
          defaultValue={abbreviation}
          onChange={(e) => setAbbreviation(e.target.value)}
        />
        <Input
          type="file"
          title="Change Brochure"
          onChange={(e) => changeBrochure(e)}
        />
        <Input
          title="Frequency"
          defaultValue={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />
        <img src={image} className={classes.headerImage} alt="header" />
        {progress > 0 && <ProgressBar progress={progress} />}
        <Input
          title="Change Image"
          onChange={(e) => changeImage(e)}
          type="file"
        />
        <div className={classes.labelContainer}>
          <strong className={classes.label}>Learning Objectives</strong>
          <div className={classes.iconContainer}>
            <AiOutlinePlusCircle onClick={addPoint} className={classes.icon} />
          </div>
        </div>
        <div className={classes.objectivesContainer}>
          {learningObjective.map((a, i) => {
            return (
              <div
                className={
                  i === learningObjective.length - 1
                    ? classes.lastObjectives
                    : classes.inputRow
                }
                key={i}
              >
                <Input
                  title={`Point number ${i + 1}`}
                  defaultValue={a}
                  onChange={(e) => changeObjective(e, i)}
                />
                <FiMinusCircle
                  onClick={() => removePoint(i)}
                  className={classes.icon}
                />
              </div>
            );
          })}
        </div>
        <div className={classes.labelContainer}>
          <strong className={classes.label}>Program Modules</strong>
          <div className={classes.iconContainer}>
            <AiOutlinePlusCircle onClick={addModule} className={classes.icon} />
          </div>
        </div>
        <div className={classes.objectivesContainer}>
          {modules.map((m, i) => {
            return (
              <div className={classes.inputMain} key={i}>
                <div className={classes.inputRow}>
                  <Input
                    title={`Module ${i + 1} title`}
                    onChange={(e) => changeModuleTitle(e, i)}
                    defaultValue={m.title}
                  />
                  <div className={classes.buttonRow}>
                    <BsPatchPlus
                      onClick={() => addModulePoint(i)}
                      className={classes.icon}
                    />
                    <FiMinusCircle
                      onClick={() => removeModule(i)}
                      className={classes.icon}
                    />
                  </div>
                </div>
                {m.points.map((p, indx) => {
                  return (
                    <div className={classes.innerRow} key={indx}>
                      <Input
                        defaultValue={p}
                        onChange={(e) => changePoint(e, indx, i)}
                      />
                      <TiMinus
                        className={classes.icon}
                        onClick={() => removeModulePoint(indx, i)}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 25 }} />
        <Input
          title="Number of Hourse"
          defaultValue={numberOfHours}
          onChange={(e) => setNumberOfHours(e.target.value)}
          type="number"
        />
        <Input
          title="Number Of Sessions"
          defaultValue={numberOfSessions}
          onChange={(e) => setNumberOfSessions(e.target.value)}
          type="number"
        />
        <Input
          title="Price in dollars $"
          defaultValue={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />
        <Input
          defaultValue={offerPrice}
          title="Offer Price in dollar $"
          onChange={(e) => setOfferPrice(e.target.value)}
        />
        <div className={classes.labelContainer}>
          <strong className={classes.label}>Targeted Participants</strong>
        </div>
        <textarea
          defaultValue={targetedParticipants}
          onChange={(e) => setTargetedParticipants(e.target.value)}
          className={classes.targted}
        />
        <div className={classes.buttonContainer}>
          <button className={classes.submit} onClick={submit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
