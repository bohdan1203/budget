import React from "react";

import TableHead from "./TableHead";
import TableBody from "./TableBody";

import classes from "./OperationsTable.module.css";

const OperationsTable = (props) => {
  return (
    <div className={classes["table-wrapper"]}>
      <table className={classes.table}>
        <TableHead />
        <TableBody onEditOperation={props.onEditOperation} />
      </table>
    </div>
  );
};

export default OperationsTable;
