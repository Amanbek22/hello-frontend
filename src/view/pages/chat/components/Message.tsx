import React from "react";
import css from "../chat.module.css";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const Message = () => {
  return (
    <div className={css.message}>
      <span className={css.time}>19:36</span>
      <div className={css.message__wrapper}>
        <p className={css.message__text}>Cалам</p>
        <DoneAllIcon className={css.icon__check} />
      </div>
    </div>
  );
};

export default Message;
