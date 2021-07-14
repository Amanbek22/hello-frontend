import React, { useEffect } from "react";
import css from "../../profile.module.css";
import NewsItem from "../../../../components/NewsItem/NewsItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/rootReducer";
import { fetchPersonalAds } from "../../../../../store/feature/personal/personal.actions";
import Preloader from "../../../../preloader/preloader";

const ProfileNews: React.FC = () => {
  const dispatch = useDispatch();
  const { news, loading } = useSelector((state: RootState) => state.personal);
  const { uid }: any = useSelector((state: RootState) => state.user.userInfo);

  useEffect(() => {
    dispatch(fetchPersonalAds(uid));
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className={css.content_container}>
      <div className={css.news_wrapper}>
        {news.map((item: any) => (
          <NewsItem
            id={item.id}
            key={item.id}
            img={item.images}
            head={item.head}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileNews;
