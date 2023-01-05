import React, { useContext, useEffect, useState } from "react";

import { TableProvider } from "../context/table-context";

import { LanguageContext } from "../context/language-context";
import { CategoriesContext } from "../context/categories-context";
import { BudgetContext } from "../context/budget-context";

import Button from "../components/UI/Button";
import CreateOperation from "../components/operations/CreateOperation";
import EditOperation from "../components/operations/EditOperation";
import OperationsTable from "../components/operations/OperationsTable";

import classes from "./Home.module.css";

const Home = () => {
  const { textContents } = useContext(LanguageContext);
  const budgetCtx = useContext(BudgetContext);
  const categoriesCtx = useContext(CategoriesContext);
  const [isAddType, setIsAddType] = useState(null);
  const [isEditOperation, setIsEditOperation] = useState(null);

  // useEffect(() => {
  //   console.log(isEditOperation);
  // }, [isEditOperation]);

  function addNewOperation(type) {
    setIsAddType(type);
  }

  return (
    <section className={classes.home}>
      <div className={classes["button-group"]}>
        <Button
          textContent={textContents.buttons.newIncome}
          onClick={addNewOperation.bind(null, "incomes")}
        />
        <Button
          textContent={textContents.buttons.newExpense}
          onClick={addNewOperation.bind(null, "expenses")}
        />
      </div>

      <TableProvider>
        <OperationsTable onEditOperation={setIsEditOperation} />
      </TableProvider>

      {isAddType && (
        <CreateOperation
          type={isAddType}
          onClose={setIsAddType.bind(null, null)}
        />
      )}

      {isEditOperation && (
        <EditOperation
          operationToEdit={isEditOperation}
          onClose={setIsEditOperation.bind(null, null)}
        />
      )}
    </section>
  );
};

export default Home;
