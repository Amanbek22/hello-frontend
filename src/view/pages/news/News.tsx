import { Route, Switch } from "react-router-dom";
import NewsSlider from "./components/news_slider/newsSlider";
import Css from "./news.module.css";
import LastNews from "./components/last_news/LastNews";

const News = () => {
  return (
    <div className={`${Css.container}`}>
      <h1>Жаңылыктар</h1>
      <NewsSlider />
      <ul className={Css.list}>
        <li>Соңку кабар</li>
        <li>Конкурс и гранттар</li>
        <li>Интрервью</li>
        <li>Спорт</li>
        <li>Сүйүктүү кесип</li>
        <li>Маданият</li>
        <li className={Css.point}>&#8226; &#8226; &#8226;</li>
      </ul>
      <div className={Css.box_card}>
        <LastNews />
        <LastNews />
      </div>
    </div>
  );
};

export default News;
