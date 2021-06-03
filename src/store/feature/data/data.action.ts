import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../../firebase/firebase.actions";
import dataSlice from "./data.slice";
import { fetchUser } from "../user/user.actions";

export const fetchStates = createAsyncThunk(
  "data/states",
  async (_, { dispatch }) => {
    const res = await getData({ path: "states" });
    const result = JSON.parse(JSON.stringify(res));
    dispatch(dataSlice.actions.setStates(result));
  },
);

export const fetchCategories = createAsyncThunk(
  "data/categories",
  async (_, { dispatch }) => {
    const res = await getData({ path: "bilimcats" });
    const result = JSON.parse(JSON.stringify(res));
    dispatch(dataSlice.actions.setCategories(result));
  },
);

export const fetchPopular = createAsyncThunk(
  "data/popular",
  async (_, { dispatch }) => {
    const res = await getData({ path: "bilim", order: "rating", limit: 4 });
    const result = JSON.parse(JSON.stringify(res));
    dispatch(dataSlice.actions.setPopular(result));
  },
);
export const fetchNew = createAsyncThunk(
  "data/new",
  async (_, { dispatch }) => {
    const res = await getData({ path: "bilim", order: "date", limit: 4 });
    const result = JSON.parse(JSON.stringify(res));
    dispatch(dataSlice.actions.setNew(result.reverse()));
  },
);

export const fetchInitialize = createAsyncThunk(
  "data.initialize",
  async (user: any, { dispatch }) => {
    const isAuth = Boolean(user);
    if (isAuth) {
      await dispatch(fetchUser(user));
    }
    await dispatch(fetchPopular());
    await dispatch(fetchCategories());
    await dispatch(fetchNew());
    dispatch(dataSlice.actions.setFetching(false));
    dispatch(fetchStates());
  },
);
