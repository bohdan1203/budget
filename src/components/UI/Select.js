import React from "react";

import classes from "./Select.module.css";

const Select = (props) => {
  const {
    additionalClasses,
    id,
    value,
    label,
    required,
    multiple,
    onChange,
    children,
  } = props;

  return (
    <div
      className={`${classes["select-block"]} ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <select
        className={classes.select}
        id={id}
        value={value}
        required={required}
        multiple={multiple}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
