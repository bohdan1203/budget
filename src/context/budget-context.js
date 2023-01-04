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

    setBalance(newBalance);

    localStorage.setItem("operations", JSON.stringify(operations));
  }, [operations]);

  const budgetCtx = {
    operations,
    balance,

    addNewOperation: (newOperation) => {
      setOperations((prevOperations) => {
        return [
          ...prevOperations,
          {
            ...newOperation,
            id: uuidv4(),
            date: newOperation.date || new Date().toISOString().slice(0, 10),
          },
        ];
      });
    },
  };

  return (
    <BudgetContext.Provider value={budgetCtx}>
      {props.children}
    </BudgetContext.Provider>
  );
};
