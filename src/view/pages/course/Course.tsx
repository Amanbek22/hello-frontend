import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getData } from "../../../firebase/firebase.actions";
import { BilimModalType } from "../../../models/type";
import Preloader from "../../preloader/preloader";
import CourseHeader from "./components/course-header/course-header";
import { ContentHeader } from "./components/content-hedaer/content-header";
import css from "./course.module.css";
import Actions from "./components/actions/Actions";
import Feedback from "./components/feedback/Feedback";
import { Route, Switch } from "react-router-dom";
import Videos from "./components/video/Video";

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<BilimModalType | null>(null);
  const [videos, setVideos] = useState<any[] | null>(null);
  const [tests, setTests] = useState<any[] | null>(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    getData({ path: "bilim", doc: id })
      .finally(() => {
        setPending(false);
      })
      .then((res) => {
        setData(res);
      });
    getData({ path: `bilim/${id}/video` }).then((res) => {
      setVideos(res);
    });
    getData({ path: `bilim/${id}/tests` }).then((res) => {
      setTests(res);
    });
  }, []);
  if (pending) return <Preloader />;
  return (
    <div>
      <CourseHeader
        name={`${data?.name}`}
        videos={data?.videoCount}
        tests={data?.testCount}
      />
      <Actions />
      <div className={css.contentWrapper}>
        <Feedback />
        <ContentHeader />
        <Switch>
          <Route exact path="/course/:id/">
            {!!videos ? <Videos data={videos} /> : <Preloader />}
          </Route>
          <Route path="/course/:id/test">
            {!!tests ? "Tests" : <Preloader />}
          </Route>
          <Route path="/course/:id/more">more</Route>
        </Switch>
      </div>
    </div>
  );
};

export default Course;
