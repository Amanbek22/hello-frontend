import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
    },
  },
});

export default {
  actions: userSlice.actions,
  reducer: userSlice.reducer,
};
