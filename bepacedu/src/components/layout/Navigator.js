import React from "react";
import Header from "./Header";

import classes from "./nav.module.css";

import { NavLink, useNavigate } from "react-router-dom";

import { HiOutlineMailOpen } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { GoLocation } from "react-icons/go";

const AppNavigator = (props) => {
  const navigate = useNavigate();
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
        <div className={classes.buttonsContainer}>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeContainer : classes.container
            }
            to="/#"
          >
            <strong>Home</strong>
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeContainer : classes.container
            }
            to="/#"
          >
            <strong>About Us</strong>
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeContainer : classes.container
            }
            to="/#"
          >
            <strong>Programs</strong>
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeContainer : classes.container
            }
            to="/#"
          >
            <strong>Publication</strong>
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeContainer : classes.container
            }
            to="/#"
          >
            <strong>Our Work Events</strong>
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeContainer : classes.container
            }
            to="/#"
          >
            <strong>Online Study</strong>
          </NavLink>
          <NavLink
            className={(navData) =>
              navData.isActive ? classes.activeContainer : classes.container
            }
            to="/#"
          >
            <strong>Contact Us</strong>
          </NavLink>
        </div>
      </div>
      <main>{props.children}</main>
    </div>
  );
};

export default AppNavigator;
