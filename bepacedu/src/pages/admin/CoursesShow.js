import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import classes from "./course.module.css";
import styles from "./admin.module.css";
import { useDispatch, useSelector } from "react-redux";

import DataCard from "./DataCard";

import close from "../../assets/close.png";
import Input from "../../components/input/Input";

import moment from "moment";

import * as groupsActions from "../../store/groups/groupsActions";

const CoursesShow = () => {
  const { course } = useLocation().state;

  const { isAdmin } = useSelector((state) => state.auth);
  const [openGroup, setOpenGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  const dispatch = useDispatch();

  const submit = () => {
    const group = {
      groupName,
      startingDate,
      endingDate,
      course: course._id,
    };

    dispatch(groupsActions.createGroup(group));

    setGroupName("");
    setEndingDate("");
    setStartingDate("");
    setOpenGroup(false);
  };

  return (
    <div className={classes.mainData}>
      <div className={classes.mainInternalData}>
        <DataCard notShow>
          <div className={classes.dataContainer}>
            <div className={classes.imageContainer}>
              <img
                src={course.image}
                className={classes.logoImage}
                alt="logo"
              />
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
          <div className={classes.modules}>
            {course.modules.map((m, i) => {
              return (
                <div className={classes.single} key={i}>
                  <strong className={classes.moduleTitle}>
                    Module {i + 1}) {m.title}
                  </strong>
                  <ul>
                    {m.points.map((p, indx) => {
                      return <li key={indx}> {p} </li>;
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className={classes.single} style={{ marginTop: 30 }}>
            <strong className={classes.duration}>
              {" "}
              {course.numberOfHours} hours, {course.numberOfSessions} Session ,{" "}
              {course.frequency}
            </strong>
          </div>
          <div className={classes.brochure}>
            <a href={course.brochure} target="_blank" rel="noreferrer">
              <h2> Download Brochure </h2>
            </a>
          </div>
          <div className={classes.participants}>
            <h2> Targeted Participants : </h2>
            <strong>{course.targetedParticipants}</strong>
          </div>
          {isAdmin && (
            <button
              className={styles.additionBtn}
              onClick={() => setOpenGroup(true)}
              style={{ width: "30%" }}
            >
              Create Group
            </button>
          )}
          {!isAdmin && (
            <button
              className={styles.additionBtn}
              onClick={() => {}}
              style={{ width: "30%" }}
            >
              Enroll
            </button>
          )}
        </DataCard>
      </div>
      <div className={openGroup ? classes.courseModal : classes.removeModal}>
        <div className={classes.closeDiv} onClick={() => setOpenGroup(false)}>
          <img src={close} className={classes.closeImg} alt="close" />
        </div>
        <Input
          title="Group Name"
          placeholder="Set a name for the group to be identified with"
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Input
          title="Starting Date"
          type="date"
          onChange={(e) =>
            setStartingDate(moment(e.target.value).format("DD/MM/YYYY"))
          }
        />
        <Input
          title="Ending Date"
          type="date"
          onChange={(e) =>
            setEndingDate(moment(e.target.value).format("DD/MM/YYYY"))
          }
        />

        <div className={classes.buttonContainer}>
          <button
            onClick={submit}
            style={{ width: "30%" }}
            className={styles.additionBtn}
          >
            Submit{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesShow;
