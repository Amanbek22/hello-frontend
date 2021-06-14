import React from "react";
import css from "../communication.module.css";
import { Divider } from "@material-ui/core";

interface IProps {
  img: string | undefined;
  message: string | undefined;
  name: string;
  time: string | undefined;
}

const UserCard: React.FC<IProps> = ({ img, message, name, time }) => {
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
              Вы:
              <span className={css.message}>{message ? message : "Салам"}</span>
            </p>
          </div>
        </div>
        <p className={css.time}>{time ? time : "19:36"}</p>
      </div>
      <Divider />
    </>
  );
};

export default UserCard;
