import React, { Fragment, useContext, useState } from "react";

import { LanguageContext } from "../../context/language-context";
import { CategoriesContext } from "../../context/categories-context";
import { BudgetContext } from "../../context/budget-context";

import Backdrop from "../UI/Backdrop";
import ModalForm from "../UI/ModalForm";
import Input from "../UI/Input";
import Textarea from "../UI/Textarea";
import Select from "../UI/Select";
import Option from "../UI/Option";
import Button from "../UI/Button";

import classes from "./CreateOperation.module.css";

const CreateOperation = (props) => {
  const { type, onClose } = props;

  const defaultOperationState = {
    type: type === "incomes" ? "income" : "expense",
    category: "",
    amount: "",
    date: "",
    description: "",
  };

  const { textContents } = useContext(LanguageContext);
  const { categories } = useContext(CategoriesContext);
  const budgetCtx = useContext(BudgetContext);
  const [newOperation, setNewOperation] = useState(defaultOperationState);

  function categoryChangeHandler(event) {
    setNewOperation((previosState) => ({
      ...previosState,
      category: event.target.value,
    }));
  }

  function amountChangeHandler(event) {
    setNewOperation((previosState) => ({
      ...previosState,
      amount: +event.target.value,
    }));
  }

  function dateChangeHandler(event) {
    setNewOperation((previosState) => ({
      ...previosState,
      date: event.target.value,
    }));
  }

  function descriptionChangeHandler(event) {
    setNewOperation((previosState) => ({
      ...previosState,
      description: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    budgetCtx.addNewOperation(newOperation);
    onClose();
  }

  return (
    <Fragment>
      <Backdrop onClick={onClose} />
      <ModalForm
        title={
          textContents.titles[type === "incomes" ? "newIncome" : "newExpense"]
        }
        onSubmit={submitHandler}
      >
        <Select
          id="category"
          label={textContents.labels.category}
          value={newOperation.category}
          required
          onChange={categoryChangeHandler}
        >
          <Option disabled />
          {categories[type].map((category) => (
            <Option
              key={category.id}
              value={category.name}
              textContent={category.name}
            />
          ))}
        </Select>

        <Input
          type="number"
          id="amount"
          label={textContents.labels.amount}
          required
          onChange={amountChangeHandler}
        />

        <Input
          type="date"
          id="date"
          label={textContents.labels.date}
          onChange={dateChangeHandler}
        />

        <Textarea
          id="description"
          label={textContents.labels.description}
          onChange={descriptionChangeHandler}
        />

        <div className={classes["button-group"]}>
          <Button
            type="submit"
            textContent={
              textContents.buttons[
                type === "incomes" ? "addIncome" : "addExpense"
              ]
            }
          />
          <Button textContent={textContents.buttons.cancel} onClick={onClose} />
        </div>
      </ModalForm>
    </Fragment>
  );
};

export default CreateOperation;
