import React from "react";

import classes from "./Option.module.css";

const Option = (props) => {
  const { value = "", textContent, disabled } = props;

  return (
    <option className={classes.option} value={value} disabled={disabled}>
      {textContent}
    </option>
  );
};

export default Option;
