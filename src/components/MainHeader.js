import React, { useContext } from "react";

import { NavLink } from "react-router-dom";

import { LanguageContext } from "../context/language-context";
import { BudgetContext } from "../context/budget-context";

import Select from "../components/UI/Select";
import Option from "../components/UI/Option";

import classes from "./MainHeader.module.css";

const Header = () => {
  const { textContents, changeLanguage } = useContext(LanguageContext);
  const budgetCtx = useContext(BudgetContext);

  function selectLanguageHandler(event) {
    changeLanguage(event.target.value);
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/"
            >
              {textContents.mainHeader.home}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={(navData) => (navData.isActive ? classes.active : "")}
              to="/categories"
            >
              {textContents.mainHeader.categories}
            </NavLink>
          </li>
        </ul>
      </nav>

      <Select
        additionalClasses="select-white"
        label={textContents.labels.language}
        onChange={selectLanguageHandler}
      >
        <Option value="english" textContent="English" />
        <Option value="ukrainian" textContent="Українська" />
      </Select>

      <div className={classes.balance}>
        {textContents.mainHeader.balance}: {budgetCtx.balance}
      </div>
    </header>
  );
};

export default Header;
