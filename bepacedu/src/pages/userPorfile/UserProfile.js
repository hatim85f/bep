import React, { useEffect } from "react";

import classes from "./profile.module.css";

import { useDispatch, useSelector } from "react-redux";

import * as profileActions from "../../store/user/userActions";

import UploadImage from "../../components/input/UploadImage";

import { TbCertificate } from "react-icons/tb";
import { AiFillPhonem, AiOutlineBook } from "react-icons/ai";
import { RiWhatsappFill } from "react-icons/ri";
import {
  BsGenderMale,
  BsGenderFemale,
  BsLinkedin,
  BsCurrencyDollar,
} from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import moment from "moment";
import { useNavigate } from "react-router-dom";

// user name3
// profile picture
// history
// courses
// ceftificates
// payments

const UserProfile = () => {
  const {
    firstName,
    lastName,
    image,
    phone,
    whatsApp,
    gender,
    country,
    nationality,
    courses,
    certificates,
    wishList,
    payments,
    history,
    activeCourses,
    scheduledPayments,
    linkedin,
    currentCompany,
    position,
    DOB,
    aspiration,
  } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(profileActions.getUserData());
  }, [dispatch]);

  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.itemContainer}>
        <div className={classes.editContainer}>
          <BiEdit
            className={classes.edit}
            onClick={() =>
              navigate("/registeration", {
                state: {
                  editing: true,
                  data: {
                    firstName,
                    lastName,
                    image,
                    phone,
                    whatsApp,
                    gender,
                    country,
                    nationality,
                    courses,
                    certificates,
                    wishList,
                    payments,
                    history,
                    activeCourses,
                    scheduledPayments,
                    linkedin,
                    currentCompany,
                    position,
                    DOB,
                    aspiration,
                  },
                },
              })
            }
          />
        </div>
        <div className={classes.imageContainer}>
          <img src={image} className={classes.image} alt="pp" />
        </div>
        {gender === "Male" ? (
          <BsGenderMale className={classes.gender} />
        ) : (
          <BsGenderFemale className={classes.gender} />
        )}
        <h2>
          {firstName} {lastName}
        </h2>
        <small> Nationality : {nationality} </small>
        <small>{position}</small>
        <small>
          {currentCompany} - {country}
        </small>
        <address> {moment(DOB).format("DD/ MM/ YYYY")}</address>
        <div className={classes.smallRow}>
          <AiOutlineBook className={classes.icon} />
          <strong> {phone} </strong>
        </div>
        <div className={classes.smallRow}>
          <RiWhatsappFill
            className={classes.icon}
            style={{ color: "#25D366" }}
          />
          <strong> {whatsApp} </strong>
        </div>
        <div className={classes.smallDetails}>
          <small> Aspiration : {aspiration} </small>

          <small>
            <a href={linkedin} target="_blank" rel="noreferrer">
              <BsLinkedin
                className={classes.linked}
                style={{ color: "#0072b1" }}
              />
            </a>
          </small>
        </div>
        <div className={classes.dataContainer}>
          <div className={classes.headerRow}>
            <strong>Active Courses</strong>
            <AiOutlineBook className={classes.icon} />
          </div>
          <div className={classes.dataDetails}>
            {activeCourses.map((a, i) => {
              return (
                <div className={classes.course} key={i}>
                  <strong> {a.groupName} </strong>
                  <small> start: {a.startingDate} </small>
                  <small> End : {a.endingDate} </small>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.dataContainer}>
          <div className={classes.headerRow}>
            <strong>Payments</strong>
            <BsCurrencyDollar className={classes.icon} />
          </div>
          <div style={{ height: 10 }} />
          <div className={classes.paymentRow}>
            <div className={classes.payItem}>Program</div>
            <div className={classes.payItem}>Payment</div>
            <div className={classes.payItem}>Status</div>
          </div>
          <div className={classes.dataDetails}>
            {payments.map((a, i) => {
              return (
                <div className={classes.paymentRow} key={i}>
                  <div className={classes.payItem}>{a.courseName}</div>
                  <div className={classes.payItem}>{a.requiredPayments} $</div>
                  <div className={classes.payItem}> {a.status} </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.dataContainer}>
          <div className={classes.headerRow}>
            <strong>Certificates</strong>
            <TbCertificate className={classes.icon} />
          </div>
          {certificates.length > 0 &&
            certificates.map((c, i) => {
              return (
                <div className={classes.certificateContainer} key={i}>
                  <a
                    href={c.certificate}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.anc}
                  >
                    <strong className={classes.cerName}>
                      {" "}
                      {i + 1}) {c.program}{" "}
                    </strong>
                  </a>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
