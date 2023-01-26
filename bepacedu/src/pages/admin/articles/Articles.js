import React, { useState } from "react";
import Input from "../../../components/input/Input";
import UploadImage from "../../../components/input/UploadImage";

import classes from "./articles.module.css";

import { MdOutlineAdd } from "react-icons/md";
import { RxMinus } from "react-icons/rx";
import TextArea from "../../../components/input/TextArea";
import Selective from "../../../components/input/Selective";

import * as articlesActions from "../../../store/articles/articlesActions";
import * as authActions from "../../../store/auth/authActions";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ErrorModal from "../../../components/error/ErrorModal";

const Articles = () => {
  const { error, errorMessage } = useSelector((state) => state.auth);
  const [category, setCategory] = useState("");
  const [headLine, setHeadLine] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [articleBody, setArticleBody] = useState([
    {
      title: "",
      paragraphImage: "",
      paragraph: "",
      icon: "",
      points: [],
    },
  ]);

  const addParagraph = () => {
    let newBody = articleBody;
    newBody.push({
      title: "",
      paragraphImage: "",
      points: [],
      paragraph: "",
      icon: "",
    });

    setArticleBody(newBody.map((a) => a));
  };

  const addParagraphTitle = (text, index) => {
    let newBody = articleBody;
    newBody[index]["title"] = text;
    setArticleBody(newBody.map((a) => a));
  };

  const addArticlePoints = (paragraphIndex) => {
    console.log(paragraphIndex);
    let newBody = articleBody;
    const allPoints = newBody[paragraphIndex].points;
    allPoints.push("");
    setArticleBody(newBody.map((a) => a));
  };

  const changePoint = (text, paragraphIndex, pointIndex) => {
    let newBody = articleBody;
    const allPoints = newBody[paragraphIndex].points;
    allPoints[pointIndex] = text;
    setArticleBody(newBody.map((a) => a));
  };

  const removeArticlePoints = (paragraphIndex, pointIndex) => {
    let newBody = articleBody;
    const allPoints = newBody[paragraphIndex].points;
    allPoints.splice(pointIndex, 1);
    setArticleBody(newBody.map((a) => a));
  };

  const addParagraphImage = (url, index) => {
    let newBody = articleBody;
    newBody[index]["paragraphImage"] = url;
    setArticleBody(newBody);
  };

  const addParagraphItem = (text, index) => {
    let newBody = articleBody;
    newBody[index]["paragraph"] = text;
    setArticleBody(newBody.map((a) => a));
  };

  const removeParagraph = (index) => {
    let newBody = articleBody;
    newBody.splice(index, 1);
    setArticleBody(newBody.map((a) => a));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = () => {
    const article = {
      category,
      headLine,
      mainImage,
      articleBody,
    };
    dispatch(articlesActions.addArticle(article));

    setCategory("");
    setHeadLine("");
    setMainImage("");
    setArticleBody({
      title: "",
      paragraphImage: "",
      points: [],
      paragraph: "",
      icon: "",
    });
  };

  const clearError = () => {
    dispatch(authActions.clearError());
    navigate("/dashboard");
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <Selective
          options={["Pharma News", "Pharma Insights", "Article"]}
          title="Category"
          onChange={(e) => setCategory(e)}
        />
        <Input title="Title" onChange={(e) => setHeadLine(e.target.value)} />
        <UploadImage
          title="Article Image"
          path={`articles/${headLine}/mainImage`}
          getImageURL={(url) => setMainImage(url)}
        />
        <div className={classes.bigIcon} onClick={addParagraph}>
          <strong>Add Paragraph</strong>
        </div>
        <div className={classes.itemContainer}>
          {articleBody &&
            articleBody.length > 0 &&
            articleBody.map((b, i) => {
              return (
                <div className={classes.mainItem} key={i}>
                  <strong className={classes.pargraphNumber}>
                    Paragraph #{i + 1}
                  </strong>
                  <div className={classes.row}>
                    <Input
                      title="Paragraph Title"
                      onChange={(e) => addParagraphTitle(e.target.value, i)}
                    />

                    <div
                      className={classes.iconContainer}
                      onClick={() => removeParagraph(i)}
                    >
                      <RxMinus className={classes.icon} />
                    </div>
                    <div
                      className={classes.bigIcon}
                      onClick={() => addArticlePoints(i)}
                    >
                      <strong>Add Point</strong>
                    </div>
                  </div>
                  <UploadImage
                    title="Paragraph Image"
                    path={`/articles/${headLine}/paragraphs/${b.title}`}
                    getImageURL={(url) => addParagraphImage(url, i)}
                  />
                  {b.points.length > 0 &&
                    b.points.map((p, indx) => {
                      return (
                        <div className={classes.listContainer} key={indx}>
                          <Input
                            onChange={(e) =>
                              changePoint(e.target.value, i, indx)
                            }
                          />
                          <div
                            className={classes.smallIconContainer}
                            onClick={() => removeArticlePoints(i, indx)}
                          >
                            <RxMinus className={classes.smallIcon} />
                          </div>
                        </div>
                      );
                    })}
                  <TextArea
                    title="Paragraph"
                    onChange={(e) => addParagraphItem(e.target.value, i)}
                  />
                </div>
              );
            })}
        </div>
        <button
          className={classes.submit}
          onClick={submit}
          disabled={headLine.length === 0 || mainImage.length === 0}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Articles;
