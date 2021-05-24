import React from "react";
import css from "../../course.module.css";

interface PropsType {
  likes: number | undefined;
  rating: number | undefined;
  views: number | undefined;
}
function Actions({ likes, rating, views }: PropsType) {
  return (
    <div className={`container dark-bg ${css.actions}`}>
      <div className={css.action}>
        <img src="/img/user.png" alt="user" />
        <span>{views}</span>
      </div>
      <div className={css.action}>
        <img src="/img/star.png" alt="star" />
        <span>{rating}</span>
      </div>
      <div className={css.action}>
        <img src="/img/heart.png" alt="heart" />
        <span>{likes}</span>
      </div>
    </div>
  );
}

export default Actions;
