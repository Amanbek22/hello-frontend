import css from "./category.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { db, fetchData } from "../../../firebase/firebase.actions";
import Preloader from "../../preloader/preloader";
import { BilimModalType } from "../../../models/type";
import CourseCard from "../../components/courseCard/courseCard";

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const [state, setState] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    const res = await db
      .collection("bilim")
      .where("category", "==", parseInt(id));
    const result = await fetchData(res);
    setState(result);
    setLoading(false);
  };

  const getCategory = async () => {
    setLoading(true);
    const res = await db.collection("bilimcats").doc(id);
    const snapshot = await res.get();
    setCategory(snapshot.data());
    setLoading(false);
  };

  useEffect(() => {
    getData();
    getCategory();
  }, [id]);

  if (loading) {
    return <Preloader absolute />;
  }

  return (
    <div>
      <div className={css.card_wrapper}>
        <div className={css.objects}>
          <img src={category?.icon} alt="objects" className={css.image} />
        </div>
        <div className={css.title_wrapper}>
          <div className={css.title}>{category?.name}</div>
          <div className={css.subtitle}>{category?.description}</div>
        </div>
      </div>
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
