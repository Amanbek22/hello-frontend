import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../../firebase/firebase.actions";
import userSlice from "./user.slice";

export const fetchUser = createAsyncThunk(
  "data/new",
  async (user: any, { dispatch }) => {
    const res = await getData({ path: "users", doc: user.uid });
    dispatch(userSlice.actions.setUserInfo(res));
  },
);
