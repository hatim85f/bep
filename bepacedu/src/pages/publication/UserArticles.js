import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as articlesActions from "../../store/articles/articlesActions";

import classes from "./articles.module.css";

import leftImage1 from "../../assets/article1.png";
import leftImage2 from "../../assets/article1.jpg";

const UserArticles = () => {
  const item = useLocation().state;

  const [neededArticles, setNeededArticles] = useState([]);

  const { articles } = useSelector((state) => state.articles);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(articlesActions.getArticles());
  }, [dispatch]);

  useEffect(() => {
    if (articles.length > 0) {
      const neededArticles = articles.filter((a) => a.category === item);

      setNeededArticles(neededArticles);
    }
  }, [articles, item]);

  const navigate = useNavigate();

  return (
    <div className={classes.container}>
      <div className={classes.row}>
        <div className={classes.rowItem}>
          <div className={classes.upperContainer}>
            <img src={leftImage1} className={classes.upperImage} alt="title" />
          </div>
          <div className={classes.lowerImageDiv}>
            <img
              src={leftImage2}
              className={classes.lowerImage}
              alt="number2"
            />
          </div>
        </div>
        <div className={classes.rowItem}>
          <div className={classes.innerDiv}>
            {neededArticles.length > 0 ? (
              <div className={classes.titles}>
                <ul className={classes.list}>
                  {neededArticles.map((a, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() =>
                          navigate("/publication/show_article", { state: a })
                        }
                      >
                        <div className={classes.titleContainer}>
                          <strong> {a.headLine} </strong>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className={classes.noData}>
                <strong>No Articles yet added Under category of {item} </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserArticles;
