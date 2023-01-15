import React, { useEffect, useState } from "react";

import close from "../../assets/close.png";

import classes from "./groups.module.css";
import styles from "./course.module.css";
import { useDispatch, useSelector } from "react-redux";

import * as usersActions from "../../store/users/usersActions";
import * as groupsActions from "../../store/groups/groupsActions";

import SmallTable from "../../components/table/SmallTable";
import NameFilter from "../../components/table/NameFilter";
import MobileFilter from "../../components/table/MobileFilter";

const SelectingTable = (props) => {
  const { closeModal, group } = props;

  const { users } = useSelector((state) => state.users);
  const { adminType } = useSelector((state) => state.admin);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddedUser, setShowAddedUser] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersActions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    const newUsers =
      users &&
      users.map((u) => {
        return {
          name: `${u.firstName} ${u.lastName}`,
          _id: u._id,
          phone: u.phone,
        };
      });

    setUsersData(newUsers);
  }, [users]);

  const addUsers = (user) => {
    let newUsers = selectedUsers;
    const previousUser = newUsers.find((a) => a._id === user._id);

    if (previousUser) {
      return;
    }

    newUsers.push({
      name: user.name,
      _id: user._id,
    });
    setSelectedUsers(newUsers.map((u) => u));
  };

  const removeUser = (index) => {
    let newUsers = selectedUsers;
    newUsers.splice(index, 1);

    setSelectedUsers(newUsers.map((u) => u));
  };

  const usersColums = [
    {
      Header: "Name",
      Footer: "Name",
      accessor: "name",
      Filter: NameFilter,
    },
    {
      Header: "Phone",
      Footer: "Phone",
      accessor: "phone",
      Filter: MobileFilter,
    },
    {
      Header: "Select",
      Footer: "Select",
      accessor: (e) => (
        <input
          type="checkbox"
          onChange={() => addUsers(e)}
          checked={selectedUsers.find((a) => a._id === e._id)}
        />
      ),
      disableFilters: true,
    },
  ];

  const submit = () => {
    dispatch(groupsActions.editGroup(group._id, selectedUsers, group));
    setSelectedUsers([]);

    closeModal();
  };

  return (
    <div>
      <div className={styles.closeDiv} onClick={closeModal}>
        <img src={close} className={styles.closeImg} alt="close" />
      </div>
      {users && users.length > 0 && (
        <div className={classes.tableCont}>
          <SmallTable
            Data={usersData}
            neededColumns={usersColums}
            check
            route=""
            filter
          />
          <div className={styles.buttonContainer}>
            <button className={classes.submitGroup} onClick={submit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectingTable;
