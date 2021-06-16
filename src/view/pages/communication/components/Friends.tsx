import React from "react";
import css from "../communication.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
const Friends = () => {
  const user: any = useSelector((state: RootState) => state.user.userInfo);

  return (
    <>
      <Link to="/chat/1" className={css.link}>
        <UserCard
          img={user.userPhoto}
          message={user.message}
          name={user.userName}
          time={user.time}
        />
      </Link>
      <Link to="/chat/1">
        <UserCard
          img={user.userPhoto}
          message={user.message}
          name={user.userName}
          time={user.time}
        />
      </Link>
    </>
  );
};

export default Friends;
