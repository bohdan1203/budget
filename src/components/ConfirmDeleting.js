import React, { Fragment, useContext } from "react";

import { LanguageContext } from "../context/language-context";

import Backdrop from "./UI/Backdrop";
import ModalForm from "./UI/ModalForm";
import Button from "./UI/Button";

import classes from "./ConfirmDeleting.module.css";

const ConfirmDeleting = (props) => {
  const { textContents } = useContext(LanguageContext);

  function confirmDeletingCategory(event) {
    event.preventDefault();
    props.onConfirmDeleting();
    props.onCloseModal();
  }

  return (
    <Fragment>
      <Backdrop style={{ zIndex: 4 }} onClick={props.onCloseModal} />
      <ModalForm
        style={{ zIndex: 5 }}
        title={textContents.titles.confirmAction}
        onSubmit={confirmDeletingCategory}
      >
        <p>{textContents.messages.deleteCategory}</p>
        <div className={classes["button-group"]}>
          <Button
            type="submit"
            additionalClasses="red"
            textContent={textContents.buttons.delete}
          />
          <Button
            textContent={textContents.buttons.cancel}
            onClick={props.onCloseModal}
          />
        </div>
      </ModalForm>
    </Fragment>
  );
};

export default ConfirmDeleting;
