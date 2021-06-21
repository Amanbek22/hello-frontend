import React from "react";
import css from "../newsFull.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";

interface IProps {
  img: string | undefined;
  name: string;
  time: string;
  id: string;
}

const UserCard: React.FC<IProps> = ({ img, name, time, id }) => {
  const { uid }: any = useSelector((state: RootState) => state.user.userInfo);

  const date = new Date(parseInt(time) * 1000)
    .toString()
    .split(" ")
    .slice(1, -2)
    .join(" ");
  return (
    <Link to={id === uid ? `/profile` : `/user/${id}`}>
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
