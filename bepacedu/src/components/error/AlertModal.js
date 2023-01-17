import { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./errorModal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOVerLay = (props) => {
  return (
    <div className={classes.modal}>
      <header className={classes.header}>
        <h2> {props.title} </h2>
      </header>
      <div className={classes.content}>
        <p className={classes.message}> {props.message} </p>
      </div>
      <footer className={classes.alertActions}>
        <button className={classes.button} onClick={props.onConfirm}>
          Yes
        </button>
        <button className={classes.button} onClick={props.onCancel}>
          Cancel
        </button>
      </footer>
    </div>
  );
};

const AlertModal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-alert-root")
      )}
      {ReactDom.createPortal(
        <ModalOVerLay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
        />,
        document.getElementById("overlay-alert-root")
      )}
    </Fragment>
  );
};

export default AlertModal;
