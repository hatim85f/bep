import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./admins.module.css";

import * as adminActions from "../../store/admin/adminActions";
import * as authActions from "../../store/auth/authActions";

import Input from "../input/Input";
import Selective from "../input/Selective";

import ErrorModal from "../error/ErrorModal";

const AddAdmin = (props) => {
  const { closeModal, showModal } = props;

  const { error, errorMessage } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [adminType, setadminType] = useState("");

  const adminTypes = ["Main", "admin"];

  const dispatch = useDispatch();

  const submit = () => {
    dispatch(
      adminActions.addAdmin(firstName, lastName, password, emailId, adminType)
    );
    dispatch(adminActions.getAdmins());
  };

  const clearError = () => {
    dispatch(authActions.clearError());
    closeModal();
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  return (
    <div className={classes.container}>
      <p className={classes.close} onClick={() => closeModal()}>
        Close
      </p>
      <Input
        title="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Input title="Last Name" onChange={(e) => setLastName(e.target.value)} />
      <Input title="Password" onChange={(e) => setPassword(e.target.value)} />
      <Input
        title="Email ID"
        type="email"
        onChange={(e) => setEmailId(e.target.value)}
      />
      <Selective
        title="Admin Type"
        onChange={(e) => setadminType(e)}
        options={adminTypes}
      />
      <div className={classes.submitContainer}>
        <button className={classes.submitBtn} onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddAdmin;
