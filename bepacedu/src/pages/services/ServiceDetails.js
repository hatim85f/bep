import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import classes from "./service.module.css";

const ServiceDetails = () => {
  const service = useLocation().state;

  const navigate = useNavigate()

  return (
    <div
      className={
        service.articleImage && service.articlePoints.length > 0
          ? classes.mainContainer
          : classes.secondContainer
      }
    >
      <div
        className={
          service.articleImage && service.articlePoints.length > 0
            ? classes.rows
            : classes.columns
        }
      >
        <div
          className={
            service.articleImage && service.articlePoints.length > 0
              ? classes.rowItem
              : classes.columnItem
          }
        >
          <img
            className={classes.headerImage}
            alt="header"
            src={service.image}
          />
          <h2> {service.title} </h2>
          <div className={classes.detailsContainer}>
            <p> {service.details} </p>
          </div>
          <div className={classes.buttonContainer}>
            <a href={service.brochure} target="_blank" rel="noreferrer">
              <h2> Download Brochure </h2>
            </a>
          </div>
          {!service.articleImage && !service.articlePoints.length > 0 && (
            <div className={classes.buttonContainer}>
              <button className={classes.btn} onClick={() => navigate('/contact_us')}>
                Contact Us
              </button>
            </div>
          )}
        </div>
        {service.articleImage && (
          <div className={classes.rowItem}>
            <img
              className={classes.articleImage}
              alt="Detail"
              src={service.articleImage}
            />
            <div className={classes.detailsContainer}>
              <p> {service.articleDescription} </p>
            </div>
            <div className={classes.buttonContainer}>
              <button className={classes.btn} onClick={() => navigate('/contact_us')}>
                Contact Us
              </button>
            </div>
          </div>
        )}
        {service.articlePoints.length > 0 && (
          <div className={classes.rowItem}>
            {service.articlePoints.map((item, index) => {
              return (
                <div className={classes.pointsContainer} key={index}>
                  <h2 className={classes.articleTitle}> {item.title} </h2>
                  <strong className={classes.articleSubtitle}>
                    {item.subTitle}
                  </strong>
                  {item.points.map((p, i) => {
                    return (
                      <ul key={i}>
                        <li> {p} </li>
                      </ul>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
export default ServiceDetails;
