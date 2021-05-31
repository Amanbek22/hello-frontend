import Css from "./news.module.css";
import LastNews from "./components/LastNews/LastNews";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const News = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={`${Css.container}`}>
      <h1>Жаңылыктар</h1>
      <div className={Css.container_slider}>
        <Slider {...settings} className={Css.slider}>
          <div>
            <div className={Css.box_info}>
              <div className={Css.title}>
                Футбол тууралуу эмнелерди билесиңер?
              </div>
              <div className={Css.text}>
                Противоположная точка зрения подразумевает, что ключевые
                особенности структуры проекта набирают популярность среди
                определенных слоев населения, а значит, должны быть своевременно
                верифицированы. Но представители современных социальных резервов
                лишь добавляют Но представители современных социальных резервов
                лишь добавляют
              </div>
            </div>
          </div>
          <div>
            <div className={Css.box_info}>
              <div className={Css.title}>Как дела ?</div>
              <div className={Css.text}>
                Противоположная точка зрения подразумевает, что ключевые
                особенности структуры проекта набирают популярность среди
                определенных слоев населения, а значит, должны быть своевременно
                верифицированы. Но представители современных социальных резервов
                лишь добавляют Но представители современных социальных резервов
                лишь добавляют
              </div>
            </div>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
      <ul className={Css.list}>
        <li>Соңку кабар</li>
        <li>Конкурс и гранттар</li>
        <li>Интрервью</li>
        <li>Спорт</li>
        <li>Сүйүктүү кесип</li>
        <li>Маданият</li>
        <li className={Css.point}>&#183;&#183;&#183;</li>
      </ul>
      <div className={Css.box_card}>
        <LastNews />
        <LastNews />
      </div>
    </div>
  );
};

export default News;
