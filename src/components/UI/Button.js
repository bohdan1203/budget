import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  const { additionalClasses, type = "button", textContent, onClick } = props;

  return (
    <button
      className={`${classes.button} ${
        additionalClasses ? additionalClasses : ""
      }`}
      type={type}
      onClick={onClick}
    >
      {textContent}
    </button>
  );
};

export default Button;
