import React from "react";
import css from "../newsFull.module.css";
import { Link } from "react-router-dom";

interface IProps {
  img: string | undefined;
  name: string;
  time: string;
  id: string;
}

const UserCard: React.FC<IProps> = ({ img, name, time, id }) => {
  const date = new Date(parseInt(time) * 1000)
    .toString()
    .split(" ")
    .slice(1, -2)
    .join(" ");
  return (
    <Link to={`/user/${id}`}>
      <div className={css.userCard}>
        {img ? (
          <img src={img} className={css.avatar} alt="avatar" />
        ) : (
          <div className={css.avatar} />
        )}
        <div>
          <p className={css.userCard__name}>{name}</p>
          <p className={css.userCard__time}>{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
