import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchData,
  setData,
  updateData,
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

export const createMessage = createAsyncThunk(
  "chat/createMessage",
  async ({ doc, data }: any, { dispatch }) => {
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
      dispatch(updateChat({ doc, data }));
    } catch (e) {
      dispatch(chatSlice.actions.setError(e));
    }
  },
);

const updateChat = createAsyncThunk(
  "chat/update",
  async ({ doc, data }: any, { dispatch }) => {
    const postData = {
      lastMessage: data.messageText,
      lastMessageRead: false,
      lastMessageSender: data.senderUid,
      lastMessageTime: data.time,
    };
    try {
      await updateData({ path: "chats", doc: doc, data: postData });
    } catch (e) {
      dispatch(chatSlice.actions.setError(e));
    }
  },
);

export const fetchMyChats = createAsyncThunk(
  "chat/myChats",
  async (id: string, { dispatch }) => {
    dispatch(chatSlice.actions.setLoading(true));
    try {
      const res = await db
        .collection("chats")
        .where("user", "array-contains", id);
      const result = await fetchData(res);
      dispatch(chatSlice.actions.setMyChats(result));
    } catch (e) {
      dispatch(chatSlice.actions.setError(e));
    }
  },
);
