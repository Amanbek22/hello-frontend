import React from "react";
import { NavLink } from "react-router-dom";
import css from "../../course.module.css";
import { useParams } from "react-router";

export const ContentHeader = () => {
  const { id }: { id: string } = useParams();
  return (
    <div className={css.content__header}>
      <NavLink exact activeClassName={css.activeLink} to={`/course/${id}/`}>
        Видео сабактар
      </NavLink>
      <NavLink exact activeClassName={css.activeLink} to={`/course/${id}/test`}>
        Тесттер
      </NavLink>
      <NavLink exact activeClassName={css.activeLink} to={`/course/${id}/more`}>
        Кошумча материалдар
      </NavLink>
    </div>
  );
};
