import React from "react";

import CategoriesList from "./CategoriesList";

import classes from "./CategoriesLists.module.css";

const CategoriesLists = (props) => {
  return (
    <div className={classes["categories-lists"]}>
      <CategoriesList type="incomes" onOpenEditModal={props.onOpenEditModal} />
      <CategoriesList type="expenses" onOpenEditModal={props.onOpenEditModal} />
    </div>
  );
};

export default CategoriesLists;
