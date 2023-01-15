import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./singleGroup.module.css";
import styles from "./course.module.css";

import close from "../../assets/close.png";
import historical from "../../assets/historical.png";
import done from "../../assets/done.png";
import undone from "../../assets/undone.png";

import moment from "moment/moment";

import * as groupsActions from "../../store/groups/groupsActions";
import * as errorActions from "../../store/auth/authActions";
import { mainLink } from "../../store/link";

import ErrorModal from "../../components/error/ErrorModal";

const GroupSession = (props) => {
  const { closeModal, group } = props;
  const { token, error, errorMessage } = useSelector((state) => state.auth);

  const [groupPeople, setGroupPeople] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [newSession, setNewSession] = useState(false);
  const [date, setDate] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  //   ===================================CREATING NEW SESSION===========================================

  const createSession = () => {
    const groupPeople = group.groupParticipants;

    groupPeople.map((g) => {
      return {
        ...g,
        attendance: g.attendance.push({
          date: date,
          attendance: false,
          assignment: false,
        }),
      };
    });
    setNewSession(true);
    setGroupPeople(groupPeople);
  };

  //   ===============================ADDING ATTENDANCE===============================================

  const pushAttendance = useCallback(
    (index) => {
      let newGroup = groupPeople;
      let itemAtt = newGroup[index].attendance;

      const itemIndex = itemAtt.findIndex((a) => a.date === date);

      let currentAtt = itemAtt[itemIndex];

      if (currentAtt.attendance) {
        currentAtt.attendance = false;
        setGroupPeople(newGroup.map((a) => a));
        return;
      }

      currentAtt.attendance = true;
      setGroupPeople(newGroup.map((a) => a));
    },
    [groupPeople, date]
  );

  //   ===========================================ADDING ASSIGNMENTS===============================================
  const pushAssignment = useCallback(
    (index) => {
      let newGroup = groupPeople;
      let itemAtt = newGroup[index].attendance;

      const itemIndex = itemAtt.findIndex((a) => a.date === date);

      let currentAtt = itemAtt[itemIndex];

      if (currentAtt.assignment) {
        currentAtt.assignment = false;
        setGroupPeople(newGroup.map((a) => a));
        return;
      }

      currentAtt.assignment = true;
      setGroupPeople(newGroup.map((a) => a));
    },
    [groupPeople, date]
  );

  // =============================CLOSING MODAL ===================================================================

  const closeAll = () => {
    setDate("");
    setNewSession(false);
    setGroupPeople([]);
    setShowHistory(false);
    setUserHistory([]);
    setSelectedUser("");
    closeModal();
  };

  //   ================================================SUBMITTING=======================================================

  const dispatch = useDispatch();

  const submit = () => {
    dispatch(groupsActions.updateAttendance(group._id, groupPeople));
    setGroupPeople([]);
    setNewSession(false);
    closeAll();
  };

  // ===========================PREPARING HISTORY=============================================================

  const historyData = (g) => {
    const userAttendance = g.attendance;
    setSelectedUser(g.name);
    setUserDetails(g);
    setUserHistory(userAttendance);
    setShowHistory(true);
  };

  // ================================================PROGRAM COMPLETION========================================

  const completeProgram = async () => {
    const response = await fetch(
      `${mainLink}/api/groups/single?userId=${userDetails.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );

    const resData = await response.json();
    const paymentIndex = resData.userPayments.findIndex(
      (x) => x.courseId === group.course
    );

    dispatch(
      groupsActions.passUser(userDetails.userId, paymentIndex, group._id)
    );
    closeAll();
  };

  // ===============================ERROR HANDLING================================================================

  const clearError = () => {
    dispatch(errorActions.clearError());
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }
  //   ========================================RETURN============================================================

  return (
    <div>
      <div className={styles.closeDiv} onClick={closeAll}>
        <img src={close} className={styles.closeImg} alt="close" />
      </div>
      {!newSession && (
        <div className={styles.buttonContainer}>
          <input
            className={classes.date}
            type="date"
            onChange={(e) =>
              setDate(moment(e.target.value).format("DD/MM/YYYY"))
            }
            id="date"
            placeholder="Session Date"
          />
          {date.length > 0 && (
            <button className={styles.submitBtn} onClick={createSession}>
              Create New Session
            </button>
          )}
        </div>
      )}
      {groupPeople && groupPeople.length > 0 && newSession && (
        <>
          <div className={classes.tableContainer}>
            <table className={classes.singleGroupTable}>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Name</th>
                  <th>Payment</th>
                  <th>Attendance</th>
                  <th>Assignment</th>
                  <th>History</th>
                </tr>
              </thead>
              <tbody>
                {groupPeople.map((g, i) => {
                  return (
                    <tr key={i}>
                      <td> {i + 1} </td>
                      <td> {g.name} </td>
                      <td> {g.payments} </td>
                      <td>
                        <input
                          type="checkbox"
                          onChange={(e) => pushAttendance(i)}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          onChange={(e) => pushAssignment(i)}
                        />
                      </td>
                      <td onClick={() => historyData(g)}>
                        <img
                          src={historical}
                          className={classes.historyImg}
                          alt="History"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.buttonContainer}>
            <button
              className={styles.submitBtn}
              onClick={submit}
              style={{ backgroundColor: "#7e4e60" }}
            >
              Submit
            </button>
          </div>
        </>
      )}
      {showHistory && (
        <div className={showHistory ? classes.history : classes.removeHistory}>
          <div
            className={styles.closeDiv}
            onClick={() => setShowHistory(false)}
          >
            <img src={close} className={styles.closeImg} alt="close" />
          </div>
          <div className={classes.completeContainer}>
            <button className={classes.completeBtn} onClick={completeProgram}>
              Program Completed
            </button>
          </div>
          <div className={classes.tableContainer}>
            <strong className={classes.userName}> {selectedUser} </strong>
          </div>
          <div className={classes.tableContainer}>
            <table className={classes.singleGroupTable}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Attendance</th>
                  <th>Assignments</th>
                </tr>
              </thead>
              <tbody>
                {userHistory.map((h, i) => {
                  return (
                    <tr key={i}>
                      <td> {h.date} </td>
                      <td>
                        <img
                          src={h.attendance ? done : undone}
                          className={classes.thumbImage}
                          alt="log"
                        />
                      </td>
                      <td>
                        <img
                          src={h.assignment ? done : undone}
                          className={classes.thumbImage}
                          alt="log"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupSession;
