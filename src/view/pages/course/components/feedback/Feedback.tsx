import React from "react";
import css from "./feedback.module.css";

function Feedback() {
  return (
    <div className={css.wrapper}>
      <img src="/img/like.png" alt="Like" />
      <img src="/img/message.png" alt="Feedback" />
    </div>
  );
}

export default Feedback;
