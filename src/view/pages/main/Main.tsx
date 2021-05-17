import CourseCard from "../../components/courseCard/courseCard";
import Css from "./main.module.css";

const Main = () => {
  return (
    <div className={Css.container}>
      <div className={Css.wrapper}>
        <div className={Css.text}>
          <div>Салам!</div>
          <div>Бул - дүйнө өзгөртө алчу эң күчтүү курал.</div>
        </div>
        <img src="./img/Group3.png" alt="Group3" />
      </div>
      <div className={Css.pop}>Эң популярдуулар</div>
      <div className={Css.cards}>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
      <div className={Css.new}>Эң жаңылар</div>
      <div className={Css.cards}>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default Main;
