import { createContext, useState } from "react";

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
    newIncome: "New Income",
    newExpense: "New Expense",
  },

  labels: {
    language: "Language",
    income: "Income",
    expense: "Expense",
    categoryName: "Category Name",
    category: "Category",
    amount: "Amount",
    date: "Date",
    description: "Description",
  },

  buttons: {
    addNewCategory: "Add New Category",
    cancel: "Cancel",
    createCategory: "Create Category",
    edit: "Edit",
    saveChanges: "Save Changes",
    deleteCategory: "Delete Category",
    delete: "Delete",
    newIncome: "New Income",
    newExpense: "New Expense",
    addIncome: "Add Income",
    addExpense: "Add Expense",
    editIncome: "Edit Income",
    editExpense: "Edit Expense",
    filterTable: "Filter Table",
  },

  tables: {
    type: "Type",
    category: "Category",
    amount: "Amount",
    description: "Description",
    date: "Date",
    edit: "Edit",
    income: "Income",
    expense: "Expense",
  },

  messages: {
    deleteCategory: "Are you sure?",
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
    newIncome: "Новий дохід",
    newExpense: "Нова витрата",
  },

  labels: {
    language: "Мова",
    income: "Дохід",
    expense: "Витрата",
    categoryName: "Назва категорії",
    category: "Категорія",
    amount: "Сума",
    date: "Дата",
    description: "Опис",
  },

  buttons: {
    addNewCategory: "Додати нову категорію",
    cancel: "Скасувати",
    createCategory: "Створити категорію",
    edit: "Редагувати",
    saveChanges: "Зберегти зміни",
    deleteCategory: "Видалити категорію",
    delete: "Видалити",
    newIncome: "Новий дохід",
    newExpense: "Нова витрата",
    addIncome: "Додати дохід",
    addExpense: "Додати витрату",
    editIncome: "Редагувати дохід",
    editExpense: "Редагувати витрату",
    filterTable: "Фільтрувати таблицю",
  },

  tables: {
    type: "Тип",
    category: "Категорія",
    amount: "Сума",
    description: "Опис",
    date: "Дата",
    edit: "Редагувати",
    income: "Дохід",
    expense: "Витрата",
  },

  messages: {
    deleteCategory: "Ви впевнені?",
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
