import React, { useContext, useReducer } from "react";

import { LanguageContext } from "../../context/language-context";
import { CategoriesContext } from "../../context/categories-context";

import Button from "../UI/Button";

import classes from "./CategoriesList.module.css";

const CategoriesList = (props) => {
  const { textContents } = useContext(LanguageContext);
  const { categories } = useContext(CategoriesContext);

  return (
    <div className={classes["categories-list"]}>
      <h2>{textContents.titles[props.type]}</h2>
      <ul>
        {categories[props.type].map((category) => (
          <li key={category.id}>
            <span>{category.name}</span>
            <Button
              textContent={textContents.buttons.edit}
              onClick={() => props.onOpenEditModal(category)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
