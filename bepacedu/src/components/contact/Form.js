import React, { useState } from "react";

import classes from "./forms.module.css";

import * as formsActions from "../../store/forms/formsActions";

import Input from "../input/Input";
import TextArea from "../input/TextArea";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { BiMobileAlt } from "react-icons/bi";
import { SiMaildotru } from "react-icons/si";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";

const Form = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [mobile, setMobile] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [message, setMessage] = useState("");
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
      <h3>Contact Form</h3>
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
          <Input title="Mobile" onChange={(e) => setMobile(e.target.value)} />
          <BiMobileAlt className={classes.icon} />
        </div>
        <div className={classes.formRow}>
          <Input
            title="WhatsApp"
            onChange={(e) => setWhatsApp(e.target.value)}
          />
          <IoLogoWhatsapp className={classes.icon} />
        </div>
        <div className={classes.formRow}>
          <TextArea
            title="Message"
            onChange={(e) => setMessage(e.target.value)}
          />
          <AiOutlineMessage className={classes.icon} />
        </div>
      </div>

      <button
        className={classes.submit}
        onClick={submit}
        disabled={
          name.length === 0 ||
          mail.length === 0 ||
          !mail.includes("a") ||
          mobile.length === 0 ||
          message.length === 0
        }
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
