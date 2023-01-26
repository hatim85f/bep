import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/auth/authActions";
const NavItems = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logOut());
  };

  const { isAdmin } = useSelector((state) => state.auth);

  return (
    <div className={classes.buttonsContainer}>
      <NavLink
        className={(navData) =>
          navData.isActive ? classes.activeContainer : classes.container
        }
        to="/home"
      >
        <strong>Home</strong>
      </NavLink>
      {isAdmin && (
        <NavLink
          className={(navData) =>
            navData.isActive ? classes.activeContainer : classes.container
          }
          to="/dashboard"
        >
          <strong>Dashboard</strong>
        </NavLink>
      )}
      <NavLink
        className={(navData) =>
          navData.isActive ? classes.activeContainer : classes.container
        }
        to="/about_us"
      >
        <strong>About Us</strong>
      </NavLink>
      <NavLink
        className={(navData) =>
          navData.isActive ? classes.activeContainer : classes.container
        }
        to="/our_programs"
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
      <div className={classes.container} onClick={() => logout()}>
        <strong>Logout</strong>
      </div>
    </div>
  );
};

export default NavItems;
