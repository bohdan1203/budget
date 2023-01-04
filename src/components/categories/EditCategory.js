import React, { Fragment, useContext, useReducer, useState } from "react";

import { LanguageContext } from "../../context/language-context";
import { CategoriesContext } from "../../context/categories-context";

import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Backdrop from "../../components/UI/Backdrop";
import ModalForm from "../../components/UI/ModalForm";
import ConfirmDeleting from "../../components/ConfirmDeleting";

import classes from "./EditCategory.module.css";

const ACTIONS = {
  categoryType: "categoryType",
  categoryName: "categoryName",
};

const EditCategory = (props) => {
  const { textContents } = useContext(LanguageContext);
  const categoriesCtx = useContext(CategoriesContext);
  const [isConfirmDeleting, setIsConfirmDeleting] = useState(false);

  const defaultCategoryState = props.categoryToEdit;

  const editCategoryReducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.categoryType:
        return { ...state, type: action.value };
      case ACTIONS.categoryName:
        return { ...state, name: action.value };
      default:
        return defaultCategoryState;
    }
  };

  const [editCategoryState, dispatchNewCategory] = useReducer(
    editCategoryReducer,
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

  const deleteCategoryHandler = () => {
    categoriesCtx.deleteCategory(
      defaultCategoryState.type,
      defaultCategoryState.id
    );
    props.onCloseModal();
  };

  function sumbitHandler(event) {
    event.preventDefault();

    const typeChanged = defaultCategoryState.type !== editCategoryState.type;

    if (typeChanged) {
      categoriesCtx.changeCategoryType(
        editCategoryState.id,
        defaultCategoryState.type,
        editCategoryState.type
      );
    }

    categoriesCtx.editCategory(editCategoryState);
    props.onCloseModal();
  }

  return (
    <Fragment>
      <Backdrop onClick={props.onCloseModal} />
      <ModalForm
        title={textContents.titles.editCategory}
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
            checked={editCategoryState.type === "incomes"}
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
            checked={editCategoryState.type === "expenses"}
            onChange={() => changeTypeHandler("expenses")}
          />
        </div>
        <Input
          id="name"
          label={textContents.labels.categoryName}
          required
          value={editCategoryState.name}
          onChange={changeNameHandler}
        />
        <div className={classes["button-group"]}>
          <Button
            type="submit"
            textContent={textContents.buttons.saveChanges}
          />
          <Button
            additionalClasses="red"
            textContent={textContents.buttons.deleteCategory}
            onClick={() => setIsConfirmDeleting(true)}
          />
          <Button
            textContent={textContents.buttons.cancel}
            onClick={props.onCloseModal}
          />
        </div>
      </ModalForm>

      {isConfirmDeleting && (
        <ConfirmDeleting
          onConfirmDeleting={deleteCategoryHandler}
          onCloseModal={setIsConfirmDeleting.bind(null, false)}
        />
      )}
    </Fragment>
  );
};

export default EditCategory;
