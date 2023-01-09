import React, { useEffect } from "react";

import classes from "./groups.module.css";

import * as groupsActions from "../../store/groups/groupsActions";
import { useDispatch, useSelector } from "react-redux";

import DataCard from "./DataCard";

const Groups = () => {
  const { groups } = useSelector((state) => state.groups);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(groupsActions.getGroups());
  }, [dispatch]);

  console.log(groups);
  return (
    <div className={classes.groupContainer}>
      <div className={classes.innerContainer}>
        <DataCard notShow>
          <table className={classes.groupTable}>
            <tr>
              <th>Group Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Course</th>
              <th>Participants</th>
            </tr>
          </table>
        </DataCard>
      </div>
    </div>
  );
};

export default Groups;
