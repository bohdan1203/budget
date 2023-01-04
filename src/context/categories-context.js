import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const CategoriesContext = createContext({
  categories: {
    incomes: [],
    expenses: [],
  },
});

const initialCategories = {
  incomes: [
    {
      id: uuidv4(),
      type: "incomes",
      name: "Salary",
    },
  ],
  expenses: [
    {
      id: uuidv4(),
      type: "expenses",
      name: "Food",
    },
  ],
};

export const CategoriesProvider = (props) => {
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || initialCategories
  );

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const categoriesCtx = {
    categories: {
      incomes: categories.incomes,
      expenses: categories.expenses,
    },

    addCategory: ({ type, name }) => {
      setCategories((previousCategories) => {
        return {
          ...previousCategories,
          [type]: [...previousCategories[type], { id: uuidv4(), type, name }],
        };
      });
    },

    editCategory: ({ id, type, name }) => {
      setCategories((previousCategories) => {
        return {
          ...previousCategories,
          [type]: [...previousCategories[type]].map((category) => {
            if (category.id === id) {
              return { id, type, name };
            } else return category;
          }),
        };
      });
    },

    changeCategoryType: (id, oldType, newType) => {
      const updatedCategory = categories[oldType].find(
        (category) => category.id === id
      );

      setCategories((previousCategories) => {
        return {
          ...previousCategories,
          [oldType]: [...previousCategories[oldType]].filter(
            (category) => category.id !== id
          ),
          [newType]: [...previousCategories[newType], updatedCategory],
        };
      });
    },

    deleteCategory: (type, id) => {
      setCategories((previousCategories) => {
        return {
          ...previousCategories,
          [type]: [...previousCategories[type]].filter(
            (category) => category.id !== id
          ),
        };
      });
    },
  };

  return (
    <CategoriesContext.Provider value={categoriesCtx}>
      {props.children}
    </CategoriesContext.Provider>
  );
};
