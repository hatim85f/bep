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
import article from "../../assets/article.png";
import home from "../../assets/home.png";
import aboutUs from "../../assets/aboutUs.png";

import ItemCard from "./ItemCard";
import ModifyHome from "./modifyHome/ModifyHome";

const Dashboard = () => {
  const { token, firstName, lastName, adminType, userEmail, isAdmin } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(authActions.logOut());
  };

  console.log(isAdmin);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
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
            onClick={() =>
              navigate("/admin/payments", { state: { color: "#c2dbdc" } })
            }
            color="#c2dbdc"
          />
          <ItemCard
            title="Groups"
            image={customers}
            onClick={() => navigate("/admin/groups")}
            color="#93b7be"
          />
          <ItemCard
            title="Courses"
            image={courses}
            onClick={() =>
              navigate("/admin/courses", { state: { color: "#c2dbdc" } })
            }
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
          {adminType === "Main" && (
            <ItemCard
              title="Modify Home"
              image={home}
              onClick={() =>
                navigate("/admin/modify_home", { state: { color: "#93b7be" } })
              }
              color="#93b7be"
            />
          )}
          {adminType === "Main" && (
            <ItemCard
              title="Company Portfolio"
              image={aboutUs}
              onClick={() =>
                navigate("/admin/company_portfolio", {
                  state: { color: "#c2dbdc" },
                })
              }
              color="#c2dbdc"
            />
          )}

          {adminType === "Main" && (
            <ItemCard
              title="Articles"
              image={article}
              onClick={() => {}}
              color="#93b7be"
            />
          )}
        </div>
        <button className={classes.logOut} onClick={logOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
