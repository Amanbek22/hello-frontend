import React, { useState } from "react";
import css from "./communication.module.css";
import CommunicationCard from "./components/CommunicationCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import styled from "styled-components";
import { Divider } from "@material-ui/core";
import Friends from "./components/Friends";
import Connect from "./components/Connect";

const Tabs = styled.div`
  margin: 0 auto;
  padding: 0 100px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Tab = styled.button`
  width: 118px;
  box-sizing: border-box;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin: 20px 0 22px 70px;
  padding: 6px 20px;
  color: #7e7e7e;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    color: #21a95d;
    border-bottom-color: #21a95d;
  }
  &.active {
    width: 118px;
    background-color: #21a95d;
    color: #fff;
    border-radius: 5px;
    &:hover {
      color: #fff;
    }
  }
`;

const Communication = () => {
  const { userPhoto }: any = useSelector(
    (state: RootState) => state.user.userInfo,
  );

  const [tabIndex, setTabIndex] = useState<number>(0);

  const onNotificationHandler = () => {
    console.log("Clicked on notification icon");
  };

  return (
    <div>
      <CommunicationCard onClick={onNotificationHandler} img={userPhoto} />
      <div className={css.box}>
        <div className={css.wrapper}>
          <div className={css.tabs}>
            <Tabs>
              <Tab
                className={tabIndex === 0 ? "active" : ""}
                onClick={() => setTabIndex(0)}
              >
                Маектер
              </Tab>
              <Tab
                className={tabIndex === 1 ? "active" : ""}
                onClick={() => setTabIndex(1)}
              >
                Достор
              </Tab>
            </Tabs>
            <Divider />
            <div className={css.content__wrapper}>
              {tabIndex === 0 ? <Connect /> : <Friends />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
