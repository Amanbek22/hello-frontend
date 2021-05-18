import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../../firebase/firebase.actions";
import dataSlice from "./data.slice";

export const fetchStates = createAsyncThunk(
  "data/states",
  async (_, { dispatch }) => {
    const res = await getData({ path: "states" });
    dispatch(dataSlice.actions.setStates(res));
    return res;
  },
);

export const fetchCategories = createAsyncThunk(
  "data/categories",
  async (_, { dispatch }) => {
    const res = await getData({ path: "categories" });
    dispatch(dataSlice.actions.setCategories(res));
  },
);

export const fetchInitialize = createAsyncThunk(
  "data.initialize",
  async (_, { dispatch }) => {
    await dispatch(fetchCategories());
    dispatch(dataSlice.actions.setFetching());
    dispatch(fetchStates());
  },
);
