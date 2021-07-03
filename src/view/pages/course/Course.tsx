import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getData, db, updateData } from "../../../firebase/firebase.actions";
import {
  BilimModalType,
  TestModalType,
  VideoModalType,
} from "../../../models/type";
import Preloader from "../../preloader/preloader";
import CourseHeader from "./components/course-header/course-header";
import { ContentHeader } from "./components/content-header/content-header";
import css from "./course.module.css";
import Actions from "./components/actions/Actions";
import Feedback from "./components/feedback/Feedback";
import { Route, Switch } from "react-router-dom";
import Videos from "./components/video/Video";
import Tests from "./components/tests/Tests";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import firebase from "../../../firebase/firebase";

const Course = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [data, setData] = useState<BilimModalType | null>(null);
  const [videos, setVideos] = useState<VideoModalType[] | null>(null);
  const [tests, setTests] = useState<TestModalType[] | null>(null);
  const [pending, setPending] = useState(true);
  const [likes, setLikes] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const session: any = useSelector((state: RootState) => state.user.userData);
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
    });
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
    getData({ path: `bilim/${id}/likes` }).then((res) => {
      setLikes(res);
    });
    getData({ path: `bilim/${id}/reviews` }).then((res) => setReviews(res));

    return () => {
      updateData({
        path: "bilim",
        doc: id,
        data: { views: firebase.firestore.FieldValue.increment(1) },
      });
    };
  }, []);

  const addLike = async () => {
    setPending(true);
    if (session) {
      await db
        .collection("bilim")
        .doc(id)
        .update({ likes: data?.likes ? data?.likes + 1 : 1 });
      await db
        .collection("bilim")
        .doc(id)
        .collection("likes")
        .add({ user: session?.uid });
      await getData({ path: `bilim/${id}/likes` }).then((res) => {
        setLikes(res);
      });
      setPending(false);
    } else {
      setPending(false);
      history.push("/authentication");
    }
  };

  const addReview = async (reviewData: any) => {
    setPending(true);
    if (session) {
      const postData = {
        authorUid: session.uid,
        date: firebase.firestore.FieldValue.serverTimestamp(),
        ...reviewData,
      };
      await db.collection("bilim").doc(id).collection("reviews").add(postData);
      const allReviews = reviews
        ? reviews.reduce((sum: any, acc: any) => sum + acc.rating, 0) +
          reviewData.rating
        : reviewData.rating;
      await db
        .collection("bilim")
        .doc(id)
        .update({
          rating: parseInt((allReviews / (reviews.length + 1)).toFixed(1)),
        });
      await getData({ path: `bilim/${id}/reviews` }).then((res) =>
        setReviews(res),
      );
      setPending(false);
    } else {
      setPending(false);
      history.push("/authentication");
    }
  };

  console.log(reviews);

  if (pending) return <Preloader absolute />;

  return (
    <div>
      <CourseHeader
        name={`${data?.name}`}
        videos={data?.videoCount}
        tests={data?.testCount}
      />
      <Actions likes={data?.likes} rating={data?.rating} views={data?.views} />
      <div className={css.contentWrapper}>
        <Feedback
          ownerUid={data?.ownerUid}
          uid={session?.uid}
          likes={likes}
          addLike={addLike}
          addReview={addReview}
          reviews={reviews}
        />
        <ContentHeader />
        <Switch>
          <Route exact path="/course/:id/">
            {!!videos ? <Videos data={videos} /> : <Preloader />}
          </Route>
          <Route path="/course/:id/test">
            {!!tests ? <Tests data={tests} /> : <Preloader />}
          </Route>
          <Route path="/course/:id/more">"UpdateME"</Route>
        </Switch>
      </div>
    </div>
  );
};

export default Course;
