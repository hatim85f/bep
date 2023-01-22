import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./home.module.css";
import swiper from "./swiper-bundle.min.css";

import * as homeActions from "../../store/homeData/homeActions";

import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";

const UserHome = () => {
  const { token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.home);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [swipingRight, setSwipingRight] = useState(false);
  const [swipingLeft, setSwipingLeft] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(homeActions.getItems());
  }, [dispatch]);

  const swipeRight = () => {
    let neededIndex = currentIndex;
    const rightIndex = neededIndex + 1;

    const divs = document.querySelectorAll(`.${classes.questionsContainer}`);

    divs[0].classList.add(`${classes.out}`);

    setTimeout(() => {
      divs[0].classList.remove(`${classes.out}`);
    }, 1000);

    if (neededIndex === items.length - 1) {
      setCurrentIndex(0);
      return;
    }

    setCurrentIndex(rightIndex);
  };

  const swipeLeft = () => {
    let neededIndex = currentIndex;
    const rightIndex = neededIndex - 1;

    const divs = document.querySelectorAll(`.${classes.slide_container}`);

    divs[0].classList.add(`${classes.in}`);

    setTimeout(() => {
      divs[0].classList.remove(`${classes.in}`);
    }, 1000);

    console.log(divs);

    if (neededIndex === 0) {
      setCurrentIndex(items.length - 1);
      return;
    }

    setCurrentIndex(rightIndex);
  };

  return (
    <div className={classes.mainContainer}>
      <div className={classes.sRow}>
        <MdOutlineArrowBackIosNew className={classes.btn} onClick={swipeLeft} />
        {items && items.length > 0 && (
          <div className={classes.itemsContainer}>
            {items.map((item, index) => {
              return (
                <div className={`${classes.slide_container}`} key={index}>
                  {index === currentIndex && (
                    <div className={classes.slide_content}>
                      <div className={`${classes.card_wrapper}`}>
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

                            <button className={classes.button}>
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
