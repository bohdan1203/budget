import React, { Fragment, useContext, useReducer } from "react";

import { LanguageContext } from "../../context/language-context";
import { CategoriesContext } from "../../context/categories-context";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Backdrop from "../../components/UI/Backdrop";
import ModalForm from "../../components/UI/ModalForm";

import classes from "./CreateCategory.module.css";

const ACTIONS = {
  categoryType: "categoryType",
  categoryName: "categoryName",
};

const defaultCategoryState = {
  type: "",
  name: "",
};

const newCategoryReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.categoryType:
      return { ...state, type: action.value };
    case ACTIONS.categoryName:
      return { ...state, name: action.value };
    default:
      return defaultCategoryState;
  }
};

const CreateCategory = (props) => {
  const { textContents } = useContext(LanguageContext);
  const categoriesCtx = useContext(CategoriesContext);
  const [newCategoryState, dispatchNewCategory] = useReducer(
    newCategoryReducer,
    defaultCategoryState
  );

  function changeTypeHandler(categoryType) {
    dispatchNewCategory({ type: ACTIONS.categoryType, value: categoryType });
  }

  function changeNameHandler(event) {
    dispatchNewCategory({
      type: ACTIONS.categoryName,
      value: event.target.value,
    });
  }

  function sumbitHandler(event) {
    event.preventDefault();
    categoriesCtx.addCategory(newCategoryState);
    props.onCloseModal();
  }

  return (
    <Fragment>
      <Backdrop onClick={props.onCloseModal} />
      <ModalForm
        title={textContents.titles.newCategory}
        onSubmit={sumbitHandler}
      >
        <div className={classes["radio-group"]}>
          <Input
            additionalClasses="row-reverse"
            type="radio"
            name="type"
            label={textContents.labels.income}
            value="incomes"
            id="type-inc"
            required
            onChange={() => changeTypeHandler("incomes")}
          />
          <Input
            additionalClasses="row-reverse"
            type="radio"
            name="type"
            label={textContents.labels.expense}
            value="expenses"
            id="type-exp"
            required
            onChange={() => changeTypeHandler("expenses")}
          />
        </div>
        <Input
          id="name"
          label={textContents.labels.categoryName}
          required
          onChange={changeNameHandler}
        />
        <div className={classes["button-group"]}>
          <Button
            type="submit"
            textContent={textContents.buttons.createCategory}
          />
          <Button
            textContent={textContents.buttons.cancel}
            onClick={props.onCloseModal}
          />
        </div>
      </ModalForm>
    </Fragment>
  );
};

export default CreateCategory;
