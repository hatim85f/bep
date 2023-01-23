import React, { Fragment, useEffect } from "react";

import classes from "./about.module.css";

import { useSelector, useDispatch } from "react-redux";

import * as aboutActions from "../../store/about/aboutActions";

import mission from "../../assets/mission.png";
import vision from "../../assets/vision.png";
import philosophy from "../../assets/philosophy.png";

const AboutUsPage = () => {
  const { about } = useSelector((state) => state.about);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(aboutActions.getAbout());
  }, [dispatch]);

  return (
    <div className={classes.mainContainer}>
      {about.length > 0 && (
        <Fragment>
          <div className={classes.container}>
            <strong>Our Story </strong>
            <div className={classes.missionContainer}>
              <p> &nbsp;&nbsp;&nbsp; {about[0].mainMessage} </p>
            </div>
          </div>
          <div className={classes.rowContainer}>
            <div className={classes.item}>
              <div className={classes.smallRow}>
                <h2> Our Mission </h2>
                <div className={classes.imageContainer}>
                  <img src={mission} className={classes.logo} alt="logo" />
                </div>
              </div>
              <p> &nbsp;&nbsp;&nbsp; {about[0].mission} </p>
            </div>
            <div className={classes.item}>
              <div className={classes.smallRow}>
                <h2> Our Vision </h2>
                <div className={classes.imageContainer}>
                  <img src={vision} className={classes.logo} alt="logo" />
                </div>
              </div>
              <p> &nbsp;&nbsp;&nbsp; {about[0].vision} </p>
            </div>
            <div className={classes.item}>
              <div className={classes.smallRow}>
                <h2> Our Philosophy </h2>
                <div className={classes.imageContainer}>
                  <img src={philosophy} className={classes.logo} alt="logo" />
                </div>
              </div>
              <p> &nbsp;&nbsp;&nbsp; {about[0].philosophy} </p>
            </div>
          </div>
          <div className={classes.container}>
            <strong>Founder Message </strong>
            <div className={classes.missionContainer}>
              <p> &nbsp;&nbsp;&nbsp; {about[0].founderMessage} </p>
            </div>
          </div>
          <div className={classes.container}>
            <strong>Our Values</strong>
            <ul className={classes.valuesContainer}>
              {about[0].values.map((v, i) => {
                return (
                  <li className={classes.valueItem} key={i}>
                    <p> {v} </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={classes.founderRow}>
            <div className={classes.rowItem}>
              <strong> {about[0].founder.name} </strong>
              <small> {about[0].founder.certificate} </small>
              <img
                src={about[0].founder.image}
                className={classes.founderImage}
                alt="founder"
              />
            </div>
            <div className={classes.rowItem}>
              <strong>Founder History </strong>
              <ul>
                {about[0].founder.history.map((h, i) => {
                  return (
                    <li className={classes.valueItem} key={i}>
                      <p className={classes.points}>&nbsp; {h} </p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={classes.teamContainer}>
            {about[0].team.map((t, i) => {
              return (
                <div className={classes.teamItem} key={i}>
                  <div className={classes.profileContainer}>
                    <img
                      src={t.image}
                      alt="pp"
                      className={classes.smallImage}
                    />
                  </div>
                  <div className={classes.innerDiv}>
                    <strong> {t.name} </strong>
                    <small> {t.title} </small>
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default AboutUsPage;
