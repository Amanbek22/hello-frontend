import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
    },
  },
});

export default {
  actions: userSlice.actions,
  reducer: userSlice.reducer,
};
