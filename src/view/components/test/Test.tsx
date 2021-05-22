import css from "./test.module.css";
import { TestModalType } from "../../../models/type";
import { Link } from "react-router-dom";
import React from "react";

function Test({ description, icon, name, questions }: TestModalType) {
  return (
    <div className={css.wrapper}>
      <div className={css.imgWrapper}>
        <img src={icon} alt="#" />
      </div>
      <div className={css.info}>
        <Link to="#" className={css.title} title={name}>
          {name}
        </Link>
        <div className={css.questions}>Суроолордун саны: {questions}</div>
        <p className={css.description}>{description}</p>
      </div>
    </div>
  );
}

export default Test;
