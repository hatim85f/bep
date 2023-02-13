import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as groupsActions from "../../store/groups/groupsActions";

import classes from "./certificate.module.css";

import ErrorModal from "../../components/error/ErrorModal";

import * as authActions from "../../store/auth/authActions";
import ItemCefrtificate from "./ItemCefrtificate";

const Certificates = () => {
  const { groups } = useSelector((state) => state.groups);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(groupsActions.getGroups());
  }, [dispatch]);

  const { error, errorMessage } = useSelector((state) => state.auth);

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <section className={classes.section}>
          <div className={classes.groupData}>
            {groups.map((g, i) => {
              return (
                <div
                  className={classes.groupContainer}
                  key={i}
                  onClick={() => setSelectedGroup(g)}
                >
                  <strong className={classes.name}>
                    {" "}
                    {i + 1}) {g.groupName}{" "}
                  </strong>
                </div>
              );
            })}
          </div>
        </section>
        <section className={classes.section}>
          {selectedGroup && (
            <div className={classes.groupItem}>
              <strong className={classes.groupName}>
                {selectedGroup.groupName}
              </strong>
              <div className={classes.smallRow}>
                <div className={classes.title}> Starting Date </div>
                <small className={classes.date}>
                  {selectedGroup.startingDate}{" "}
                </small>
              </div>
              <div className={classes.smallRow}>
                <div className={classes.title}> Ending Date </div>
                <small className={classes.date}>
                  {selectedGroup.endingDate}{" "}
                </small>
              </div>
              {selectedGroup.groupParticipants.map((p, i) => {
                return (
                  <div
                    className={classes.nameContainer}
                    key={i}
                    onClick={() => setSelectedStudent(p)}
                  >
                    <strong>
                      {" "}
                      {i + 1}) {p.name}{" "}
                    </strong>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        <section className={classes.section}>
          {selectedStudent && (
            <ItemCefrtificate
              student={selectedStudent}
              courseName={selectedGroup.groupName}
              clearData={() => {
                setSelectedStudent(null);
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default Certificates;
