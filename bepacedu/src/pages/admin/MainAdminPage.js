import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AddAdmin from "../../components/admin/AddAdmin";

import * as adminActions from "../../store/admin/adminActions";

import classes from "./admin.module.css";
import styles from "./dashboard.module.css";
import ItemCard from "./ItemCard";
import TableDetails from "./TableDetails";

const MainAdminPage = () => {
  const { color } = useLocation().state;

  const { admins } = useSelector((state) => state.admin);

  const [showAdd, setShowAdd] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminActions.getAdmins());
  }, [dispatch]);

  return (
    <div className={classes.mainCotainer} style={{ backgroundColor: color }}>
      <div className={classes.additionContainer}>
        <button
          className={classes.additionBtn}
          onClick={() => setShowAdd(true)}
        >
          + Add Admin
        </button>
        <button
          className={classes.additionBtn}
          onClick={() => setShowAdd(true)}
        >
          Edit or Delete
        </button>
      </div>
      <div className={classes.adminMainContainer}>
        <TableDetails data={admins} />
      </div>
      <div className={showAdd ? classes.modal : classes.closeModal}>
        {showAdd && (
          <div>
            <AddAdmin closeModal={() => setShowAdd(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MainAdminPage;
