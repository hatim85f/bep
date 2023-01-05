import React, { useEffect, useState } from "react";
import styles from "./admin.module.css";
import classes from "./adminPages.module.css";
import { useLocation } from "react-router-dom";

import contact from "../../assets/contact.png";
import linkedin from "../../assets/linkedin.png";
import whatsapp from "../../assets/whatsapp.png";
import mail from "../../assets/mail-inbox-app.png";
import phone from "../../assets/telephone.png";
import personal from "../../assets/personal.png";
import feedback from "../../assets/feedback.png";
import close from "../../assets/close.png";
import trainer from "../../assets/trainer.png";

import Input from "../../components/input/Input";

import * as usersActions from "../../store/users/usersActions";

import DataCard from "./DataCard";
import { useDispatch, useSelector } from "react-redux";

const ManageUsers = () => {
  const userDetails = useLocation().state[0];

  const { firstName, lastName, adminType, _id } = useSelector(
    (state) => state.auth
  );

  const [userImage, setUserImage] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [trainerData, setTrainerData] = useState(false);
  const [newRating, setNewRating] = useState("");

  const [adminFeedback, setAdminFeedback] = useState("");

  useEffect(() => {
    if (userDetails.image) {
      setUserImage(userDetails.image);
    } else {
      if (userDetails.gender === "Female") {
        setUserImage(
          "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png"
        );
      } else {
        setUserImage(
          "https://w7.pngwing.com/pngs/7/618/png-transparent-man-illustration-avatar-icon-fashion-men-avatar-face-fashion-girl-heroes.png"
        );
      }
    }
  }, [userDetails.image, userDetails.gender]);
  console.log(userDetails);

  const dispatch = useDispatch();

  const submitFeedback = () => {
    dispatch(
      usersActions.editFeedback(
        userDetails._id,
        adminFeedback,
        `${firstName} ${lastName}`
      )
    );
    setAdminFeedback("");
    setEditModal(false);
  };

  const submitRating = () => {
    dispatch(
      usersActions.editRating(
        userDetails._id,
        newRating,
        `${firstName} ${lastName}`
      )
    );
    setNewRating("");
    setTrainerData(false);
  };

  console.log(newRating);
  return (
    <div className={classes.mainContainer}>
      <div className={classes.adminMainContainer}>
        <div className={classes.detailsContainer}>
          <img
            src={userImage}
            alt={userDetails.name}
            className={classes.image}
          />
          <h2> {userDetails.name} </h2>
        </div>
        <DataCard title="Personal Information" image={personal}>
          <h2>{userDetails.position}</h2>
          <h2>{userDetails.currentCompany}</h2>
          <h2>{userDetails.country}</h2>
          {userDetails.experience && (
            <h3> {userDetails.experience} years of Experience </h3>
          )}
        </DataCard>
        <DataCard title="Contact Information" image={contact}>
          <div className={classes.row}>
            {userDetails.userEmail && (
              <div className={classes.innerData}>
                <h2> {userDetails.userEmail} </h2>
                <img className={classes.headerImage} src={mail} alt="email" />
              </div>
            )}
            {userDetails.phone && (
              <div className={classes.innerData}>
                <h2> {userDetails.phone} </h2>
                <img className={classes.headerImage} src={phone} alt="phone" />
              </div>
            )}
            {userDetails.whatsApp && (
              <div className={classes.innerData}>
                <h2> {userDetails.whatsApp} </h2>
                <img
                  className={classes.headerImage}
                  src={whatsapp}
                  alt="whatsapp"
                />
              </div>
            )}
            {userDetails.linkedin && (
              <div className={classes.innerData}>
                <h2> {userDetails.linkedin} </h2>
                <img
                  className={classes.headerImage}
                  src={linkedin}
                  alt="linkedin"
                />
              </div>
            )}
          </div>
        </DataCard>
        <DataCard
          title="Admin Feedback"
          image={feedback}
          editing
          onClick={() => setEditModal(true)}
        >
          {userDetails.adminFeedback.length > 0 &&
            userDetails.adminFeedback.map((a, i) => {
              return (
                <div className={classes.row} key={i}>
                  <div className={classes.areaText}>
                    <h2> {a.date} </h2>
                  </div>
                  <div className={classes.areaText}>
                    <h2> {a.feedback} </h2>
                  </div>
                  <div className={classes.areaText}>
                    <h2>By : {a.by}</h2>
                  </div>
                </div>
              );
            })}
          <div
            className={editModal ? classes.innerContainer : classes.closedInner}
          >
            <div className={classes.innerRow}>
              <div
                className={classes.editDiv}
                onClick={() => setEditModal(false)}
              >
                <img className={classes.editImage} src={close} alt="close" />
              </div>
              <Input
                title="Add New Feedback"
                onChange={(e) => setAdminFeedback(e.target.value)}
                placeholder="Add new Feedback"
              />
            </div>
            <button className={classes.submit} onClick={submitFeedback}>
              Submit your Feedback
            </button>
          </div>
        </DataCard>
        {adminType === "Main" && (
          <DataCard
            title="Trainer Rating"
            image={trainer}
            editing
            onClick={() => setTrainerData(true)}
          >
            {userDetails.trainerRatings.map((a, i) => {
              return (
                <div className={classes.row} key={i}>
                  <div className={classes.areaText}>
                    <h2> {a.date} </h2>
                  </div>
                  <div className={classes.areaText}>
                    <h2> {a.rating} </h2>
                  </div>
                  <div className={classes.areaText}>
                    <h2>By : Dr. {a.by} </h2>
                  </div>
                </div>
              );
            })}
            <div
              className={
                trainerData ? classes.innerContainer : classes.closedInner
              }
            >
              <div className={classes.innerRow}>
                <div
                  className={classes.editDiv}
                  onClick={() => setTrainerData(false)}
                >
                  <img className={classes.editImage} src={close} alt="close" />
                </div>
                <div className={classes.inputContainer}>
                  <Input
                    title="Add New Rating"
                    onChange={(e) => setNewRating(e.target.value)}
                    placeholder="Add Trainer Rating"
                  />
                </div>
              </div>
              <button className={classes.submit} onClick={submitRating}>
                Submit your Rating
              </button>
            </div>
          </DataCard>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
