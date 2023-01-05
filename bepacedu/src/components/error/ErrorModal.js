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
      <footer className={classes.actions}>
        <button className={classes.button} onClick={props.onConfirm}>
          Okay
        </button>
      </footer>
    </div>
  );
};

const ErrorModal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <ModalOVerLay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
};

export default ErrorModal;
