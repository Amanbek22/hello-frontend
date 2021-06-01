import React from "react";
import css from "./video.module.css";
import { VideoModalType } from "../../../models/type";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

function Video({ name, description, thumbnail, id }: VideoModalType) {
  const params: { id: string } = useParams();
  return (
    <div className={css.video}>
      <div className={css.imgWrapper}>
        <img src={thumbnail} alt="#" />
        <Link to={`/course/lesson/${id}`}>
          <img className={css.play} src="/img/play.png" alt="#" />
        </Link>
      </div>
      <div className={css.info}>
        <Link
          to={`/lesson/${params.id}/${id}`}
          className={css.title}
          title={name}
        >
          {name}
        </Link>
        <p className={css.description}>{description}</p>
      </div>
    </div>
  );
}

export default Video;
