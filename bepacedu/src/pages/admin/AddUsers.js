import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import styles from "./admin.module.css";
import classes from "./addUsers.module.css";

import * as XLSX from "xlsx";

import moment from "moment";
import ReusableTable from "../../components/table/ReusableTable";
import { usersColums } from "../../components/table/usersColumns";

import ErrorModal from "../../components/error/ErrorModal";

import * as usersActions from "../../store/users/usersActions";
import * as authActions from "../../store/auth/authActions";
import Sorting from "../../components/sorting/Sorting";

const AddUsers = () => {
  const { color } = useLocation().state;

  const { firstName, lastName } = useSelector((state) => state.auth);
  const { error, errorMesasge } = useSelector((state) => state.auth);

  const [data, setData] = useState([]);
  const [finalData, setFinalData] = useState([]);

  const dispatch = useDispatch();

  const uploadFile = (e) => {
    const promise = new Promise((resolve, reject) => {
      const file = e.target.files[0]; // selecting first sheet only whatever it's name

      const fileReader = new FileReader();

      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsName = wb.SheetNames[0]; // you can wahtever as many as sheets needed

        const ws = wb.Sheets[wsName];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setData(d);
    });
  };

  useEffect(() => {
    const updatedData = data.map((a) => {
      const feedback = [a.Feedback1, a.Feedback2];
      return {
        name: `${a.First} ${a.Last}`,
        firstName: a.First,
        userEmail: a.Email ? a.Email : "",
        lastName: a.Last,
        password: `${a.First.toLowerCase()}.${a.Last.toLowerCase()}`,
        source: `${firstName} ${lastName}`,
        userName: `${a.First.toLowerCase()}.${a.Last.toLowerCase()}`,
        image: "",
        whatsAppNum: a.WhatsApp,
        phone: a.Mobile,
        gender: "",
        country: a.Location,
        nationality: a.Location,
        status: a.Status,
        adminFeedback: feedback.map((a) => {
          return {
            feedback: a,
            date: moment(new Date()).format("DD/MM/YYYY"),
          };
        }),
      };
    });

    setFinalData(updatedData);
  }, [data, firstName, lastName]);

  const submit = () => {
    for (let data in finalData) {
      dispatch(usersActions.addUsers(finalData[data]));
    }
  };

  return (
    <div className={classes.showContainer} style={{ backgroundColor: color }}>
      <div className={classes.mainButtons}>
        <button
          className={styles.additionBtn}
          onClick={() => {
            document.getElementById("upload").click();
            return false;
          }}
        >
          Upload
        </button>
        <input
          type="file"
          onChange={(e) => uploadFile(e)}
          className={classes.files}
          id="upload"
        />
      </div>
      <Sorting />
      <ReusableTable
        Data={finalData}
        neededColumns={usersColums}
        check
        delete={() => {}}
        selected={() => {}}
        route=""
        filter
      />
      <button className={classes.additionBtn} onClick={submit}>
        Submit
      </button>
    </div>
  );
};

export default AddUsers;
