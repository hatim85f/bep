import React from "react";
import Header from "./Header";

import classes from "./nav.module.css";

import { HiOutlineMailOpen } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

const AppNavigator = (props) => {
  return (
    <div className={classes.head}>
      <div className={classes.headerContent}>
        <div className={classes.data}>
          <div className={classes.dataRow}>
            <FiPhoneCall className={classes.icon} />
            <small className={classes.dataText}>+201003543969</small>
          </div>
          <div className={classes.dataRow}>
            <HiOutlineMailOpen className={classes.icon} />
            <small className={classes.dataText}>info@bepacedu.com</small>
          </div>
          <div className={classes.dataRow}>
            <GoLocation className={classes.icon} />
            <small className={classes.dataText}>
              Mustafa Elnhas St, 10th zone, Nasr City
            </small>
          </div>
        </div>
      </div>
      <div className={classes.mainHeader}>
        <Header />
      </div>
      <main>{props.children}</main>
    </div>
  );
};

export default AppNavigator;
