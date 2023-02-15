import React, { useEffect, useState } from "react";

import classes from "./details.module.css";

import close from "../../assets/close.png";

const Details = (props) => {
  const { group, closeGroup } = props;

  console.log(group);

  return (
    <div className={classes.container}>
      <div className={classes.closeContainer}>
        <img
          src={close}
          alt="close"
          className={classes.closeImage}
          onClick={closeGroup}
        />
      </div>
      <div className={classes.tableContainer}>
        <table className={classes.showTable}>
          <thead>
            <th>SN</th>
            <th> Student Name </th>
            <th> Payment Status </th>
            <th>Student Code</th>
          </thead>
          <tbody>
            {group.groupParticipants &&
              group.groupParticipants.length > 0 &&
              group.groupParticipants.map((a, i) => {
                return (
                  <tr>
                    <td> {i + 1} </td>
                    <td> {a.name} </td>
                    <td> {a.payments} </td>
                    <td>{a.code}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
