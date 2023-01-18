import React from "react";
import { useSelector } from "react-redux";

const UserHome = () => {
  const { token } = useSelector((state) => state.auth);

  console.log(token);
  return <div>UserHome</div>;
};

export default UserHome;
