import React, { useState } from "react";
import css from "./communication.module.css";
import CommunicationCard from "./components/CommunicationCard";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import styled from "styled-components";
import { Divider } from "@material-ui/core";
import Friends from "./components/Friends";
import Connect from "./components/Connect";
import { NavLink, Route, Switch } from "react-router-dom";

const Tabs = styled.div`
  margin: 0 auto;
  padding: 0 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Communication = () => {
  const { userPhoto }: any = useSelector(
    (state: RootState) => state.user.userInfo,
  );

  const onNotificationHandler = () => {
    console.log("Clicked on notification icon");
  };

  return (
    <div>
      <CommunicationCard onClick={onNotificationHandler} img={userPhoto} />
      <div className={css.wrapper}>
        <div className={css.tabs}>
          <Tabs>
            <NavLink
              activeClassName={css.active}
              className={css.navlink}
              to="/communication"
            >
              Мактер
            </NavLink>
            <NavLink
              activeClassName={css.active}
              className={css.navlink}
              to="/communication/friends"
            >
              Достор
            </NavLink>
          </Tabs>
          <Divider />
        </div>
      </div>
      <div className={css.content__wrapper}>
        <Switch>
          <Route path="/communication" component={Connect} />
          <Route path="/communication/friends" component={Friends} />
        </Switch>
      </div>
    </div>
  );
};

export default Communication;
