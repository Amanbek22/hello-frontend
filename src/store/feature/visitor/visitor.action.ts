import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../../firebase/firebase.actions";
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
