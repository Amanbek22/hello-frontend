import React, { memo } from "react";
import css from "../chat.module.css";
import DoneAllIcon from "@material-ui/icons/DoneAll";

interface IProps {
  id: string;
  uid: string;
  text: string;
  time: any;
}

const Message: React.FC<IProps> = ({ id, uid, text, time }) => {
  const date = new Date(parseInt(time) * 1000)
    .toString()
    .split(" ")
    .slice(4, -2)
    .join(" ")
    .split(":")
    .slice(0, -1)
    .join(":");

  return (
    <div className={id === uid ? css.message__right : css.message__left}>
      <span className={css.time}>{date}</span>
      <div className={css.message__wrapper}>
        <p className={css.message__text} style={{ maxWidth: 500 }}>
          {text}
        </p>
        <DoneAllIcon className={css.icon__check} />
      </div>
    </div>
  );
};

export default Message;
