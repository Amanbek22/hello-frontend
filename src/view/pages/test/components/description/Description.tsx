import React from "react";
import css from "../../test.module.css";

function Description({ count, question }: { count: string; question: string }) {
  return (
    <div className={css.question}>
      <div>Суроо {count}</div>
      <h3>{question}</h3>
    </div>
  );
}

export default Description;
