import React from "react";
import css from "../../course.module.css";

function Actions() {
  return (
    <div className={`container dark-bg ${css.actions}`}>
      <div className={css.action}>
        <img src="/img/user.png" alt="user" />
        <span>74</span>
      </div>
      <div className={css.action}>
        <img src="/img/star.png" alt="star" />
        <span>74</span>
      </div>
      <div className={css.action}>
        <img src="/img/heart.png" alt="heart" />
        <span>74</span>
      </div>
    </div>
  );
}

export default Actions;
