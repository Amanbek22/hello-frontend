import React, { useState } from "react";
import Css from "../../news.module.css";
import styled from "styled-components";
import PopoverElement from "../../../../components/popover/PopoverElement";
import { NavLink } from "react-router-dom";

const anchorOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

const transformOrigin = {
  vertical: "top",
  horizontal: "right",
};

const Tab = styled.li`
  color: #7e7e7e;
  margin-right: 35px;
  cursor: pointer;
  &:last-child {
    margin-left: 0;
  }
  & > a {
    color: #7e7e7e;
  }
`;

interface IProps {
  tabs: any;
}

const ContentHeader: React.FC<IProps> = ({ tabs }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-profile-popover" : undefined;

  return (
    <>
      <ul className={Css.list}>
        <Tab>
          <NavLink exact to={`/news/all`} activeClassName={Css.active}>
            Соңку кабар
          </NavLink>
        </Tab>
        {tabs.map((cat: any, index: number) => {
          if (index <= 4) {
            return (
              <Tab key={cat.name}>
                <NavLink
                  exact
                  activeClassName={Css.active}
                  to={`/news/${cat.id}`}
                >
                  {cat.name}
                </NavLink>
              </Tab>
            );
          }
        })}

        <Tab className={Css.point} onClick={handlePopoverOpen}>
          &#183;&#183;&#183;
        </Tab>
      </ul>

      <PopoverElement
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handlePopoverClose}
        positionAnchor={anchorOrigin}
        positionTransform={transformOrigin}
      >
        <ul>
          {tabs.map((cat: any, index: number) => {
            if (index > 4) {
              return (
                <Tab key={cat.name} onClick={handlePopoverClose}>
                  <NavLink activeClassName={Css.active} to={`/news/${cat.id}`}>
                    {cat.name}
                  </NavLink>
                </Tab>
              );
            }
          })}
        </ul>
      </PopoverElement>
    </>
  );
};

export default ContentHeader;
