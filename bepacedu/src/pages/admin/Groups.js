import React, { useEffect, useState } from "react";

import classes from "./groups.module.css";
import styles from "./course.module.css";

import * as groupsActions from "../../store/groups/groupsActions";
import { useDispatch, useSelector } from "react-redux";

import DataCard from "./DataCard";
import SelectingTable from "./SelectingTable";

import session from "../../assets/session.png";
import GroupSession from "./GroupSession";
import note from "../../assets/note.png";
import Details from "./Details";

const Groups = () => {
  const { groups } = useSelector((state) => state.groups);

  const [openModal, setOpenModal] = useState(false);
  const [group, setGroup] = useState([]);
  const [openGroup, setOpenGroup] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(groupsActions.getGroups());
  }, [dispatch]);

  const addPeople = (group) => {
    setOpenModal(true);
    setGroup(group);
  };

  const openSession = (group) => {
    setOpenGroup(true);
    setGroup(group);
  };

  const openGroupDetails = (group) => {
    setOpenDetails(true);
    setGroup(group);
  };

  return (
    <div className={classes.groupContainer}>
      <div className={classes.innerContainer}>
        <DataCard notShow>
          <table className={classes.groupTable}>
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Program</th>
                <th>Participatns</th>
                <th>Add Participatns</th>
                <th>Open Session</th>
                <th>Group Details</th>
              </tr>
            </thead>
            {groups && (
              <tbody>
                {groups.map((g, i) => {
                  return (
                    <tr key={i}>
                      <td> {g.groupName} </td>
                      <td> {g.startingDate} </td>
                      <td> {g.endingDate} </td>
                      <td> {g.courseName} </td>
                      <td> {g.participants} </td>
                      <td>
                        <button
                          className={classes.addBtn}
                          onClick={() => addPeople(g)}
                        >
                          Add
                        </button>
                      </td>
                      <td onClick={() => openSession(g)}>
                        <img
                          src={session}
                          className={classes.tableImage}
                          alt="Open Session"
                        />
                      </td>
                      <td onClick={() => openGroupDetails(g)}>
                        <img
                          src={note}
                          className={classes.tableImage}
                          alt="Open Session"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </DataCard>
      </div>
      <div className={openModal ? classes.courseModal : classes.removeModal}>
        <SelectingTable group={group} closeModal={() => setOpenModal(false)} />
      </div>
      {groups && groups.length > 0 && (
        <div className={openGroup ? classes.courseModal : classes.removeModal}>
          <GroupSession group={group} closeModal={() => setOpenGroup(false)} />
        </div>
      )}
      {groups && groups.length > 0 && (
        <div
          className={openDetails ? classes.courseModal : classes.removeModal}
        >
          <Details group={group} closeGroup={() => setOpenDetails(false)} />
        </div>
      )}
    </div>
  );
};

export default Groups;
