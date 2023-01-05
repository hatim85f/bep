import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import classes from "./addUsers.module.css";
import styles from "./admin.module.css";

import * as usersActions from "../../store/users/usersActions";
import ReusableTable from "../../components/table/ReusableTable";
import { usersColums } from "../../components/table/usersColumns";

const ShowUsers = () => {
  const { color } = useLocation().state;
  const { users } = useSelector((state) => state.users);

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
      {usersData && usersData.length > 0 && (
        <ReusableTable
          Data={usersData}
          neededColumns={usersColums}
          check
          delete={() => {}}
          selected={() => {}}
          route="/users/manage"
          filter
        />
      )}
    </div>
  );
};

export default ShowUsers;
