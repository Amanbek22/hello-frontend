import Css from "./../../news.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./newsSlider.css";

export default function NewsSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };
  return (
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
          <h1>3</h1>
        </div>
        <div>
          <h1>4</h1>
        </div>
        <div>
          <h1>5</h1>
        </div>
        <div>
          <h1>6</h1>
        </div>
      </Slider>
    </div>
  );
}
