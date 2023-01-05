import React, { useContext, useState } from "react";

import { LanguageContext } from "../../context/language-context";
import { TableContext } from "../../context/table-context";

const TableHead = () => {
  const { textContents } = useContext(LanguageContext);
  const { sorting, sortTable } = useContext(TableContext);

  const arrow = <span>{sorting.ascending ? "🔼" : "🔽"}</span>;

  function sortHandler(sortBy) {
    sortTable(sortBy);
  }

  return (
    <thead>
      <tr>
        <th onClick={sortHandler.bind(null, "type")}>
          {textContents.tables.type} {sorting.sortBy === "type" && arrow}
        </th>
        <th onClick={sortHandler.bind(null, "category")}>
          {textContents.tables.category}{" "}
          {sorting.sortBy === "category" && arrow}
        </th>
        <th onClick={sortHandler.bind(null, "amount")}>
          {textContents.tables.amount} {sorting.sortBy === "amount" && arrow}
        </th>
        <th onClick={sortHandler.bind(null, "description")}>
          {textContents.tables.description}{" "}
          {sorting.sortBy === "description" && arrow}
        </th>
        <th onClick={sortHandler.bind(null, "date")}>
          {textContents.tables.date} {sorting.sortBy === "date" && arrow}
        </th>
        <th>{textContents.tables.edit}</th>
      </tr>
    </thead>
  );
};

export default TableHead;
