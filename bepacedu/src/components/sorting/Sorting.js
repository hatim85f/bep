import classes from "./Sorting.module.css";

import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcDownload,
} from "react-icons/fc";

const Sorting = (props) => {
  return (
    <div className={classes.excel}>
      {!props.noDownload && (
        <FcDownload className={classes.icons} onClick={props.export} />
      )}
      {props.canDelete && (
        <i className="fa-solid fa-trash" onClick={props.delete} />
      )}
      {props.editable && (
        <i className="fa-solid fa-pen-to-square" onClick={props.edit} />
      )}
      <FcAlphabeticalSortingAz
        className={classes.icons}
        onClick={props.sortAZ}
      />
      <FcAlphabeticalSortingZa
        className={classes.icons}
        onClick={props.sortZA}
      />
    </div>
  );
};

export default Sorting;
