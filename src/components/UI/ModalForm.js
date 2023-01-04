import React from "react";

import classes from "./ModalForm.module.css";

const ModalForm = (props) => {
  return (
    <form
      className={classes.form}
      style={props.style}
      onSubmit={props.onSubmit}
    >
      <h2>{props.title}</h2>
      {props.children}
    </form>
  );
};

export default ModalForm;
