import css from "./category.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { db, fetchData } from "../../../firebase/firebase.actions";
import Preloader from "../../preloader/preloader";
import { BilimModalType } from "../../../models/type";
import CourseCard from "../../components/courseCard/courseCard";

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState([]);
  const [loading, setLodaing] = useState<boolean>(false);

  const getData = async () => {
    setLodaing(true);
    const res = await db
      .collection("bilim")
      .where("category", "==", parseInt(id));
    const result = await fetchData(res);
    setState(result);
    setLodaing(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div>
      <div className={css.card_wrapper}>
        <div className={css.objects}>
          <img src="/img/objects.png" alt="objects" />
        </div>
        <div className={css.title_wrapper}>
          <div className={css.title}>ЖРТ</div>
          <div className={css.subtitle}>ЖРТга даярдык үчүн курстар</div>
        </div>
      </div>
      {loading && <Preloader />}
      <div className={css.cards}>
        {state?.map((item: BilimModalType) => (
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
  );
};

export default Category;
