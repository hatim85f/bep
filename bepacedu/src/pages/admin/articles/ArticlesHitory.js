import React, { useEffect, useState } from "react";

import classes from "./articles.module.css";

import * as articlesActions from "../../../store/articles/articlesActions";
import { useDispatch, useSelector } from "react-redux";

import { MdDeleteSweep } from "react-icons/md";

const ArticlesHitory = () => {
  const { articles } = useSelector((state) => state.articles);

  const [articlesTypes, setArticlesTypes] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(articlesActions.getArticles());
  }, [dispatch]);

  useEffect(() => {
    const resArticles = articles.reduce((acc, data) => {
      const found = acc.find((x) => x.category === data.category);

      if (!found) {
        acc.push({ category: data.category, article: [data] });
      } else {
        found.article.push(data);
      }

      return acc;
    }, []);

    setArticlesTypes(resArticles);
  }, [articles]);

  const deleteItem = (item) => {
    dispatch(articlesActions.deleteArticle(item._id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.mainRow}>
        {articlesTypes.map((t, i) => {
          return (
            <div className={classes.articleCard} key={i}>
              <strong> {t.category} </strong>
              {t.article.map((a, indx) => {
                return (
                  <div className={classes.smallRow} key={indx}>
                    <address> {a.headLine} </address>
                    <MdDeleteSweep
                      onClick={() => deleteItem(a)}
                      className={classes.icon}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ArticlesHitory;
