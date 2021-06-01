import CourseCard from "../../components/courseCard/courseCard";
import Css from "./maine.module.css";
import CardCategory from "../../components/card_category/CardCategory";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";

const Main = () => {
  const categories: any = useSelector(
    (state: RootState) => state.data.categories,
  );

  return (
    <div>
      <div className={Css.container}>
        <div className={Css.wrapper}>
          <div className={Css.text}>
            <div>Салам!</div>
            <div>Бул - дүйнө өзгөртө алчу эң күчтүү курал.</div>
          </div>
          <img src="./img/Group3.png" alt="#" />
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
          {categories.map((item: any) => (
            <CardCategory
              key={item.id}
              color={item.color}
              id={item.id}
              title={item.name}
              img={item.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
