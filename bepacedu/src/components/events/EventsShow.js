import React from "react";

import classes from "./events.module.css";

const EventsShow = (props) => {
  const { events } = props;
  return (
    <div className={classes.eventContainer}>
      <div className={classes.mainRow}>
        {events.map((e, i) => {
          return (
            <div className={classes.eventsContainer} key={i}>
              <img
                className={classes.eventImage}
                src={e.imageURL}
                alt={e.client}
              />
              <div className={classes.details}>
                <table className={classes.eventTable}>
                  <thead>
                    <th>Project Name</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Client</th>
                    <tbody>
                      <td>{e.program}</td>
                      <td>{e.date}</td>
                      <td>{e.location}</td>
                      <td>{e.client}</td>
                    </tbody>
                  </thead>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsShow;
