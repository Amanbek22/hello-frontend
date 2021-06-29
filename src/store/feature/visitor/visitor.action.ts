import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, fetchData, db } from "../../../firebase/firebase.actions";
import visitor from "./visitor.slice";

export const fetchVisitor = createAsyncThunk(
  "user/visitor",
  async (doc: string, { dispatch }) => {
    dispatch(visitor.actions.setLoading(true));
    try {
      const res = await getData({ path: "users", doc: doc });
      dispatch(visitor.actions.setVisitor(res));
    } catch (e) {
      dispatch(visitor.actions.setError(e));
    }
  },
);

export const fetchVisitorAds = createAsyncThunk(
  "user/ads",
  async (uid: string, { dispatch }) => {
    dispatch(visitor.actions.setLoading(true));
    try {
      const res = await db.collection("posts").where("authorUid", "==", uid);
      const result = await fetchData(res);
      dispatch(visitor.actions.setAds(result));
    } catch (e) {
      dispatch(visitor.actions.setError(e));
    }
  },
);
