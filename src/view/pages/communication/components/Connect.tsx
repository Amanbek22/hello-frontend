import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";

const Connect = () => {
  const user: any = useSelector((state: RootState) => state.user.userInfo);
  return (
    <>
      <Link to={`/chat/${user.uid}`}>
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

export default Connect;
