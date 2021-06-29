import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
const Friends = () => {
  const { myChats }: any = useSelector((state: RootState) => state.chat);
  const { userInfo }: any = useSelector((state: RootState) => state.user);
  return (
    <>
      {myChats.map((chat: any, index: any) => (
        <Link
          key={index}
          to={
            userInfo?.uid === chat.user?.[1]
              ? `/chat/${chat.user?.[0]}`
              : `/chat/${chat.user?.[1]}`
          }
        >
          <UserCard
            key={index}
            uid={userInfo?.uid}
            authorUid={chat.lastMessageSender}
            img={chat.author?.userPhoto}
            message={chat.lastMessage}
            name={chat.author?.userName}
            time={chat.lastMessageTime?.seconds}
            type={chat.lastMessageType}
          />
        </Link>
      ))}
    </>
  );
};

export default Friends;
