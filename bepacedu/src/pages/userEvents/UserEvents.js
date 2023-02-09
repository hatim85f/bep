import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventsShow from "../../components/events/EventsShow";

import * as eventsActions from "../../store/events/eventsActions";

import classes from "./events.module.css";

const UserEvents = () => {
  const { events } = useSelector((state) => state.events);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(eventsActions.getEvents());
  }, [dispatch]);
  return (
    <div className={classes.eventsContainer}>
      <EventsShow events={events} />
    </div>
  );
};

export default UserEvents;
