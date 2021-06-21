import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchData,
  getData,
  setData,
} from "../../../firebase/firebase.actions";
import { db } from "../../../firebase/firebase.actions";
import chatSlice from "./chat.slice";
import { ChatModalType } from "../../../models/type";

export const fetchChatRoom = createAsyncThunk(
  "chat/ChatRoom",
  async ({ user1, user2 }: any, { dispatch }) => {
    dispatch(chatSlice.actions.setLoading(true));
    try {
      const res = await db
        .collection("chats")
        .where("chatId", "in", [user1 + user2, user2 + user1]);
      const result = await fetchData(res);
      if (result.length <= 0) {
        const data: ChatModalType = {
          chatId: user1 + user2,
          chatType: 0,
          lastMessage: "",
          lastMessageRead: false,
          lastMessageSender: "",
          lastMessageTime: "",
          lastMessageType: 0,
          user: [user1, user2],
        };
        await db.collection("chats").add(data);
        dispatch(fetchChatRoom({ user1, user2 }));
      } else {
        dispatch(chatSlice.actions.setChatRoom(result));
      }
    } catch (e) {
      dispatch(chatSlice.actions.setError(e));
    }
  },
);

export const fetchMessages = createAsyncThunk(
  "chat/getMessages",
  async (doc: string, { dispatch }) => {
    try {
      const res = await getData({
        path: "chats",
        doc: doc,
        path2: "messages",
        order: "time",
      });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(chatSlice.actions.setMessages(result));
    } catch (e) {
      dispatch(chatSlice.actions.setError(e));
    }
  },
);

export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async ({ doc, data }: any, { dispatch }) => {
    dispatch(chatSlice.actions.setLoading(true));
    const postData = {
      messageType: 1,
      read: false,
      replyUid: null,
      receiverUid: null,
      senderName: null,
      ...data,
    };
    try {
      await setData({
        path: "chats",
        doc: doc,
        path2: "messages",
        data: postData,
      });
      dispatch(fetchMessages(doc));
    } catch (e) {
      dispatch(chatSlice.actions.setError(e));
    }
  },
);
