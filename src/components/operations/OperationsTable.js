import React, { useContext } from "react";

import { LanguageContext } from "../../context/language-context";
import { BudgetContext } from "../../context/budget-context";

import Button from "../UI/Button";

import classes from "./OperationsTable.module.css";

const TableHead = () => {
  const { textContents } = useContext(LanguageContext);

  return (
    <thead>
      <tr>
        <th>{textContents.tables.type}</th>
        <th>{textContents.tables.category}</th>
        <th>{textContents.tables.amount}</th>
        <th>{textContents.tables.description}</th>
        <th>{textContents.tables.date}</th>
        <th>{textContents.tables.edit}</th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  const { textContents } = useContext(LanguageContext);
  const { operations } = useContext(BudgetContext);

  return (
    <tbody>
      {operations.map((operation) => {
        return (
          <tr key={operation.id}>
            <td>
              {
                textContents.tables[
                  operation.type === "income" ? "income" : "expense"
                ]
              }
            </td>
            <td>{operation.category}</td>
            <td>{operation.amount}</td>
            <td>{operation.description}</td>
            <td>{operation.date}</td>
            <td>
              <Button
                textContent={textContents.buttons.edit}
                onClick={() => props.onEditOperation(operation)}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

const OperationsTable = (props) => {
  return (
    <table className={classes.table}>
      <TableHead />
      <TableBody onEditOperation={props.onEditOperation} />
    </table>
  );
};

export default OperationsTable;
