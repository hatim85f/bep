import React, { useState } from "react";
import classes from "./notifications.module.css";

import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { SlArrowDown } from "react-icons/sl";

import * as notificationActions from "../../../store/notifications/notificationsActions";

const Notifications = () => {
  const { notifications } = useLocation().state;
  const [currentIndex, setCurrentIndex] = useState(null);

  const dispatch = useDispatch();

  const openItem = (i) => {
    const neededNotification = notifications[i];

    dispatch(notificationActions.openNotification(neededNotification._id));
    dispatch(notificationActions.getNotifications());

    setCurrentIndex(i === currentIndex ? null : i);
  };

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        {notifications.length > 0 &&
          notifications.map((a, i) => {
            return (
              <div
                className={classes.mainItem}
                key={i}
                style={{ backgroundColor: a.isOpened ? "" : "skyblue" }}
              >
                <div className={classes.itemContainer}>
                  <h3> {a.type} </h3>
                  <SlArrowDown
                    className={
                      i === currentIndex ? classes.upArrow : classes.arrow
                    }
                    onClick={() => openItem(i)}
                  />
                </div>
                {i === currentIndex && (
                  <div className={classes.downContainer}>
                    <strong> {a.message} </strong>
                    <table className={classes.noteTable}>
                      <thead>
                        <tr>
                          <th>User Name</th>
                          <th>WhatsApp</th>
                          <th>Phone</th>

                          <th>Course</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td> {a.userName} </td>
                          <td> {a.whatsApp} </td>
                          <td> {a.phone} </td>
                          <td> {a.course} </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
                <small> {a.time} </small>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notifications;
