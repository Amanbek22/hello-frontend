import Css from "./slider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { fetchTopNews } from "../../../store/feature/news/news.action";
import { NavLink } from "react-router-dom";
import Preloader from "../../preloader/preloader";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const SlickSlider = () => {
  const dispatch = useDispatch();
  const { loading, topNews }: any = useSelector(
    (state: RootState) => state.news,
  );

  useEffect(() => {
    dispatch(fetchTopNews());
  }, []);
  return (
    <Slider {...settings} className={Css.slider}>
      {loading && <Preloader />}
      {topNews?.map((news: any) => (
        <NavLink
          key={news.id}
          className={Css.slide}
          to={`/news/top/${news.id}`}
        >
          <img
            src={news.images[0]}
            alt="news-image"
            className={Css.background}
          />
          <div className={Css.box_info}>
            <div className={Css.title}>{news.head}</div>
            <div
              className={Css.text}
              dangerouslySetInnerHTML={{ __html: news.description }}
            />
          </div>
        </NavLink>
      ))}
    </Slider>
  );
};

export default SlickSlider;
