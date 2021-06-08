import React, { useState } from "react";
import css from "./profile.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import styled from "styled-components";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Advertisement from "./components/Advertisment/Advertisement";
import Photos from "./components/Photos/Photos";

const Tabs = styled.div`
  margin: 30px 0px 40px;
  text-align: center;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  margin-left: 50px;
  cursor: pointer;
  padding-bottom: 10px;
  &:first-child {
    margin-left: 0;
  }
`;

const Profile = () => {
  const user: any = useSelector((state: RootState) => state.user.userInfo);
  const [index, setIndex] = useState(0);

  const onChangeTabs = (number: number) => {
    setIndex(number);
  };

  return (
    <div className={css.container}>
      <ProfileCard
        name={user?.userName}
        img={user?.userPhoto}
        city={user?.userAddressText}
        photoCount={user?.images}
        profession={user?.bio}
      />
      <Tabs>
        <Tab
          className={index === 0 ? css.active : ""}
          onClick={() => onChangeTabs(0)}
        >
          Жарнамалар
        </Tab>
        <Tab
          className={index === 1 ? css.active : ""}
          onClick={() => onChangeTabs(1)}
          disabled={user?.images === 0}
        >
          Сүрөттөр
        </Tab>
      </Tabs>
      {index === 0 ? <Advertisement /> : <Photos />}
    </div>
  );
};

export default Profile;
