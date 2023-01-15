import React, { useEffect, useState } from "react";

import classes from "./payments.module.css";
import styles from "./groups.module.css";
import cascading from "./course.module.css";

import { useDispatch, useSelector } from "react-redux";

import Switch from "react-switch";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import NameFilter from "../../components/table/NameFilter";
import MobileFilter from "../../components/table/MobileFilter";

import SmallTable from "../../components/table/SmallTable";

import * as paymentsActions from "../../store/payments/paymentsActions";

import receiptImg from "../../assets/receipt.png";
import na from "../../assets/na.png";
import close from "../../assets/close.png";
import ProgramFilter from "../../components/table/ProgramFilter";
import PaymentStatusFilter from "../../components/table/PaymentStatusFilter";
import { mainLink } from "../../store/link";
import { clearError, setError } from "../../store/auth/authActions";
import ErrorModal from "../../components/error/ErrorModal";

const Payments = () => {
  const { payments } = useSelector((state) => state.payments);

  const { token, error, errorMessage } = useSelector((state) => state.auth);

  const [openPayment, setOpenPayment] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [image, setImage] = useState("");
  const [paymentIndex, setPaymentIndex] = useState(null);
  const [participantIndex, setParticipantIndex] = useState(null);
  const [paymentListIndex, setPaymentListIndex] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptURL, setReceiptURL] = useState("");

  const dispatch = useDispatch();

  // ======================GRTTING PAYMENT DETAILS===================================================

  const changePayments = async (data) => {
    setOpenPayment(true);
    setSelectedUser(data);

    const response = await fetch(
      `${mainLink}/api/payments/user?userId=${data.userId}&courseId=${data.courseId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
    const resData = await response.json();

    const { userPayments, participants } = resData;

    const paymentIndex = userPayments.findIndex(
      (x) => x.courseId === data.courseId
    );
    const participantIndex = participants.findIndex(
      (d) => d.userId === data.userId
    );

    const listIndex = payments.findIndex(
      (r) => r.courseId === data.courseId && r.userId === data.userId
    );

    setPaymentListIndex(listIndex);

    setParticipantIndex(participantIndex);
    setPaymentIndex(paymentIndex);
    setPaymentDetails(data);
  };

  // ================================UPLOADING RECEIPT =============================================

  const uploadReceipt = (e) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }

    const storage = getStorage();
    const metadata = {
      contentType: "image/jpeg",
    };

    const storageRef = ref(
      storage,
      `${selectedUser.firstNaem}_${selectedUser.lastName}/receipts`
    );
    const uploadTask = uploadBytesResumable(
      storageRef,
      e.target.files[0],
      metadata
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");

        if (snapshot.state === "paused") {
          console.log("Upload is paused");
        }
        if (snapshot.state === "running") {
          console.log("Upload is running");
        }
      },
      (error) => {
        if (error.code === "storage/unauthorized") {
          return;
        }
        if (error.code === "storage/canceled") {
          return;
        }

        if (error.code === "storage/unknown") {
          return;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
        });
      }
    );
  };

  // ===================================SUBMITTING=================================================

  const receiptItem = () => {
    if (imageURL.length === 0) {
      dispatch(setError("Error", "You have to upload Receipt First"));
      return;
    }

    dispatch(
      paymentsActions.updatePayment(
        paymentDetails,
        paymentIndex,
        imageURL,
        participantIndex,
        paymentListIndex
      )
    );

    dispatch(paymentsActions.getPayments());

    setPaymentListIndex(null);
    setOpenPayment(false);
    setSelectedUser(null);
    setParticipantIndex(null);
    setPaymentIndex(null);
    setPaymentDetails(null);
  };

  // ==================================SHOWING RECEIPT=======================================

  const showReceiptFn = (data) => {
    setShowReceipt(true);
    setReceiptURL(data.receipt);
    console.log(data);
  };

  // ===========================COLUMNS===========================================================

  const neededColumns = [
    {
      Header: "User Data",
      Footer: "User Data",
      columns: [
        {
          Header: "Name",
          Footer: "Name",
          accessor: "userName",
          Filter: NameFilter,
        },
        {
          Header: "Phone",
          Footer: "Phone",
          accessor: "userPhone",
          Filter: MobileFilter,
        },
      ],
    },
    {
      Header: "Program",
      Footer: "Program",
      accessor: "courseName",
      Filter: ProgramFilter,
    },
    {
      Header: "Payments",
      Footer: "Payments",
      columns: [
        {
          Header: "Amount",
          Footer: "Amount",
          accessor: (cell) => {
            return (
              <strong className={classes.amount}>
                {" "}
                {cell.requiredPayments} ${" "}
              </strong>
            );
          },
          disableFilters: true,
        },
        {
          Header: "Status",
          Footer: "Status",
          accessor: "status",
          Filter: PaymentStatusFilter,
        },
        {
          Header: "Action",
          Footer: "Action",
          accessor: (cell) => {
            return (
              <Switch
                onChange={() => changePayments(cell)}
                checked={cell.status === "Paid"}
              />
            );
          },
          disableFilters: true,
        },
        {
          Header: "Receipt",
          Footer: "Receipt",
          accessor: (cell) => {
            return (
              <div
                className={classes.imageContainer}
                onClick={() => showReceiptFn(cell)}
              >
                <img
                  className={classes.receipt}
                  src={cell.status === "pending" ? na : receiptImg}
                  alt="Receipt"
                />
              </div>
            );
          },
          disableFilters: true,
        },
      ],
    },
  ];

  useEffect(() => {
    dispatch(paymentsActions.getPayments());
  }, [dispatch]);

  // ===========================ERROR HANDLING==========================================================

  const clearErrorFun = () => {
    dispatch(clearError());
  };

  if (error) {
    return (
      <ErrorModal
        title={error}
        message={errorMessage}
        onConfirm={clearErrorFun}
      />
    );
  }

  return (
    <div className={classes.tableContainer}>
      <SmallTable
        check
        route=""
        filter
        Data={payments}
        neededColumns={neededColumns}
      />
      <div className={openPayment ? styles.courseModal : styles.removeModal}>
        <div
          className={cascading.closeDiv}
          onClick={() => setOpenPayment(false)}
        >
          <img className={cascading.closeImg} src={close} alt="close" />
        </div>
        {selectedUser && (
          <div className={classes.paymentDetails}>
            <strong> {selectedUser.userName} </strong>
            <strong> {selectedUser.courseName} </strong>
            <strong> {selectedUser.requiredPayments} $ </strong>
            <div className={classes.row}>
              <button
                className={cascading.submitBtn}
                onClick={() => {
                  document.getElementById("upload").click();
                  return false;
                }}
              >
                Upload Receipt
              </button>
              <button className={cascading.submitBtn} onClick={() => {}}>
                Schedule Payment
              </button>
            </div>
            <input
              className={classes.uploadInput}
              id="upload"
              type="file"
              onChange={(e) => uploadReceipt(e)}
            />
          </div>
        )}
        <div className={cascading.buttonContainer}>
          <button
            className={cascading.submitBtn}
            style={{ backgroundColor: "#ff0055", marginTop: 100 }}
            onClick={receiptItem}
          >
            Submit
          </button>
        </div>
      </div>
      <div className={showReceipt ? styles.courseModal : styles.removeModal}>
        <div
          className={cascading.closeDiv}
          onClick={() => setShowReceipt(false)}
        >
          <img className={cascading.closeImg} src={close} alt="close" />
        </div>
        {receiptURL.length > 0 ? (
          <div className={classes.receiptContainer}>
            <img
              className={classes.receiptImage}
              src={receiptURL}
              alt="receipt"
            />
          </div>
        ) : (
          <div className={classes.receiptContainer}>
            <strong>User receipt not yet added</strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
