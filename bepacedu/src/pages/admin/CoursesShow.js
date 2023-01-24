import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./course.module.css";
import styles from "./admin.module.css";
import { useDispatch, useSelector } from "react-redux";

import DataCard from "./DataCard";

import close from "../../assets/close.png";
import edit from "../../assets/edit.png";
import Input from "../../components/input/Input";

import moment from "moment";

import * as groupsActions from "../../store/groups/groupsActions";
import * as authActions from "../../store/auth/authActions";
import { mainLink } from "../../store/link";
import ErrorModal from "../../components/error/ErrorModal";

const CoursesShow = () => {
  const { course } = useLocation().state;

  const { isAdmin, token, _id, error, errorMessage } = useSelector(
    (state) => state.auth
  );
  const [openGroup, setOpenGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [groups, setGroups] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      const userDetails = window.localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      dispatch(authActions.getUserBack(userData.user, userData.token));
    }
  }, [token, dispatch]);

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

  const enroll = async () => {
    const response = await fetch(
      `${mainLink}/api/courses/course_group?courseId=${course._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();

    const groups = resData.groups;
    setGroups(groups);
    setOpenModal(true);
  };

  const enrollToCourse = (group) => {
    dispatch(groupsActions.enrollToGroup(group._id, _id, course._id));
    setOpenModal(false);
  };

  const notifyEnroll = () => {};

  const navigate = useNavigate();

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  return (
    <div className={classes.mainData}>
      <div className={classes.mainInternalData}>
        <DataCard notShow>
          <div className={classes.dataContainer}>
            {isAdmin && (
              <div className={classes.editContainer}>
                <img
                  className={classes.editImg}
                  alt="edit"
                  src={edit}
                  onClick={() =>
                    navigate("/admin/edit_course", { state: { course } })
                  }
                />
              </div>
            )}
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
              {course.learningObjective.title}
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
              {course.numberOfHours} hours, {course.numberOfSessions} Session ,
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
              onClick={enroll}
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
            Submit
          </button>
        </div>
      </div>
      <div
        className={
          openModal && groups.length > 0
            ? classes.courseModal
            : classes.removeModal
        }
      >
        <div className={classes.closeDiv} onClick={() => setOpenModal(false)}>
          <img src={close} className={classes.closeImg} alt="close" />
        </div>
        {groups && groups.length > 0 ? (
          <h2> Available Groups </h2>
        ) : (
          <h2> No Available Groups </h2>
        )}
        {groups && groups.length > 0 ? (
          <div className={classes.tableContainer}>
            <table className={classes.groupTable}>
              <thead>
                <tr>
                  <th>Group</th>
                  <th>Starting</th>
                  <th>Ending</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g, i) => {
                  return (
                    <tr>
                      <td> {g.groupName} </td>
                      <td> {g.startingDate} </td>
                      <td> {g.endingDate} </td>
                      <td>
                        {g.participants.length < 12 ? (
                          <button
                            className={classes.enrollBtn}
                            onClick={() => enrollToCourse(g)}
                          >
                            Enroll
                          </button>
                        ) : (
                          <strong>Full</strong>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={classes.buttonContainer}>
            <button className={classes.enrollBtn} onClick={notifyEnroll}>
              Ask For Enrollment
            </button>
            <strong className={classes.note}>
              {" "}
              One of Our admins will contact you soon on your registered
              WhatsApp number{" "}
            </strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesShow;
