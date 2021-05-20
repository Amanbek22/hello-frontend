import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../../firebase/firebase.actions";
import dataSlice from "./data.slice";

export const fetchStates = createAsyncThunk(
  "data/states",
  async (_, { dispatch }) => {
    const res = await getData({ path: "states" });
    dispatch(dataSlice.actions.setStates(res));
  },
);

export const fetchCategories = createAsyncThunk(
  "data/categories",
  async (_, { dispatch }) => {
    const res = await getData({ path: "bilimcats" });
    dispatch(dataSlice.actions.setCategories(res));
  },
);

export const fetchPopular = createAsyncThunk(
  "data/popular",
  async (_, { dispatch }) => {
    const res = await getData({ path: "bilim", order: "rating", limit: 4 });
    dispatch(dataSlice.actions.setPopular(res));
  },
);
export const fetchNew = createAsyncThunk(
  "data/new",
  async (_, { dispatch }) => {
    const res = await getData({ path: "bilim", order: "date", limit: 4 });
    dispatch(dataSlice.actions.setNew(res.reverse()));
  },
);

export const fetchInitialize = createAsyncThunk(
  "data.initialize",
  async (_, { dispatch }) => {
    await dispatch(fetchPopular());
    await dispatch(fetchCategories());
    await dispatch(fetchNew());
    dispatch(dataSlice.actions.setFetching());
    dispatch(fetchStates());
  },
);
