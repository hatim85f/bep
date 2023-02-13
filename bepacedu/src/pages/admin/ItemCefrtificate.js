import React, { useState } from "react";

import classes from "./certificate.module.css";

import UploadImage from "../../components/input/UploadImage";

import * as profileActions from "../../store/user/userActions";

import { useDispatch } from "react-redux";

const ItemCefrtificate = (props) => {
  const { student, courseName, clearData } = props;

  const [certificateImage, setCertificateImage] = useState("");

  const dispatch = useDispatch();

  const submit = () => {
    dispatch(
      profileActions.uploadCertificate(
        student.userId,
        certificateImage,
        courseName
      )
    );
    clearData();
  };

  console.log(student);
  return (
    <div className={classes.studentContainer}>
      <strong className={classes.itemName}> {student.name} </strong>
      <UploadImage
        path={`${student.name}/certificates/${courseName}`}
        getImageURL={(e) => setCertificateImage(e)}
        title="Upload Certificate"
      />
      <button className={classes.submit} onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default ItemCefrtificate;
