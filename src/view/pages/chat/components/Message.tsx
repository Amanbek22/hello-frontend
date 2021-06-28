import React, { useEffect } from "react";
import css from "../chat.module.css";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";
import { useDispatch } from "react-redux";
import { updateSingleMessage } from "../../../../store/feature/chat/chat.action";

interface IProps {
  id: string;
  uid: string;
  text: string;
  time: any;
  type: number;
  read: boolean;
  chatId: string;
  docId: string;
}

const Message: React.FC<IProps> = ({
  id,
  uid,
  text,
  time,
  type,
  read,
  chatId,
  docId,
}) => {
  const dispatch = useDispatch();
  const date = new Date(parseInt(time) * 1000)
    .toString()
    .split(" ")
    .slice(4, -2)
    .join(" ")
    .split(":")
    .slice(0, -1)
    .join(":");

  useEffect(() => {
    if (uid !== id) {
      dispatch(updateSingleMessage({ doc: chatId, subDoc: docId }));
    }
  }, []);

  return (
    <div className={id === uid ? css.message__right : css.message__left}>
      <span className={css.time}>{date}</span>
      <div className={css.message__wrapper}>
        {type === 1 ? (
          <p className={css.message__text}>{text}</p>
        ) : (
          <img src={text} alt="image" className={css.message__img} />
        )}
        {read ? (
          <DoneAllIcon className={css.icon__check} />
        ) : (
          <DoneIcon className={css.icon__check} />
        )}
      </div>
    </div>
  );
};

export default Message;
