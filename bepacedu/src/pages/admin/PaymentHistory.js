import React, { useEffect, useState } from "react";
import classes from "./paymentHistory.module.css";

import itemStyles from "./payments.module.css";
import styles from "./groups.module.css";
import cascading from "./course.module.css";
import { useDispatch, useSelector } from "react-redux";

import * as paymentsActions from "../../store/payments/paymentsActions";

import moment from "moment";

import receipt from "../../assets/receipt.png";
import close from "../../assets/close.png";
import NameFilter from "../../components/table/NameFilter";
import ProgramFilter from "../../components/table/ProgramFilter";
import SecondTable from "../../components/table/SecondTable";

const PaymentHistory = (props) => {
  const { paymentHistory } = useSelector((state) => state.payments);

  const [receiptURL, setReceiptURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [totalValue, setTotalValue] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(paymentsActions.getHistory());
  }, [dispatch]);

  const showReceipt = (data) => {
    setShowModal(true);
    setReceiptURL(data.receipt);
  };

  useEffect(() => {
    const values = paymentHistory.map((a) => a.value);
    const totalValues = values.reduce((a, b) => a + b, 0);

    setTotalValue(totalValues);
  }, [paymentHistory]);

  const neededColumns = [
    {
      Header: "User",
      Footer: "User",
      accessor: "userName",
      Filter: NameFilter,
    },
    {
      Header: "Program",
      Footer: "Program",
      accessor: "courseName",
      Filter: ProgramFilter,
    },
    {
      Header: "Amount",
      Footer: "Amount",
      accessor: (cell) => {
        return <strong className={itemStyles.amount}> {cell.value} $ </strong>;
      },
      disableFilters: true,
    },
    {
      Header: "Date",
      Footer: "Date",
      accessor: "date",
      disableFilters: true,
    },
    {
      Header: "Received By",
      Footer: "Received By",
      accessor: "adminName",
      Filter: NameFilter,
    },
    {
      Header: "Receipt",
      Footer: "Receipt",
      accessor: (cell) => {
        return (
          <div
            className={itemStyles.imageContainer}
            onClick={() => showReceipt(cell)}
          >
            <img className={itemStyles.receipt} src={receipt} alt="Receipt" />
          </div>
        );
      },
      disableFilters: true,
    },
  ];
  return (
    <div className={classes.historyContainer}>
      <div className={classes.totalTable}>
        {totalValue && (
          <table className={classes.valueTable}>
            <thead>
              <th>Total Value</th>
              <th>Last Updated</th>
            </thead>
            <tbody>
              <tr>
                <td> {totalValue} $ </td>
                <td> {moment(new Date()).format("DD/MM/YYYY")} </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div
        className={showModal ? cascading.courseModal : cascading.removeModal}
      >
        <div className={cascading.closeDiv} onClick={() => setShowModal(false)}>
          <img className={cascading.closeImg} src={close} alt="close" />
        </div>
        <div className={itemStyles.center}>
          <div className={itemStyles.receiptContainer}>
            <img
              className={itemStyles.receiptImage}
              src={receiptURL}
              alt="receipt"
            />
          </div>
        </div>
      </div>
      {paymentHistory && paymentHistory.length > 0 && (
        <div className={itemStyles.tableContainer}>
          <SecondTable
            neededColumns={neededColumns}
            Data={paymentHistory}
            check
            route=""
            filter
          />
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
