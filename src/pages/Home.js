import React, { useContext, useState } from "react";

import { LanguageContext } from "../context/language-context";
import { CategoriesContext } from "../context/categories-context";
import { BudgetContext } from "../context/budget-context";

import Button from "../components/UI/Button";
import CreateOperation from "../components/operations/CreateOperation";
import OperationsTable from "../components/operations/OperationsTable";

import classes from "./Home.module.css";

const Home = () => {
  const { textContents } = useContext(LanguageContext);
  const budgetCtx = useContext(BudgetContext);
  const categoriesCtx = useContext(CategoriesContext);
  const [isAddType, setIsAddType] = useState(null);

  function addNewOperation(type) {
    setIsAddType(type);
  }

  return (
    <section className={classes.home}>
      <Button
        textContent={textContents.buttons.newIncome}
        onClick={addNewOperation.bind(null, "incomes")}
      />
      <Button
        textContent={textContents.buttons.newExpense}
        onClick={addNewOperation.bind(null, "expenses")}
      />

      <OperationsTable />

      {isAddType && (
        <CreateOperation
          type={isAddType}
          onClose={setIsAddType.bind(null, null)}
        />
      )}
    </section>
  );
};

export default Home;
