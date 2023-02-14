import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import classes from "./articles.module.css";

import logo from "../../assets/bepac.png";

import { AiOutlineLike } from "react-icons/ai";

import * as articlesActions from "../../store/articles/articlesActions";
import * as authActions from "../../store/auth/authActions";

import { useDispatch, useSelector } from "react-redux";
import TextArea from "../../components/input/TextArea";
import ErrorModal from "../../components/error/ErrorModal";

const ShowArticle = () => {
  const item = useLocation().state;

  const { _id, firstName, lastName, error, errorMessage, token } = useSelector(
    (state) => state.auth
  );
  const [likesNumber, setLikesNumber] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) {
      const userDetails = window.localStorage.getItem("userDetails");
      const userData = JSON.parse(userDetails);

      if (userData.token) {
        dispatch(authActions.getUserBack(userData.user, userData.token));
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    const itemLikes = item.likes;
    const likesNumber = parseInt(itemLikes.length);

    const itemComments = item.comments;
    setComments(itemComments);
    setLikesNumber(likesNumber);
  }, [item]);

  const addLike = () => {
    dispatch(articlesActions.addLike(_id ? _id : null, item._id));
    let newLikesNumber = likesNumber;
    const newNumber = newLikesNumber + 1;
    setLikesNumber(newNumber);
  };

  const submitComment = () => {
    dispatch(articlesActions.addComment(_id, comment, item._id));
    let newComments = comments;
    newComments.push({
      userId: _id,
      userName: `${firstName} ${lastName}`,
      comment: comment,
    });
    setComments(newComments.map((a) => a));
  };

  const likePersonComment = (index) => {
    dispatch(articlesActions.updateLike(item._id, index));
    console.log(item._id, index);
  };

  const clearError = () => {
    dispatch(authActions.clearError());
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  console.log(comments, token);

  return (
    <div className={classes.articleContainer}>
      <div className={classes.innerContainer}>
        <div className={classes.articleRow}>
          <div className={classes.byDetails}>
            <strong> By : {item.byName} </strong>
            <small> {item.date} </small>
          </div>
          <img src={logo} alt="logo" className={classes.logo} />
        </div>
        <div className={classes.headLineContainer}>
          <h1> {item.headLine} </h1>
        </div>
        <div className={classes.descriptionContainer}>
          <div className={classes.textContainer}>
            <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.description} </p>
          </div>
          <img className={classes.mainImage} src={item.mainImage} alt="main" />
        </div>
        {item.articleBody.map((a, i) => {
          return (
            <div className={classes.bodyContainer} key={i}>
              <div className={classes.innerRow}>
                <div className={classes.titles}>
                  <strong> {a.title} </strong>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {a.paragraph} </p>
                </div>
                {a.paragraphImage && (
                  <img
                    src={a.paragraphImage}
                    className={classes.smallImage}
                    alt="paragraph"
                  />
                )}
              </div>
              {a.points && (
                <ul className={classes.listDetails}>
                  {a.points.map((p, indx) => {
                    return (
                      <li key={indx}>
                        <p> {p} </p>
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className={classes.line}></div>
            </div>
          );
        })}
        <div className={classes.likesContainer}>
          <div className={classes.likes}>
            <AiOutlineLike className={classes.like} onClick={addLike} />
            <p> {likesNumber} </p>
          </div>
          <div className={classes.commentsContainer}>
            <TextArea
              title="Add Comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <div className={classes.buttonContainer}>
              <button
                className={classes.submitComment}
                onClick={submitComment}
                disabled={comment.length === 0}
              >
                Submit Comment
              </button>
            </div>
          </div>
          <div className={classes.commentData}>
            {comments.length > 0 &&
              comments.map((c, i) => {
                return (
                  <div className={classes.personContainer} key={i}>
                    <strong> {c.userName} </strong>
                    <p> {c.comment} </p>
                    <div className={classes.likes}>
                      <AiOutlineLike
                        className={classes.like}
                        onClick={() => likePersonComment(i)}
                        style={{ fontSize: 25 }}
                      />
                      <p> {c.likes ? c.likes.length : 0} </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowArticle;
