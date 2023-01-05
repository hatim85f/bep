import React from "react";

import classes from "./adminPages.module.css";

import edit from "../../assets/edit.png";

const DataCard = (props) => {
  return (
    <div className={classes.dataCard}>
      {props.editing && (
        <div className={classes.editContainer}>
          <div className={classes.editDiv} onClick={props.onClick}>
            <img className={classes.editImage} src={edit} alt="edit" />
          </div>
        </div>
      )}
      <div className={classes.header}>
        <strong> {props.title} </strong>
        <img
          src={props.image}
          className={classes.headerImage}
          alt={props.title}
        />
      </div>
      <div className={classes.data}>{props.children}</div>
    </div>
  );
};

export default DataCard;
