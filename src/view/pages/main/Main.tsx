import CourseCard from "../../components/courseCard/courseCard";
import Css from "./main.module.css";
import CardCategory from "../../components/card_category/CardCategory";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { BilimModalType } from "../../../models/type";
import { useEffect } from "react";

const Main = () => {
  const { categories, popular, newPosts }: any = useSelector(
    (state: RootState) => state.data,
  );
  const { uid }: any = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    const newsTime = JSON.parse(localStorage.getItem(uid) || "[]");
    const date = new Date();
    localStorage.setItem(
      uid,
      JSON.stringify(
        newsTime.filter(
          (el: any) => el?.time * 1000 * 60 * 24 * 30 - date.getTime() > 0,
        ),
      ),
    );
  }, []);

  return (
    <div>
      <div className={Css.container}>
        <div className={Css.wrapper}>
          <div className={Css.text}>
            <div>Салам!</div>
            <div>Бул - дүйнө өзгөртө алчу эң күчтүү курал.</div>
          </div>
          <img src="/img/Group3.png" alt="#" />
        </div>
        <div className={Css.pop}>Эң популярдуулар</div>
        <div className={Css.cards}>
          {popular?.map((item: BilimModalType) => (
            <CourseCard
              key={item.id}
              categoryName={item.categoryName}
              color={item.color}
              icon={item.icon}
              id={item.id}
              name={item.name}
              videoCount={item.videoCount}
              testCount={item.testCount}
            />
          ))}
        </div>
        <div className={Css.new}>Эң жаңылар</div>
        <div className={Css.cards}>
          {newPosts.map((item: BilimModalType) => (
            <CourseCard
              key={item.id}
              categoryName={item.categoryName}
              color={item.color}
              icon={item.icon}
              id={item.id}
              name={item.name}
              videoCount={item.videoCount}
              testCount={item.testCount}
            />
          ))}
        </div>
      </div>
      <div className="container">
        <div className={Css.title}> Категориялар </div>
        <div className={Css.box_cards}>
          {categories?.map((item: any) => (
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
