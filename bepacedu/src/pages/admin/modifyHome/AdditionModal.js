import React, { useEffect, useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useDispatch } from "react-redux";

import * as authActions from "../../../store/auth/authActions";
import * as itemsActions from "../../../store/homeData/homeActions";
import Input from "../../../components/input/Input";

import { IoMdRemoveCircle, IoIosAddCircle } from "react-icons/io";

import classes from "./modify.module.css";

import ProgressBar from "../../../components/progressBar/ProgressBar";

import close from "../../../assets/close.png";

const AdditionModal = (props) => {
  const { closeModal, editing, item } = props;

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const [articleImage, setArticleImage] = useState("");
  const [artilceImageProgress, setArtilceImageProgress] = useState(0);
  const [articleDescription, setArticleDescription] = useState("");
  const [points, setPoints] = useState([
    { title: "", subTitle: "", points: [""] },
  ]);
  const [articleBrochure, setArticleBrochure] = useState("");

  useEffect(() => {
    if (editing && item) {
      setTitle(item.title);
      setImage(item.image);
      setDetails(item.details);
      setArticleImage(item.articleImage);
      setArticleDescription(item.articleDescription);
      setPoints(item.articlePoints);
      setArticleBrochure(item.brochure);
    }
  }, [editing, item]);

  const dispatch = useDispatch();

  const uploadLogo = (e) => {
    if (title.length === 0) {
      dispatch(
        authActions.setError("Warning !", "You have to add item title first")
      );
      return;
    }
    if (e.target.files) {
      const image = e.target.files[0];
    }

    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, `homeData/${title}/images/logo`);
    const uploadTask = uploadBytesResumable(
      storageRef,
      e.target.files[0],
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(progress.toFixed(2));
        if (snapshot.state === "paused") {
          console.log("Upload is paused");
        }
        if (snapshot.state === "running") {
          console.log("Upload is running");
        }
      },
      (error) => {
        if (error.code === "storage/unauthorized") {
          return;
        }
        if (error.code === "storage/canceled") {
          return;
        }

        if (error.code === "storage/unknown") {
          return;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };

  // ========================================ARTICLE IMAGE UPLOAD=========================================

  const uploadArticleImage = (e) => {
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(
      storage,
      `homeData/${title}/article/main_image/logo`
    );
    const uploadTask = uploadBytesResumable(
      storageRef,
      e.target.files[0],
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setArtilceImageProgress(progress.toFixed(2));
        if (snapshot.state === "paused") {
          console.log("Upload is paused");
        }
        if (snapshot.state === "running") {
          console.log("Upload is running");
        }
      },
      (error) => {
        if (error.code === "storage/unauthorized") {
          return;
        }
        if (error.code === "storage/canceled") {
          return;
        }

        if (error.code === "storage/unknown") {
          return;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setArticleImage(downloadURL);
        });
      }
    );
  };

  // ============================================POINTS==================================================

  const changeTitle = (e, i) => {
    let newPoints = points;
    newPoints[i]["title"] = e;

    setPoints(newPoints.map((a) => a));
  };

  const removeTopic = (index) => {
    let newPoints = points;
    newPoints.splice(index, 1);

    setPoints(newPoints.map((a) => a));
  };

  const addArticleItem = () => {
    let newPoints = points;
    newPoints.push({ title: "", subTitle: "", points: [""] });
    setPoints(newPoints.map((a) => a));
  };

  const changeSubTitle = (e, i) => {
    let newPoints = points;
    newPoints[i]["subTitle"] = e;

    setPoints(newPoints.map((a) => a));
  };

  const addPoint = (index) => {
    let newPoints = points;

    const neededPoints = newPoints[index].points;
    neededPoints.push("");

    setPoints(newPoints.map((a) => a));
  };

  const changePoint = (text, itemIndex, pointIndex) => {
    let newPoints = points;
    const neededPoints = newPoints[itemIndex].points;

    neededPoints[pointIndex] = text;

    setPoints(newPoints.map((a) => a));
  };

  const removePoint = (itemIndex, pointIndex) => {
    let newPoints = points;

    const neededPoints = newPoints[itemIndex].points;
    neededPoints.splice(pointIndex, 1);

    setPoints(newPoints.map((a) => a));
  };

  // ===================================BROCHURE UPLOAD===============================================
  const uploadBrochure = (e) => {
    const storage = getStorage();
    const storageRef = ref(storage, `${title}/files/brochure`);
    const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        if (snapshot.state === "paused") {
          console.log("Upload is paused");
        }
        if (snapshot.state === "running") {
          console.log("Upload is running");
        }
      },
      (error) => {
        if (error.code === "storage/unauthorized") {
          return;
        }
        if (error.code === "storage/canceled") {
          return;
        }

        if (error.code === "storage/unknown") {
          return;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setArticleBrochure(downloadURL);
        });
      }
    );
  };

  const submit = () => {
    if (editing) {
      dispatch(
        itemsActions.editItem(
          title,
          details,
          image,
          articleImage,
          articleDescription,
          points,
          articleBrochure,
          item._id
        )
      );
      setTitle("");
      setDetails("");
      setImage("");
      setArticleDescription("");
      closeModal();
      return;
    }
    dispatch(
      itemsActions.addHomeItem(
        title,
        details,
        image,
        articleImage,
        articleDescription,
        points,
        articleBrochure
      )
    );
    setTitle("");
    setDetails("");
    setImage("");
    closeModal();
  };

  return (
    <div className={classes.innerModal}>
      <div style={{ marginTop: 30 }} />
      <div className={classes.closeContainer}>
        <img
          src={close}
          alt="close"
          className={classes.imageClose}
          onClick={closeModal}
        />
      </div>
      <Input
        title="Title"
        onChange={(e) => setTitle(e.target.value)}
        defaultValue={title}
      />
      <div className={classes.detailsContainer}>
        <label htmlFor="details" className={classes.label}>
          Details
        </label>
        <textarea
          onChange={(e) => setDetails(e.target.value)}
          className={classes.area}
          defaultValue={details}
        />
      </div>
      {editing && (
        <div className={classes.imageContainer}>
          <img src={image} alt="logo" className={classes.current} />
        </div>
      )}
      {progress > 0 && <ProgressBar progress={progress} />}
      <Input title="Logo" onChange={(e) => uploadLogo(e)} type="file" />
      <div className={classes.articleContainer}>
        {articleImage && articleImage.length > 0 && (
          <img
            src={articleImage}
            alt="article_image"
            className={classes.articelImage}
          />
        )}
        {artilceImageProgress > 0 && (
          <ProgressBar progress={artilceImageProgress} />
        )}
        <Input
          type="file"
          onChange={(e) => uploadArticleImage(e)}
          title="Upload Article Image"
        />
        <div className={classes.detailsContainer}>
          <label htmlFor="details" className={classes.label}>
            Service Description
          </label>
          <textarea
            onChange={(e) => setArticleDescription(e.target.value)}
            className={classes.area}
            defaultValue={articleDescription}
          />
        </div>
        <div className={classes.pointsContainer}>
          {points &&
            points.map((p, i) => {
              return (
                <div className={classes.itemContainer} key={i}>
                  <div className={classes.mainRow}>
                    <Input
                      title={`Topic #${i + 1} Title`}
                      onChange={(e) => changeTitle(e.target.value, i)}
                      defaultValue={points[i].title}
                    />
                    <div className={classes.smallMainRow}>
                      <IoMdRemoveCircle
                        className={classes.mainRemove}
                        onClick={() => removeTopic(i)}
                      />
                      <IoIosAddCircle
                        className={classes.mainAdd}
                        onClick={() => addArticleItem(i)}
                      />
                    </div>
                  </div>
                  <div className={classes.subtitleRow}>
                    <Input
                      title={`Topic #${i + 1} subtitle`}
                      onChange={(e) => changeSubTitle(e.target.value, i)}
                      defaultValue={points[i].subTitle}
                    />
                    <IoIosAddCircle
                      className={classes.addPointIcon}
                      onClick={() => addPoint(i)}
                    />
                  </div>
                  {p.points.length > 0 && (
                    <ul className={classes.points}>
                      {p.points.map((c, indx) => {
                        return (
                          <li className={classes.pointRow} key={indx}>
                            <input
                              className={classes.input}
                              onChange={(e) =>
                                changePoint(e.target.value, i, indx)
                              }
                              defaultValue={c}
                            />
                            <IoMdRemoveCircle
                              className={classes.removePoint}
                              onClick={() => removePoint(i, indx)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
        </div>
        <Input
          title="Upload Brochure"
          type="file"
          onChange={(e) => uploadBrochure(e)}
        />
      </div>

      <button
        className={classes.add}
        onClick={submit}
        style={{ backgroundColor: "#fff" }}
      >
        Submit
      </button>
    </div>
  );
};

export default AdditionModal;
