import React from "react";

import classes from "./Textarea.module.css";

const Textarea = (props) => {
  const {
    additionalClasses,
    id,
    label,
    placeholder,
    rows = 5,
    onChange,
    children,
  } = props;

  return (
    <div
      className={`${classes["textarea-block"]} ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      <label className={classes.label} htmlFor={id}>
        {label}
      </label>
      <textarea
        className={classes.textarea}
        id={id}
        placeholder={placeholder}
        rows={rows}
        onChange={onChange}
      >
        {children}
      </textarea>
    </div>
  );
};

export default Textarea;
