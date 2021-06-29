import Css from "./newsItem.module.css";
import { NavLink } from "react-router-dom";
import React from "react";

interface IProps {
  id: string;
  img: any;
  head: string;
  description: string;
  category: string;
}

const NewsItem: React.FC<IProps> = ({
  id,
  img,
  head,
  description,
  category,
}) => {
  return (
    <div className={`${Css.container}`}>
      <div className={Css.box}>
        <img
          src={img[0]}
          alt="news"
          width="215"
          height="195"
          className={Css.image}
        />
        <div className={Css.box_info}>
          <div className={Css.title}>{head}</div>
          <div
            className={Css.text}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <NavLink to={`/news/${category}/${id}`} className={Css.link}>
            Читать полностью
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
