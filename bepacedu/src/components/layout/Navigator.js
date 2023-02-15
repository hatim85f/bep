import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";

import classes from "./nav.module.css";

import { HiOutlineMailOpen } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";
import NavItems from "./NavItems";
import SideMenu from "../sideMenu/SideMenu";

const AppNavigator = (props) => {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className={classes.head}>
      <div className={classes.headerContent}>
        <div className={classes.data}>
          <div className={classes.dataRow}>
            <FiPhoneCall className={classes.icon} />
            <a href="tel:+201003543969" className={classes.anchor}>
              <small className={classes.dataText}>+201003543969</small>
            </a>
          </div>
          <div className={classes.dataRow}>
            <HiOutlineMailOpen className={classes.icon} />
            <a href="mailTo:info@bepacedu.com" className={classes.anchor}>
              <small className={classes.dataText}>info@bepacedu.com</small>
            </a>
          </div>
          <div className={classes.dataRow}>
            <GoLocation className={classes.icon} />
            <a
              href="https://goo.gl/maps/A3xMMQ7YGG6jby9s7"
              className={classes.anchor}
            >
              <small className={classes.dataText}>
                Mustafa Elnhas St, 10th zone, Nasr City
              </small>
            </a>
          </div>
        </div>
      </div>
      <div className={classes.mainHeader}>
        <Header />
        {windowSize.current[0] > "800" && <NavItems />}
      </div>
      <main>{props.children}</main>
    </div>
  );
};

export default AppNavigator;
