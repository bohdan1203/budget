import { createContext, useState } from "react";

export const TableContext = createContext({ sorting: {} });

export const TableProvider = (props) => {
  const [sorting, setSorting] = useState({ sortBy: "date", ascending: true });

  const tableContext = {
    sorting,

    sortTable: (sortBy) => {
      if (sortBy === sorting.sortBy) {
        setSorting((prev) => ({ ...prev, ascending: !prev.ascending }));
      } else {
        setSorting({ sortBy, ascending: true });
      }
    },
  };

  return (
    <TableContext.Provider value={tableContext}>
      {props.children}
    </TableContext.Provider>
  );
};
