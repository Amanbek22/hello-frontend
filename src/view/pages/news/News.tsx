import Css from "./news.module.css";
import LastNews from "./components/LastNews/LastNews";

const News = () => {
  return (
    <div className={`${Css.container}`}>
      <h1>Жаңылыктар</h1>
      <img src="/img/background_slider.svg" alt="background_slider" />
      <ul className={Css.list}>
        <li>Соңку кабар</li>
        <li>Конкурс и гранттар</li>
        <li>Интрервью</li>
        <li>Спорт</li>
        <li>Сүйүктүү кесип</li>
        <li>Маданият</li>
        {/*<li className={Css.point}>&#183;&#183;&#183;</li>*/}
      </ul>
      <div className={Css.box_card}>
        <LastNews />
        <LastNews />
      </div>
    </div>
  );
};

export default News;
