import React, { ChangeEvent, useEffect, useState } from "react";
import css from "./newsFull.module.css";
import SlickSlider from "../../components/Slider/SlickSlider";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import firebase from "../../../firebase/firebase";
import {
  createComments,
  fetchAuthor,
  fetchComments,
  fetchSingleNews,
} from "../../../store/feature/news/news.action";
import { RootState } from "../../../store/rootReducer";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ReplyIcon from "@material-ui/icons/Reply";
import { Divider, IconButton, TextField, withStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import UserCard from "./UserCard/UserCard";
import Preloader from "../../preloader/preloader";

const MyIButton = withStyles({
  root: {
    border: "1px solid #21A95D",
    width: 60,
    height: 60,
  },
})(IconButton);

const MyTextField = withStyles({
  root: {
    width: 585,
    height: 45,
    marginRight: 10,
    "& .MuiFilledInput-root": {
      borderRadius: "5px",
      "&::after": {
        content: "none",
      },
      "&::before": {
        content: "none",
      },
      "& .MuiFilledInput-input": {
        padding: "15px 20px",
        "&::placeholder": {
          fontSize: 14,
        },
      },
    },
  },
})(TextField);

const NewsFull = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { nid } = useParams<{ nid: string }>();
  const { loading, singleNews, author, comments }: any = useSelector(
    (state: RootState) => state.news,
  );
  const session: any = useSelector((state: RootState) => state.user.userData);
  const [message, setMessage] = useState<string>("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onCommentCreator = () => {
    if (message) {
      const data = {
        authorUid: session.uid,
        commentText: message,
        date: firebase.firestore.FieldValue.serverTimestamp(),
      };
      dispatch(createComments({ doc: nid, data: data }));
    }
    setMessage("");
  };

  useEffect(() => {
    dispatch(fetchSingleNews(nid));
    dispatch(fetchComments(nid));
    dispatch(fetchAuthor(singleNews.authorUid));
  }, [singleNews.length]);

  return (
    <div className={`${css.container}`}>
      <h1>Жаңылыктар</h1>
      <div className={css.container_slider}>
        <SlickSlider />
      </div>
      <div className={css.header}>
        <h1 className={css.header__text}>{singleNews.head}</h1>
        <MyIButton>
          <ChatBubbleOutlineIcon className={css.header__icon} />
        </MyIButton>
        <MyIButton>
          <ReplyIcon className={`${css.header__icon} ${css.reverse}`} />
        </MyIButton>
      </div>
      {author && (
        <UserCard
          id={author.uid}
          img={author.userPhoto}
          name={author.userName}
          time={singleNews.date?.seconds}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: singleNews.description }} />
      <div className={css.content__footer}>
        <span className={css.footer__count}>{singleNews.views}</span>
        <span className={css.footer__text}>раз прочитано</span>
        <span className={css.footer__count}>{singleNews.comments}</span>
        <span className={css.footer__text}>Комментарий</span>
      </div>
      <Divider />
      <p className={css.comments__header}>Комментарии</p>
      {loading && <Preloader />}
      {comments?.map((comment: any, index: number) => (
        <div key={index}>
          <UserCard
            id={comment.author?.uid}
            img={comment.author?.userPhoto}
            name={comment.author?.userName}
            time={comment.date?.seconds}
          />
          <p className={css.comments__text}>{comment.commentText}</p>
        </div>
      ))}

      {!!session ? (
        <>
          <Divider />
          <div className={css.authorized}>
            {session.userPhoto ? (
              <img
                src={session.userPhoto}
                className={css.avatar}
                alt="avatar"
              />
            ) : (
              <div className={css.avatar} />
            )}
            <MyTextField
              value={message}
              onChange={onChangeHandler}
              variant="filled"
              placeholder="Бул жерге жазыныз"
            />
            <IconButton onClick={onCommentCreator}>
              <SendIcon className={css.send__icon} />
            </IconButton>
          </div>
        </>
      ) : (
        <div className={css.unAuthorized}>
          <p className={css.unAuthorized__text}>
            Для комментариев вам необхадимо пройти регистрацию
          </p>
          <button
            className={css.unAuthorized__btn}
            onClick={() => history.push("/authentication")}
          >
            КАТТОДОН ОТУУ
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFull;
