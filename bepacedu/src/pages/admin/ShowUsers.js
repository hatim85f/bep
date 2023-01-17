import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import classes from "./addUsers.module.css";
import styles from "./admin.module.css";

import * as usersActions from "../../store/users/usersActions";
import * as authActions from "../../store/auth/authActions";
import ReusableTable from "../../components/table/ReusableTable";
import { usersColums } from "../../components/table/usersColumns";

import Sorting from "../../components/sorting/Sorting";

import * as XLSX from "sheetjs-style";
import { saveAs } from "file-saver";
import ErrorModal from "../../components/error/ErrorModal";

const ShowUsers = () => {
  const { color } = useLocation().state;
  const { users } = useSelector((state) => state.users);
  const { token, error, errorMessage } = useSelector((state) => state.auth);

  const [usersData, setUsersData] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersActions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const updatedData = users.map((a) => {
        return {
          ...a,
          name: `${a.firstName} ${a.lastName}`,
          whatsAppNum: a.whatsApp,
        };
      });

      setUsersData(updatedData);
    }
  }, [users]);

  // ========================GETTING USER BACK==================================================

  const getBack = async () => {
    const userDetails = window.localStorage.getItem("userDetails");
    const userData = JSON.parse(userDetails);

    dispatch(authActions.getUserBack(userData.user, userData.token));
  };

  useEffect(() => {
    if (!token) {
      getBack();
    }
  }, [token]);

  // =================================SORTING============================================================

  const sortAZ = useCallback(() => {
    let newUsers = usersData;
    newUsers.sort((a, b) => a.name.localeCompare(b.name));

    setUsersData(newUsers.map((a) => a));
  }, [usersData]);

  const sortZA = useCallback(() => {
    let newUsers = usersData;
    newUsers.sort((a, b) => b.name.localeCompare(a.name));

    setUsersData(newUsers.map((a) => a));
  }, [usersData]);

  // ==============================DOWNLOAD TO EXCEL===========================================

  const Headers = [
    "First",
    "Last",
    "Email",
    "Mobile",
    "WhatsApp",
    "Source",
    "Gender",
    "Location",
    "Feedback1",
    "Feedback2",
  ];

  const exportToExcel = () => {
    const userDetails = users.map((a) => {
      return {
        First: a.firstName,
        Last: a.lastName,
        Email: a.userEmail,
        Mobile: a.phone,
        WhatsApp: a.whatsApp,
        Source: a.source,
        Gender: a.gender,
        Location: a.country,
        Status: a.status,
        Feedback1: a.adminFeedback[0].feedback,
        Feedback2: a.adminFeedback[1].feedback,
        UserID: a._id,
      };
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(userDetails);
    XLSX.utils.sheet_add_aoa(ws, [Headers], { origin: "A1" });
    XLSX.utils.book_append_sheet(wb, ws, "Users", true);

    XLSX.writeFile(wb, "Users.xlsx");
  };

  const deleteUser = (data) => {
    dispatch(usersActions.deleteUser(data[0]._id));
  };

  const clearError = () => {
    dispatch(authActions.clearError());
    dispatch(usersActions.getUsers());
  };

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  return (
    <div className={classes.showContainer} style={{ backgroundColor: color }}>
      <div className={classes.actionBtn}>
        <button
          className={styles.additionBtn}
          onClick={() =>
            navigate("/users/add_users", { state: { color: color } })
          }
        >
          + Add Users
        </button>
        <button
          className={styles.additionBtn}
          onClick={() => navigate("/users/manage", { state: { color: color } })}
        >
          Manage Users
        </button>
      </div>
      <div className={classes.sortingContainer}>
        <Sorting sortAZ={sortAZ} sortZA={sortZA} export={exportToExcel} />
      </div>
      {usersData && usersData.length > 0 && (
        <ReusableTable
          Data={usersData}
          neededColumns={usersColums}
          check
          delete={(data) => deleteUser(data)}
          selected={() => {}}
          route="/users/manage"
          filter
        />
      )}
    </div>
  );
};

export default ShowUsers;
