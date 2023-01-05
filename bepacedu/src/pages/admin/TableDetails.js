import React from "react";

import classes from "./admin.module.css";

const TableDetails = (props) => {
  const { data } = props;
  return (
    <div>
      <table className={classes.mainTable}>
        <tbody>
          <tr>
            <th>SN</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Type</th>
          </tr>
        </tbody>
        <tbody>
          {data.map((a, i) => {
            return (
              <tr key={i}>
                <td> {i + 1} </td>
                <td> {a.firstName} </td>
                <td> {a.lastName} </td>
                <td> {a.userEmail} </td>
                <td> {a.adminType} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableDetails;
