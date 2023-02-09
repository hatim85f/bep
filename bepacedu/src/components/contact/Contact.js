import React, { useState } from "react";

import classes from "./forms.module.css";

import * as formsActions from "../../store/forms/formsActions";

import Input from "../input/Input";
import TextArea from "../input/TextArea";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { SiMaildotru } from "react-icons/si";
import { GiEarthAfricaEurope } from "react-icons/gi";

const Contact = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [website, setWebsite] = useState("");
  const [comment, setComment] = useState("");
  const [mailError, setMailError] = useState("");

  const checkMail = (e) => {
    if (!e.includes("@")) {
      setMailError("Please enter a valid Email ID");
    } else {
      setMail(e);
      setMailError("");
    }
  };

  const submit = () => {};

  return (
    <div className={classes.formContainer}>
      <h3>Leave a Comment</h3>

      <div className={classes.form}>
        <div className={classes.formRow}>
          <Input title="Name" onChange={(e) => setName(e.target.value)} />
          <MdDriveFileRenameOutline className={classes.icon} />
        </div>
        <div className={classes.formRow}>
          <Input
            title="Mail"
            onChange={(e) => checkMail(e.target.value)}
            onFocus={() => setMailError("")}
          />
          <SiMaildotru className={classes.icon} />
        </div>
        {mailError.length > 0 && <p className={classes.error}> {mailError} </p>}
        <div className={classes.formRow}>
          <Input title="Website" onChange={(e) => setWebsite(e.target.value)} />
          <GiEarthAfricaEurope className={classes.icon} />
        </div>
        <TextArea
          title="Comment"
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <button
        className={classes.submit}
        onClick={submit}
        disabled={
          name.length === 0 ||
          mail.length === 0 ||
          !mail.includes("a") ||
          comment.length === 0
        }
      >
        Submit
      </button>
    </div>
  );
};

export default Contact;
