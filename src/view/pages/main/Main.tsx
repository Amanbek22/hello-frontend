import CourseCard from "../../components/courseCard/courseCard";
import Css from "./maine.module.css";
import CardCategory from "../../components/card_category/CardCategory";

const Main = () => {
  const backendtest = [
    {
      title: "Secom",
      img: "./img/categorySecom.png",
    },
    {
      title: "ЖРТ",
      img: "./img/categorySecom.png",
    },
    {
      title: "Алгебра",
      img: "./img/categorySecom.png",
    },
    {
      title: "Орус тили",
      img: "./img/categorySecom.png",
    },
    {
      title: "Орус тили",
      img: "./img/categorySecom.png",
    },
    {
      title: "Орус тили",
      img: "./img/categorySecom.png",
    },
  ];
  return (
    <div>
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
      <div className="container">
        <div className={Css.title}> Категориялар </div>
        <div className={Css.box_cards}>
          {backendtest.map((item) => (
            <CardCategory title={item.title} img={item.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
