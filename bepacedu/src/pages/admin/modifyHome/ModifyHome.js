import React, { useEffect, useState } from "react";

import classes from "./modify.module.css";

import * as authActions from "../../../store/auth/authActions";
import * as itemsActions from "../../../store/homeData/homeActions";

import { useDispatch, useSelector } from "react-redux";
import ErrorModal from "../../../components/error/ErrorModal";
import AdditionModal from "./AdditionModal";

import edit from "../../../assets/edit.png";
import deleteImg from "../../../assets/delete.png";

const ModifyHome = () => {
  const { error, errorMessage } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.home);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState("");
  const [selectedItem, setSelectedItem] = useState({});

  const dispatch = useDispatch();
  const clearError = () => {
    dispatch(authActions.clearError());
  };

  useEffect(() => {
    dispatch(itemsActions.getItems());
  }, [dispatch]);

  if (error) {
    return (
      <ErrorModal title={error} message={errorMessage} onConfirm={clearError} />
    );
  }

  const editData = (item) => {
    setOpenEdit(true);
    setSelectedItem(item);
  };

  const deleteItem = (id) => {};

  return (
    <div className={classes.homeContainer}>
      <button className={classes.add} onClick={() => setOpenAdd(true)}>
        Add Item
      </button>
      <div style={{ marginBottom: 25 }} />
      <div className={classes.innerContainer}>
        {items &&
          items.length > 0 &&
          items.map((item, index) => {
            return (
              <div
                className={
                  index === items.length - 1
                    ? classes.lastContainer
                    : classes.mainContainer
                }
                key={index}
              >
                <div className={classes.smallRow}>
                  <div className={classes.closeContainer}>
                    <img
                      src={edit}
                      className={classes.imageClose}
                      onClick={() => editData(item)}
                      alt="edit"
                    />
                  </div>
                  <div className={classes.closeContainer}>
                    <img
                      src={deleteImg}
                      className={classes.imageClose}
                      onClick={() => {}}
                      alt="delete"
                    />
                  </div>
                </div>
                <div className={classes.itemsContainer}>
                  <div className={classes.data}>
                    <strong> {item.title} </strong>
                    <p> {item.details} </p>
                  </div>
                  <img
                    className={classes.sideImage}
                    src={item.image}
                    alt="side"
                  />
                </div>
              </div>
            );
          })}
      </div>
      <div className={openAdd ? classes.modalOpened : classes.modalClosed}>
        <AdditionModal closeModal={() => setOpenAdd(false)} />
      </div>
      <div className={openEdit ? classes.modalOpened : classes.modalClosed}>
        <AdditionModal
          closeModal={() => {
            setOpenEdit(false);
            setSelectedItem([]);
          }}
          item={selectedItem}
          editing
        />
      </div>
    </div>
  );
};

export default ModifyHome;
