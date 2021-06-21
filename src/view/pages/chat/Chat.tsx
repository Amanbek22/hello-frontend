import React, {
  ChangeEvent,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import css from "./chat.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import ChatCard from "./components/ChatCard";
import { useLocation } from "react-router-dom";
import { useHistory, useParams } from "react-router";
import ModalWindow from "../../components/modal/Modal";
import BlackList from "../../components/BlackList/BlackList";
import Message from "./components/Message";
import { Button, TextField, withStyles } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import { fetchVisitor } from "../../../store/feature/visitor/visitor.action";
import Preloader from "../../preloader/preloader";
import {
  createMessage,
  fetchChatRoom,
} from "../../../store/feature/chat/chat.action";
import firebase from "../../../firebase/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase/firebase.actions";
import { type } from "os";

const MyButton = withStyles({
  root: {
    backgroundColor: "#21A95D",
    minWidth: 40,
    height: 40,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#21A95D ",
    },
    "&:focus": {
      backgroundColor: "#21A95D ",
    },
    "&:active": {
      backgroundColor: "#21A95D ",
    },
  },
})(Button);

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
        padding: "15px 30px 15px 20px",
        "&::placeholder": {
          fontSize: 14,
        },
      },
    },
  },
})(TextField);

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Chat = () => {
  const history = useHistory();
  const { uid } = useParams<{ uid: string }>();
  const dispatch = useDispatch();
  const { visitor }: any = useSelector((state: RootState) => state.visitor);
  const user: any = useSelector((state: RootState) => state.user.userInfo);
  const { chatRoom }: any = useSelector((state: RootState) => state.chat);
  const query = useQuery();
  const [blackList, setBlackList] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const messagesRef = useRef<HTMLDivElement>(null);

  const [messages, loading] = useCollectionData(
    db
      .collection("chats")
      .doc(chatRoom[0]?.id)
      .collection("messages")
      .orderBy("time"),
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onSubmitHandler = () => {
    const data = {
      messageText: message,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      senderUid: user.uid,
    };
    dispatch(createMessage({ doc: chatRoom[0]?.id, data }));
    setMessage("");
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (message !== "") {
        const data = {
          messageText: message,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          senderUid: user.uid,
        };
        dispatch(createMessage({ doc: chatRoom[0]?.id, data }));
        setMessage("");
      }
    }
  };

  const onBlackList = () => {
    history.push({
      pathname: history.location.pathname,
      search: !blackList ? `?black-list=true` : "",
    });
  };

  const goBack = () => {
    history.goBack();
  };

  const goToUserProfile = () => {
    history.push(`/user/${uid}`);
  };

  const onClickPhoto = () => {
    console.log("Clicked on 'Медия жана суроттор'");
  };

  const onCloseConnect = () => {
    console.log("Clicked on 'Маекти Очуруу'");
  };

  const setFile = (target: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = (e: any) => {
      const file = e.target.result;
      console.log(file);
    };
  };

  useEffect(() => {
    dispatch(fetchVisitor(uid));
    dispatch(fetchChatRoom({ user1: uid, user2: user.uid }));
  }, [uid]);

  useEffect(() => {
    setBlackList(Boolean(query.get("black-list")));
  }, [query]);

  useLayoutEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, 99999);
    }
  }, [messages]);

  return (
    <>
      {loading && <Preloader absolute />}
      <div>
        <ChatCard
          img={visitor?.userPhoto}
          addToBlackList={onBlackList}
          goToUserProfile={goToUserProfile}
          clickPhoto={onClickPhoto}
          closeConnect={onCloseConnect}
        />
      </div>

      <div className={css.box} ref={messagesRef}>
        {messages?.map((message: any, index: number) => (
          <Message
            key={index}
            id={user.uid}
            uid={message.senderUid}
            text={message.messageText}
            time={message.time?.seconds}
          />
        ))}
      </div>
      <div className={css.input__wrapper}>
        <MyTextField
          value={message}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          variant="filled"
          placeholder="Бул жерге жазыныз"
        />
        <AttachFileRoundedIcon className={css.attach__icon} />
        <input
          onChange={({ target }) => setFile(target)}
          type="file"
          accept="image/*,image/jpeg"
          className={css.input}
        />
        <MyButton onClick={onSubmitHandler} disabled={!message}>
          <SendRoundedIcon className={css.send__icon} />
        </MyButton>
      </div>

      <ModalWindow open={blackList} onClose={onBlackList}>
        <BlackList addToBlackList={() => "added"} goBack={goBack} />
      </ModalWindow>
    </>
  );
};

export default Chat;
