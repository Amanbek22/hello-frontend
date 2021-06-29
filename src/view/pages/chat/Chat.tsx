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
import { useHistory, useParams } from "react-router";
import ModalWindow from "../../components/modal/Modal";
import BlackList from "../../components/BlackList/BlackList";
import Message from "./components/Message";
import { Button, Divider, TextField, withStyles } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import { fetchVisitor } from "../../../store/feature/visitor/visitor.action";
import Preloader from "../../preloader/preloader";
import {
  createMessage,
  fetchChatRoom,
} from "../../../store/feature/chat/chat.action";
import firebase from "../../../firebase/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../../firebase/firebase.actions";

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

const Chat = () => {
  const history = useHistory();
  const { uid } = useParams<{ uid: string }>();
  const dispatch = useDispatch();
  const { visitor }: any = useSelector((state: RootState) => state.visitor);
  const user: any = useSelector((state: RootState) => state.user.userInfo);
  const { chatRoom }: any = useSelector((state: RootState) => state.chat);
  const [blackList, setBlackList] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [imageValue, setImageValue] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const messagesRef = useRef<HTMLDivElement>(null);

  const [snapshot, loading] = useCollection(
    db
      .collection("chats")
      .doc(chatRoom[0]?.id)
      .collection("messages")
      .orderBy("time"),
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onSubmitHandler = () => {
    const data = {
      messageText: value,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      senderUid: user.uid,
    };
    dispatch(createMessage({ doc: chatRoom[0]?.id, data }));
    setValue("");
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value !== "") {
      const data = {
        messageText: value,
        messageType: 1,
        time: firebase.firestore.FieldValue.serverTimestamp(),
        senderUid: user.uid,
      };
      dispatch(createMessage({ doc: chatRoom[0]?.id, data }));
      setValue("");
    }
  };

  const onConfirmHandler = () => {
    setImageModal(false);
    const payload = new FormData();
    payload.append("image", imageValue[0]);
    payload.append("code", "0");
    fetch("http://176.126.164.190:8000/api/image-create/", {
      method: "POST",
      body: payload,
    })
      .then((res) => res.json())
      .then((data) => {
        const postData = {
          messageText: data.image,
          messageType: 2,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          senderUid: user.uid,
        };
        dispatch(createMessage({ doc: chatRoom[0]?.id, data: postData }));
        setImageValue("");
      });
  };

  const setFile = (target: any) => {
    setImageValue(target.files);
    const reader = new FileReader();
    reader.readAsDataURL(target.files[0]);
    reader.onload = (e: any) => {
      const file = e.target.result;
      setImage(file);
      setImageModal(true);
    };
  };

  const closeImageModal = () => {
    setImageModal(false);
    setImage("");
    setImageValue("");
  };

  const openBlackListModal = () => {
    setBlackList(true);
  };

  const closeBlackListModal = () => {
    setBlackList(false);
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

  useEffect(() => {
    dispatch(fetchVisitor(uid));
    dispatch(fetchChatRoom({ user1: uid, user2: user.uid }));
  }, [uid]);

  useLayoutEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, 99999);
    }
  }, [snapshot]);

  return (
    <>
      {loading && <Preloader absolute />}
      <div>
        <ChatCard
          img={visitor?.userPhoto}
          addToBlackList={openBlackListModal}
          goToUserProfile={goToUserProfile}
          clickPhoto={onClickPhoto}
          closeConnect={onCloseConnect}
        />
      </div>

      <div className={css.box} ref={messagesRef}>
        {snapshot?.docs.map((doc: any) => (
          <Message
            key={doc.id}
            id={user.uid}
            docId={doc.id}
            uid={doc.data().senderUid}
            text={doc.data().messageText}
            time={doc.data().time?.seconds}
            type={doc.data().messageType}
            read={doc.data().read}
            chatId={chatRoom[0]?.id}
          />
        ))}
      </div>
      <div className={css.input__wrapper}>
        <MyTextField
          value={value}
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
        <MyButton onClick={onSubmitHandler} disabled={!value}>
          <SendRoundedIcon className={css.send__icon} />
        </MyButton>
      </div>

      <ModalWindow open={blackList} onClose={closeBlackListModal}>
        <BlackList addToBlackList={() => "added"} goBack={goBack} />
      </ModalWindow>
      <ModalWindow open={imageModal} onClose={closeImageModal}>
        <>
          <img src={image} alt="image" className={css.image_modal} />
          <Divider />
          <button className={css.image_confirm} onClick={onConfirmHandler}>
            Подтвердить
          </button>
        </>
      </ModalWindow>
    </>
  );
};

export default Chat;
