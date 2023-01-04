import React from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  const {
    additionalClasses,
    type = "text",
    id,
    name,
    value,
    label,
    checked,
    placeholder,
    required,
    step,
    onChange,
  } = props;

  return (
    <div
      className={`${classes["input-block"]} ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={classes.input}
        type={type}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        step={step}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
