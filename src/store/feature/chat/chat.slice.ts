import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  chatRoom: [],
  myChats: [{ author: {} }] as any,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    setChatRoom(state, action: PayloadAction<any>) {
      state.chatRoom = action.payload;
      state.error = null;
      state.loading = false;
    },
    setMyChats(state, action: PayloadAction<any>) {
      state.myChats = action.payload;
      state.error = null;
      state.loading = false;
    },
    setMyChatsAuthor(state, action: PayloadAction<any>) {
      state.error = null;
      state.loading = false;
      state.myChats[action.payload.index].author = action.payload.result;
    },
  },
});

export default {
  actions: chatSlice.actions,
  reducer: chatSlice.reducer,
};
