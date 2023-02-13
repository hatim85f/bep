import React, { Fragment, useEffect, useState } from "react";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import Input from "./Input";

import ProgressBar from "../progressBar/ProgressBar";

const UploadImage = ({
  path,
  getImageURL,
  title,
  id,
  className,
  showProgress,
}) => {
  const [imageURL, setImageURL] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getImageURL(imageURL);
  }, [getImageURL, imageURL]);

  const uploadImage = (e) => {
    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(storage, `${path}`);
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
          setImageURL(downloadURL);
        });
      }
    );
  };

  return (
    <Fragment>
      <Input
        type="file"
        onChange={(e) => uploadImage(e)}
        title={title}
        id={id ? id : ""}
      />
      {showProgress && <ProgressBar progress={progress} />}
    </Fragment>
  );
};

export default UploadImage;
