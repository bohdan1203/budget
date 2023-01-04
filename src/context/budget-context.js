import { createContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

export const BudgetContext = createContext({
  operations: [],
  balance: 0,
});

export const BudgetProvider = (props) => {
  const [operations, setOperations] = useState(
    JSON.parse(localStorage.getItem("operations")) || []
  );
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    console.table(operations);

    const newBalance =
      operations.length > 0
        ? operations.reduce((acc, cur) => {
            if (cur.type === "income") {
              return acc + cur.amount;
            } else {
              return acc - cur.amount;
            }
          }, 0)
        : 0;

    setBalance(Math.round(newBalance * 100) / 100);

    localStorage.setItem("operations", JSON.stringify(operations));
  }, [operations]);

  const budgetCtx = {
    operations,
    balance,

    addNewOperation: (newOperation) => {
      setOperations((previousOperations) => {
        return [
          ...previousOperations,
          {
            ...newOperation,
            id: uuidv4(),
            date: newOperation.date || new Date().toISOString().slice(0, 10),
          },
        ];
      });
    },

    editOperation: (editedOperation) => {
      setOperations((previousOperations) => {
        return [...previousOperations].map((operation) => {
          if (operation.id === editedOperation.id) {
            return editedOperation;
          } else {
            return operation;
          }
        });
      });
    },

    deleteOperation: (id) => {
      setOperations((previousOperations) => {
        return [...previousOperations].filter(
          (operation) => operation.id !== id
        );
      });
    },
  };

  return (
    <BudgetContext.Provider value={budgetCtx}>
      {props.children}
    </BudgetContext.Provider>
  );
};
