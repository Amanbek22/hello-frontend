import Css from "./slider.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  return (
    <Slider {...settings} className={Css.slider}>
      <div className={Css.slide}>
        <img
          src="https://images.unsplash.com/photo-1623578965058-c150ad0a8bcf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2382&q=80"
          alt=""
          className={Css.background}
        />
        <div className={Css.box_info}>
          <div className={Css.title}>Футбол тууралуу эмнелерди билесиңер?</div>
          <div className={Css.text}>
            Противоположная точка зрения подразумевает, что ключевые особенности
            структуры проекта набирают популярность среди определенных слоев
            населения, а значит, должны быть своевременно верифицированы. Но
            представители современных социальных резервов лишь добавляют Но
            представители современных социальных резервов лишь добавляют
          </div>
        </div>
      </div>
      <div className={Css.slide}>
        <img
          src="https://images.unsplash.com/photo-1623578965058-c150ad0a8bcf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2382&q=80"
          alt=""
          className={Css.background}
        />
        <div className={Css.box_info}>
          <div className={Css.title}>Как дела ?</div>
          <div className={Css.text}>
            Противоположная точка зрения подразумевает, что ключевые особенности
            структуры проекта набирают популярность среди определенных слоев
            населения, а значит, должны быть своевременно верифицированы. Но
            представители современных социальных резервов лишь добавляют Но
            представители современных социальных резервов лишь добавляют
          </div>
        </div>
      </div>
      <div className={Css.slide}>
        <img
          src="https://images.unsplash.com/photo-1623578965058-c150ad0a8bcf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2382&q=80"
          alt=""
          className={Css.background}
        />
        <h1>3</h1>
      </div>
      <div className={Css.slide}>
        <img
          src="https://images.unsplash.com/photo-1623578965058-c150ad0a8bcf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2382&q=80"
          alt=""
          className={Css.background}
        />
        <h3>4</h3>
      </div>
      <div className={Css.slide}>
        <img
          src="https://images.unsplash.com/photo-1623578965058-c150ad0a8bcf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2382&q=80"
          alt=""
          className={Css.background}
        />
        <h3>5</h3>
      </div>
      <div className={Css.slide}>
        <img
          src="https://images.unsplash.com/photo-1623578965058-c150ad0a8bcf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2382&q=80"
          alt=""
          className={Css.background}
        />
        <h3>6</h3>
      </div>
    </Slider>
  );
};

export default SlickSlider;
