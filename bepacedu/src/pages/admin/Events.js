import React, { useEffect, useState } from "react";

import classes from "./events.module.css";

import * as eventsActions from "../../store/events/eventsActions";
import * as authActions from "../../store/auth/authActions";

import ErrorModal from "../../components/error/ErrorModal";
import { useDispatch, useSelector } from "react-redux";

import { CgClose } from "react-icons/cg";
import UploadImage from "../../components/input/UploadImage";

import moment from "moment";
import Input from "../../components/input/Input";
import EventsShow from "../../components/events/EventsShow";

const Events = () => {
  const { events } = useSelector((state) => state.events);
  const { error, errorMessage } = useSelector((state) => state.auth);

  const [openModal, setOpenModal] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [program, setProgram] = useState("");
  const [date, setDate] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventsActions.getEvents());
  }, [dispatch]);

  const clearError = () => {
    dispatch(authActions.clearError());
    setOpenModal(false);
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  const submit = () => {
    dispatch(eventsActions.addEvent(imageURL, program, date, location, client));
    setClient("");
    setDate("");
    setImageURL("");
    setLocation("");
    setProgram("");
    setOpenModal(false);
  };

  return (
    <div className={classes.container}>
      <button className={classes.button} onClick={() => setOpenModal(true)}>
        Add New Event
      </button>
      {events.length > 0 && <EventsShow events={events} />}
      <div className={openModal ? classes.openModal : classes.closeModal}>
        <div className={classes.removeContainer}>
          <CgClose
            className={classes.icon}
            onClick={() => setOpenModal(false)}
          />
        </div>
        <div className={classes.addContainer}>
          <Input
            title="Event Client"
            onChange={(e) => setClient(e.target.value)}
            defaultValue={client}
          />
          <Input
            title="Date"
            type="date"
            onChange={(e) =>
              setDate(moment(e.target.value).format("MMMM/YYYY"))
            }
            defaultValue={date}
          />
          <Input
            title="Program"
            onChange={(e) => setProgram(e.target.value)}
            defaultValue={program}
          />
          <Input
            title="Location"
            onChange={(e) => setLocation(e.target.value)}
            defaultValue={location}
          />
          <UploadImage
            title="Event Image"
            path={`events/${program}/${client}/events`}
            getImageURL={(url) => setImageURL(url)}
          />
          <div className={classes.buttonContainer}>
            <button
              className={classes.button}
              onClick={submit}
              disabled={
                imageURL.length === 0 ||
                client.length === 0 ||
                program.length === 0 ||
                location.length === 0
              }
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
