import React, { useEffect } from "react";
import classes from "./dashboard.module.css";

import * as authActions from "../../store/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import notifications from "../../assets/notification.png";
import customers from "../../assets/customers.png";
import payment from "../../assets/payment.png";
import certificate from "../../assets/certificate.png";
import courses from "../../assets/courses.png";
import admin from "../../assets/admin.png";
import support from "../../assets/support.png";

import ItemCard from "./ItemCard";

const Dashboard = () => {
  const { token, firstName, lastName, adminType, userEmail } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(authActions.logOut());
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin_auth");
    }
  }, [navigate, token]);

  return (
    <div className={classes.mainCotainer}>
      <div className={classes.innerContainer}>
        <div className={classes.adminData}>
          <strong>
            {firstName} {lastName}
          </strong>
          <p>{adminType === "Main" ? "Main" : "Active"} Admin</p>
          <address> {userEmail} </address>
        </div>
        <div className={classes.itemsContainer}>
          {adminType === "Main" && (
            <ItemCard
              title="Admins"
              image={admin}
              onClick={() =>
                navigate("/admins_data", { state: { color: "#c2dbdc" } })
              }
              color="#c2dbdc"
            />
          )}
          <ItemCard
            title="Contact List"
            image={support}
            onClick={() => navigate("/users", { state: { color: "#93b7be" } })}
            color="#93b7be"
          />

          <ItemCard
            title="Payments"
            image={payment}
            onClick={() => {}}
            color="#c2dbdc"
          />
          <ItemCard
            title="New Customers"
            image={customers}
            onClick={() => {}}
            color="#93b7be"
          />
          <ItemCard
            title="Courses"
            image={courses}
            onClick={() => {}}
            color="#c2dbdc"
          />
          <ItemCard
            title="Certificates"
            image={certificate}
            onClick={() => {}}
            color="#93b7be"
          />
          <ItemCard
            title="Notifications"
            image={notifications}
            onClick={() => {}}
            color="#c2dbdc"
          />
        </div>
        <button className={classes.logOut} onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
