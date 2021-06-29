import React from "react";
import css from "./friendship.module.css";
import UserCard from "./components/UserCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";

const Friendship = () => {
  const user: any = useSelector((state: RootState) => state.user.userInfo);

  const onFriendConfirm = () => {
    console.log("confirm");
  };

  const onFriendRefuse = () => {
    console.log("refuse");
  };
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.header}>Запросы на дружбу</h1>
        <UserCard
          id={user?.uid}
          img={user?.userPhoto}
          name={user?.userName}
          city={user?.userAddressText}
          onConfirm={onFriendConfirm}
          onRefuse={onFriendRefuse}
        />
      </div>
    </div>
  );
};

export default Friendship;
