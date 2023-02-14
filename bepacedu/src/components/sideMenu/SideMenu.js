import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import classes from "./side.module.css";

import { AiOutlineHome } from "react-icons/ai";
import { BsFillPersonLinesFill, BsFillCalendarRangeFill } from "react-icons/bs";
import { FaInfo } from "react-icons/fa";
import { GrCertificate, GrArticle, GrContact } from "react-icons/gr";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";

import * as authActions from "../../store/auth/authActions";

const SideMenu = (props) => {
  const pathName = useLocation().pathname;

  const { openMenu, close } = props;

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authActions.logOut());
    navigate("/");
  };

  const [openList, setOpenList] = useState(false);
  const options = ["Pharma News", "Pharma Insights", "Articles"];
  return (
    <div className={openMenu ? classes.container : classes.closed}>
      <NavLink
        to="/home"
        className={(navData) =>
          navData.isActive ? classes.active : classes.inActive
        }
        onClick={close}
      >
        <div className={classes.navContainer}>
          <AiOutlineHome className={classes.icons} />
          <strong>Home</strong>
        </div>
      </NavLink>
      <NavLink
        to="/profile"
        className={(navData) =>
          navData.isActive ? classes.active : classes.inActive
        }
        onClick={close}
      >
        <div className={classes.navContainer}>
          <BsFillPersonLinesFill className={classes.icons} />
          <strong>Profile</strong>
        </div>
      </NavLink>
      <NavLink
        to="/about_us"
        className={(navData) =>
          navData.isActive ? classes.active : classes.inActive
        }
        onClick={close}
      >
        <div className={classes.navContainer}>
          <FaInfo className={classes.icons} />
          <strong>About Us</strong>
        </div>
      </NavLink>
      <NavLink
        to="/our_programs"
        className={(navData) =>
          navData.isActive ? classes.active : classes.inActive
        }
        onClick={close}
      >
        <div className={classes.navContainer}>
          <GrCertificate className={classes.icons} />
          <strong>Programs</strong>
        </div>
      </NavLink>
      <div
        className={
          pathName === "/publication" ? classes.activeDiv : classes.inActiveDiv
        }
      >
        <div className={classes.navContainer}>
          <GrArticle className={classes.icons} />
          <strong onClick={() => setOpenList(true)}>Publication</strong>
        </div>
        {openList && (
          <div className={classes.selectContainer}>
            <select
              onChange={(e) => {
                setOpenList(false);
                navigate("/publication", { state: e.target.value });
                close();
              }}
              className={classes.select}
            >
              {options.map((a, i) => {
                return (
                  <option key={i} className={classes.selectTitle}>
                    {a}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>
      <NavLink
        to="/events"
        className={(navData) =>
          navData.isActive ? classes.active : classes.inActive
        }
        onClick={close}
      >
        <div className={classes.navContainer}>
          <BsFillCalendarRangeFill className={classes.icons} />
          <strong>Events</strong>
        </div>
      </NavLink>
      <NavLink
        to="/contact_us"
        className={(navData) =>
          navData.isActive ? classes.active : classes.inActive
        }
        onClick={close}
      >
        <div className={classes.navContainer}>
          <GrContact className={classes.icons} />
          <strong>Contact Us</strong>
        </div>
      </NavLink>
      {token && (
        <div className={classes.inActiveDiv} onClick={logout}>
          <div className={classes.navContainer}>
            <BiLogOut className={classes.icons} />
            <strong>Logout</strong>
          </div>
        </div>
      )}
      {!token && (
        <div className={classes.inActiveDiv} onClick={() => navigate("/auth")}>
          <div className={classes.navContainer}>
            <BiLogIn className={classes.icons} />
            <strong>Login</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideMenu;
