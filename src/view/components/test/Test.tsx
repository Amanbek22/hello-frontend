import css from "./test.module.css";
import { TestModalType } from "../../../models/type";
import { Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router";

function Test({ description, icon, name, questions, id }: TestModalType) {
  const params: { id: string } = useParams();
  return (
    <div className={css.wrapper}>
      <div className={css.imgWrapper}>
        <img src={icon} alt="#" />
      </div>
      <div className={css.info}>
        <Link
          to={`/test/${params.id}/${id}`}
          className={css.title}
          title={name}
        >
          {name}
        </Link>
        <div className={css.questions}>Суроолордун саны: {questions}</div>
        <p className={css.description}>{description}</p>
      </div>
    </div>
  );
}

export default Test;
