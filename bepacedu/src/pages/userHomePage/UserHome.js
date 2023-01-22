import React, { useEffect, useState } from "react";
import classes from "./userHome.module.css";
import { useDispatch, useSelector } from "react-redux";

import * as homeActions from "../../store/homeData/homeActions";

import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const UserHome = () => {
  const { items } = useSelector((state) => state.home);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [swipingLeft, setSwipingLeft] = useState(false);
  const [swipingRight, setSwipingRight] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeActions.getItems());
  }, [dispatch]);

  const swipeRight = () => {
    let neededIndex = currentIndex;
    const rightIndex = neededIndex + 1;

    setSwipingRight(true);

    if (neededIndex === items.length - 1) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(rightIndex);
  };

  const swipeLeft = () => {
    let neededIndex = currentIndex;
    const rightIndex = neededIndex - 1;

    setSwipingRight(false);
    setSwipingLeft(true);

    if (neededIndex === 0) {
      setCurrentIndex(items.length - 1);
      return;
    }

    setCurrentIndex(rightIndex);
  };

  const navigate = useNavigate();

  return (
    <div className={classes.mainContainer}>
      <div className={classes.titleContainer}>
        <span className={classes.title}>Our Services</span>
      </div>
      <div className={classes.sRow}>
        <MdOutlineArrowBackIosNew className={classes.btn} onClick={swipeLeft} />
        {items && items.length > 0 && (
          <div className={classes.itemsContainer}>
            {items.map((item, index) => {
              return (
                <div className={`${classes.slide_container} `} key={index}>
                  {index === currentIndex && (
                    <div className={classes.slide_content}>
                      <div
                        className={`${
                          index === currentIndex && swipingRight
                            ? classes.out
                            : index === currentIndex &&
                              swipingLeft &&
                              classes.in
                        }`}
                      >
                        <div className={classes.card}>
                          <div className={classes.image_content}>
                            <span className={classes.overlay}></span>

                            <div className={classes.card_image}>
                              <img
                                src={item.image}
                                alt="logo"
                                className={classes.card_img}
                              />
                            </div>
                          </div>
                          <div className={classes.card_content}>
                            <h2 className={classes.name}> {item.title} </h2>
                            <p className={classes.description}>
                              {" "}
                              {item.details}{" "}
                            </p>

                            <button
                              className={classes.button}
                              onClick={() =>
                                navigate("/home/services_details", {
                                  state: items[index],
                                })
                              }
                            >
                              View More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <MdArrowForwardIos onClick={swipeRight} className={classes.btn} />
      </div>
    </div>
  );
};

export default UserHome;
