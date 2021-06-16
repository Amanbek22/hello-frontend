import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import css from "../../profile.module.css";
import styled from "styled-components";

const Tabs = styled.div`
  margin: 0 auto;
  padding: 0 100px;
  max-width: 1200px;
  width: 100%;
  background-color: #fff;
  border-radius: 50px;
`;

const Tab = styled.button`
  box-sizing: border-box;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 20px 17px 30px;
  border-bottom: 1px solid #e0e7ea;
  &:first-child {
    padding-left: 0;
  }
  &:hover {
    color: #21a95d;
    border-bottom-color: #21a95d;
  }
`;

const ContentHeader = () => {
  const { path } = useRouteMatch();
  return (
    <Tabs>
      <NavLink to={`${path}`} activeClassName={css.active}>
        <Tab>Жарнамалар</Tab>
      </NavLink>
      <NavLink to={`${path}/new`} activeClassName={css.active}>
        <Tab>Жаңылыктар</Tab>
      </NavLink>
      <NavLink to={`${path}/courses`} activeClassName={css.active}>
        <Tab>Курстар</Tab>
      </NavLink>
      <NavLink to={`${path}/followers`} activeClassName={css.active}>
        <Tab>Жүргүнчүлөр үчүн</Tab>
      </NavLink>
    </Tabs>
  );
};

export default ContentHeader;
