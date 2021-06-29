import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData, db } from "../../../firebase/firebase.actions";
import personalSlice from "./personal.slice";

export const fetchPersonalAds = createAsyncThunk(
  "personal/ads",
  async (uid: string, { dispatch }) => {
    dispatch(personalSlice.actions.setLoading(true));
    try {
      const res = await db.collection("posts").where("authorUid", "==", uid);
      const result = await fetchData(res);
      dispatch(personalSlice.actions.setAds(result));
    } catch (e) {
      dispatch(personalSlice.actions.setError(e));
    }
  },
);

export const fetchPersonalNews = createAsyncThunk(
  "personal/news",
  async (uid: string, { dispatch }) => {
    dispatch(personalSlice.actions.setLoading(true));
    try {
      const res = await db.collection("news").where("authorUid", "==", uid);
      const result = await fetchData(res);
      dispatch(personalSlice.actions.setNews(result));
    } catch (e) {
      dispatch(personalSlice.actions.setError(e));
    }
  },
);

export const fetchPersonalCourses = createAsyncThunk(
  "personal/courses",
  async (uid: string, { dispatch }) => {
    dispatch(personalSlice.actions.setLoading(true));
    try {
      const res = await db.collection("bilim").where("ownerUid", "==", uid);
      const result = await fetchData(res);
      dispatch(personalSlice.actions.setCourses(result));
    } catch (e) {
      dispatch(personalSlice.actions.setError(e));
    }
  },
);
