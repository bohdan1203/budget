import React, { useContext, useEffect, useState } from "react";

import { LanguageContext } from "../../context/language-context";
import { BudgetContext } from "../../context/budget-context";
import { TableContext } from "../../context/table-context";

import Button from "../UI/Button";

const TableBody = (props) => {
  const { textContents } = useContext(LanguageContext);
  const { operations } = useContext(BudgetContext);
  const { sorting } = useContext(TableContext);

  const [operationsList, setOperationsList] = useState(operations);

  function sortOperations(a, b) {
    if (sorting.ascending) {
      return a[sorting.sortBy] < b[sorting.sortBy] ? -1 : 1;
    } else {
      return a[sorting.sortBy] < b[sorting.sortBy] ? 1 : -1;
    }
  }

  useEffect(() => {
    setOperationsList([...operations].sort(sortOperations));
  }, [sorting, operations]);

  return (
    <tbody>
      {operationsList.map((operation) => {
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

export default TableBody;
