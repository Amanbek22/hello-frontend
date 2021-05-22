import React from "react";
import css from "./video.module.css";
import { VideoModalType } from "../../../models/type";
import { Link } from "react-router-dom";

function Video({ name, description, thumbnail }: VideoModalType) {
  return (
    <div className={css.video}>
      <div className={css.imgWrapper}>
        <img src={thumbnail} alt="#" />
        <Link to="#">
          <img className={css.play} src="/img/play.png" alt="#" />
        </Link>
      </div>
      <div className={css.info}>
        <Link to="#" className={css.title} title={name}>
          {name}
        </Link>
        <p className={css.description}>{description}</p>
      </div>
    </div>
  );
}

export default Video;
