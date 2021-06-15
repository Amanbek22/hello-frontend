import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../../firebase/firebase.actions";
import userSlice from "./user.slice";

export const fetchUser = createAsyncThunk(
  "user/new",
  async (user: any, { dispatch }) => {
    dispatch(userSlice.actions.setLoading);
    const res = await getData({ path: "users", doc: user.uid });
    dispatch(userSlice.actions.setUserInfo(res));
  },
);
