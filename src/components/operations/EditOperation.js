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
import ConfirmDeleting from "../ConfirmDeleting";

import classes from "./EditOperation.module.css";

const EditOperation = (props) => {
  const { operationToEdit, onClose } = props;
  const { id, type, category, amount, date, description } = operationToEdit;

  const defaultOperationState = {
    id,
    type,
    category,
    amount,
    date,
    description,
  };

  const { textContents } = useContext(LanguageContext);
  const { categories } = useContext(CategoriesContext);
  const budgetCtx = useContext(BudgetContext);

  const [editedOperation, setEditedOperation] = useState(defaultOperationState);
  const [isConfirmDeleting, setIsConfirmDeleting] = useState(false);

  function categoryChangeHandler(event) {
    setEditedOperation((previosState) => ({
      ...previosState,
      category: event.target.value,
    }));
  }

  function amountChangeHandler(event) {
    setEditedOperation((previosState) => ({
      ...previosState,
      amount: event.target.value && +event.target.value,
    }));
  }

  function dateChangeHandler(event) {
    setEditedOperation((previosState) => ({
      ...previosState,
      date: event.target.value,
    }));
  }

  function descriptionChangeHandler(event) {
    setEditedOperation((previosState) => ({
      ...previosState,
      description: event.target.value,
    }));
  }

  const deleteOperationHandler = () => {
    budgetCtx.deleteOperation(id);
    setIsConfirmDeleting(false);
    onClose();
  };

  function submitHandler(event) {
    event.preventDefault();
    budgetCtx.editOperation(editedOperation);
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
          value={editedOperation.category}
          required
          onChange={categoryChangeHandler}
        >
          <Option disabled />
          {categories[type + "s"].map((category) => (
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
          value={editedOperation.amount.toString()}
          required
          onChange={amountChangeHandler}
        />

        <Input
          type="date"
          id="date"
          label={textContents.labels.date}
          value={editedOperation.date}
          onChange={dateChangeHandler}
        />

        <Textarea
          id="description"
          label={textContents.labels.description}
          onChange={descriptionChangeHandler}
          value={editedOperation.description}
        />

        <div className={classes["button-group"]}>
          <Button
            type="submit"
            textContent={
              textContents.buttons[
                type === "income" ? "editIncome" : "editExpense"
              ]
            }
          />
          <Button
            additionalClasses="red"
            textContent={textContents.buttons.deleteCategory}
            onClick={() => setIsConfirmDeleting(true)}
          />
          <Button textContent={textContents.buttons.cancel} onClick={onClose} />
        </div>
      </ModalForm>

      {isConfirmDeleting && (
        <ConfirmDeleting
          onConfirmDeleting={deleteOperationHandler}
          onCloseModal={setIsConfirmDeleting.bind(null, false)}
        />
      )}
    </Fragment>
  );
};

export default EditOperation;
