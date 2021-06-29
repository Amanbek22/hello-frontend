import React from "react";
import css from "../communication.module.css";
import { Divider } from "@material-ui/core";

interface IProps {
  img: string | undefined;
  message: string;
  name: string;
  time: string;
  uid: any;
  authorUid: string;
}

const UserCard: React.FC<IProps> = ({
  img,
  message,
  name,
  time,
  uid,
  authorUid,
}) => {
  const date = new Date(parseInt(time) * 1000)
    .toString()
    .split(" ")
    .slice(4, -2)
    .join(" ")
    .split(":")
    .slice(0, -1)
    .join(":");

  return (
    <>
      <div className={css.userCard}>
        <div className={css.userCard__right}>
          {img ? (
            <img src={img} className={css.avatar} alt="avatar" />
          ) : (
            <div className={css.avatar} />
          )}
          <div>
            <p className={css.name}>{name}</p>
            <p className={css.you}>
              <span>{uid === authorUid ? "Вы:" : "Не вы:"}</span>
              <span className={css.message}>{message}</span>
            </p>
          </div>
        </div>
        <p className={css.time}>{date}</p>
      </div>
      <Divider />
    </>
  );
};

export default UserCard;
