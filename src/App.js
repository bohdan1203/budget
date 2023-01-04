import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import { CategoriesProvider } from "./context/categories-context";
import { BudgetProvider } from "./context/budget-context";

import Home from "./pages/Home";
import Categories from "./pages/Categories";

import MainHeader from "./components/MainHeader";

const App = () => {
  return (
    <Fragment>
      <BudgetProvider>
        <MainHeader />
        <CategoriesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </CategoriesProvider>
      </BudgetProvider>
    </Fragment>
  );
};

export default App;
