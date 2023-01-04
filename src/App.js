import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

import { CategoriesProvider } from "./context/categories-context";

import Home from "./pages/Home";
import Categories from "./pages/Categories";

import MainHeader from "./components/MainHeader";

const App = () => {
  return (
    <Fragment>
      <MainHeader />
      <CategoriesProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </CategoriesProvider>
    </Fragment>
  );
};

export default App;
