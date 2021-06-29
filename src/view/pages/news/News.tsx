import Css from "./news.module.css";
import NewsItem from "./components/NewsItem/NewsItem";
import "../../components/Slider/news.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewCats,
  fetchNews,
} from "../../../store/feature/news/news.action";
import { RootState } from "../../../store/rootReducer";
import SlickSlider from "../../components/Slider/SlickSlider";
import ContentHeader from "./components/ContentHeader/ContentHeader";
import { Route, Switch, useParams } from "react-router-dom";
import Preloader from "../../preloader/preloader";

const News = () => {
  const dispatch = useDispatch();
  const { loading, newsCats, news }: any = useSelector(
    (state: RootState) => state.news,
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchNewCats());
    dispatch(fetchNews(id));
  }, [id]);

  return (
    <div className={`${Css.container}`}>
      <h1>Жаңылыктар</h1>
      <div className={Css.container_slider}>
        <SlickSlider />
      </div>
      <ContentHeader tabs={newsCats} />
      <div className={Css.box_card}>
        <Switch>
          <Route exact path={`/news/all`}>
            {loading && <Preloader />}
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
          </Route>
          <Route exact path={`/news/:id`}>
            {loading && <Preloader />}
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
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default News;
