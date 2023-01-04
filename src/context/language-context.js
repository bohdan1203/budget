import { createContext, useEffect, useState } from "react";

const ENGLISH = {
  mainHeader: {
    home: "Home",
    categories: "Categories",
    balance: "Balance",
  },

  titles: {
    categories: "Categories",
    incomes: "Incomes",
    expenses: "Expenses",
    newCategory: "New Category",
    editCategory: "Edit Category",
    confirmAction: "Confirm Action",
  },

  labels: {
    language: "Language",
    income: "Income",
    expense: "Expense",
    categoryName: "Category Name",
  },

  buttons: {
    addNewCategory: "Add New Category",
    cancel: "Cancel",
    createCategory: "Create Category",
    edit: "Edit",
    saveChanges: "Save Changes",
    deleteCategory: "Delete Category",
    delete: "Delete",
  },

  messages: {
    deleteCategory: "Are you sure you want to delete this category?",
  },
};

const UKRAINIAN = {
  mainHeader: {
    home: "Головна",
    categories: "Категорії",
    balance: "Баланс",
  },

  titles: {
    categories: "Категорії",
    incomes: "Доходи",
    expenses: "Витрати",
    newCategory: "Нова категорія",
    editCategory: "Редагувати категорію",
    confirmAction: "Підтвердьте дію",
  },

  labels: {
    language: "Мова",
    income: "Дохід",
    expense: "Витрата",
    categoryName: "Назва категорії",
  },

  buttons: {
    addNewCategory: "Додати нову категорію",
    cancel: "Скасувати",
    createCategory: "Створити категорію",
    edit: "Редагувати",
    saveChanges: "Зберегти зміни",
    deleteCategory: "Видалити категорію",
    delete: "Видалити",
  },

  messages: {
    deleteCategory: "Ви впевнені, що хочете видалити цю категорію?",
  },
};

export const LanguageContext = createContext(ENGLISH);

export const LanguageProvider = (props) => {
  const [language, setLanguage] = useState(ENGLISH);

  const languageCtx = {
    textContents: language,
    changeLanguage: (newLanguage) => {
      switch (newLanguage) {
        case "english":
          setLanguage(ENGLISH);
          break;
        case "ukrainian":
          setLanguage(UKRAINIAN);
          break;
        default:
          setLanguage(language);
          break;
      }
    },
  };

  return (
    <LanguageContext.Provider value={languageCtx}>
      {props.children}
    </LanguageContext.Provider>
  );
};
