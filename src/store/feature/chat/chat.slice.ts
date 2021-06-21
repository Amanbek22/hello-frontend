import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  chatRoom: [],
  myChats: [],
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
  },
});

export default {
  actions: chatSlice.actions,
  reducer: chatSlice.reducer,
};
