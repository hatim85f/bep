import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import classes from "./nav.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/auth/authActions";
const NavItems = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logOut());
  };

  const [showItems, setShowItems] = useState(false);

  const { isAdmin } = useSelector((state) => state.auth);

  const options = ["Pharma News", "Pharma Insights", "Articles"];

  const pathName = useLocation().pathname;

  const navigate = useNavigate();

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

      <div
        className={
          pathName === "/publication"
            ? classes.activeDivContainer
            : classes.divContainer
        }
        onMouseMove={() => setShowItems(true)}
        onMouseLeave={() => setShowItems(false)}
        onClick={() => setShowItems(false)}
      >
        <strong>Publication</strong>
        <div className={showItems ? classes.showItems : classes.hideItem}>
          {options.map((a, i) => {
            return (
              <strong
                onClick={() => navigate("/publication", { state: a })}
                key={i}
              >
                {" "}
                {a}{" "}
              </strong>
            );
          })}
        </div>
      </div>

      <NavLink
        className={(navData) =>
          navData.isActive ? classes.activeContainer : classes.container
        }
        to="/events"
      >
        <strong>Our Work Events</strong>
      </NavLink>

      <NavLink
        className={(navData) =>
          navData.isActive ? classes.activeContainer : classes.container
        }
        to="/contact_us"
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
