import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./forms.module.css";

import * as formsActions from "../../../store/forms/formsActions";

import { AiOutlineClose } from "react-icons/ai";

const FormsShowPage = () => {
  const { forms, comments } = useSelector((state) => state.forms);

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();

  console.log(forms);

  useEffect(() => {
    dispatch(formsActions.getComment());
    dispatch(formsActions.getForms());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.innerRow}>
        <div className={classes.itemContainer}>
          <h3>Forms</h3>
          {forms.map((f, i) => {
            return (
              <div
                className={classes.item}
                key={i}
                onClick={() => {
                  setOpenModal(true);
                  setSelectedItem(f);
                }}
              >
                <strong> Contact from {f.name} </strong>
              </div>
            );
          })}
        </div>
        <div className={classes.itemContainer}>
          <h3>Comments</h3>
          {comments.map((c, i) => {
            return (
              <div
                className={classes.item}
                key={i}
                onClick={() => {
                  setOpenModal(true);
                  setSelectedItem(c);
                }}
              >
                <strong> Comment from {c.name} </strong>
              </div>
            );
          })}
        </div>
      </div>
      <div className={openModal ? classes.openModal : classes.closeModal}>
        <div className={classes.iconContainer}>
          <AiOutlineClose
            onClick={() => setOpenModal(false)}
            className={classes.icon}
          />
        </div>
        {selectedItem && (
          <div className={classes.itemSelected}>
            <strong> {selectedItem.name} </strong>
            <strong> {selectedItem.email} </strong>
            <strong> {selectedItem.mobile} </strong>
            <strong> {selectedItem.whatsApp} </strong>
            <strong> {selectedItem.website} </strong>
            <strong> {selectedItem.message} </strong>
            <strong> {selectedItem.comment} </strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormsShowPage;
