import React, { useContext, useReducer } from "react";

import { LanguageContext } from "../context/language-context";

import Button from "../components/UI/Button";
import CategoriesLists from "../components/categories/CategoriesLists";
import CreateCategory from "../components/categories/CreateCategory";
import EditCategory from "../components/categories/EditCategory";

import classes from "./Categories.module.css";

const ACTIONS = {
  createMode: "createMode",
  editMode: "editMode",
  closeModal: "closeModal",
};

const defaultModeState = {
  createMode: false,
  editMode: false,
  categoryToEdit: "",
};

const modeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.createMode:
      return { ...state, createMode: true };
    case ACTIONS.editMode:
      return { ...state, editMode: true, categoryToEdit: action.category };
    case ACTIONS.closeModal:
      return { createMode: false, editMode: false };
    default:
      return defaultModeState;
  }
};

const Categories = () => {
  const { textContents } = useContext(LanguageContext);
  const [modesState, dispatchModes] = useReducer(modeReducer, defaultModeState);

  function openAddCategoryModal() {
    dispatchModes({ type: ACTIONS.createMode });
  }

  function openEditCategoryModal(categoryToEdit) {
    dispatchModes({ type: ACTIONS.editMode, category: categoryToEdit });
  }

  function closeModal() {
    dispatchModes({ type: ACTIONS.closeModal });
  }

  return (
    <section className={classes.categories}>
      <header className={classes["categories-header"]}>
        <h1>{textContents.titles.categories}</h1>
        <Button
          textContent={textContents.buttons.addNewCategory}
          onClick={openAddCategoryModal}
        />
      </header>
      <CategoriesLists
        onOpenEditModal={openEditCategoryModal}
        onCloseModal={closeModal}
      />
      {modesState.createMode && <CreateCategory onCloseModal={closeModal} />}
      {modesState.editMode && (
        <EditCategory
          onCloseModal={closeModal}
          categoryToEdit={modesState.categoryToEdit}
        />
      )}
    </section>
  );
};

export default Categories;
