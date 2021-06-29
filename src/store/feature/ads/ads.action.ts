import { createAsyncThunk } from "@reduxjs/toolkit";
import adsSlice from "./ads.slice";
import {
  fetchData,
  getData,
  setData,
  db,
} from "../../../firebase/firebase.actions";
import { type } from "os";

export const fetchAdsCategories = createAsyncThunk(
  "ads/categories",
  async (_, { dispatch }) => {
    dispatch(adsSlice.actions.setLoading(true));
    try {
      const res = await getData({ path: "categories" });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(adsSlice.actions.setAdsCategories(result));
    } catch (e) {
      dispatch(adsSlice.actions.setError(e));
    }
  },
);

export const createAd = createAsyncThunk(
  "ads/create",
  async (values: any, { dispatch }) => {
    try {
      await setData({ path: "posts", data: values });
    } catch (e) {
      dispatch(adsSlice.actions.setError(e));
    }
  },
);

export const fetchAds = createAsyncThunk(
  "ads/ads",
  async ({ id, order }: any, { dispatch }) => {
    dispatch(adsSlice.actions.setLoading(true));
    const orderBy = !!order ? order : "date";
    try {
      if (orderBy.indexOf("reverse") !== -1) {
        const res = id
          ? await db
              .collection("posts")
              .where("category", "==", parseInt(id))
              .orderBy(orderBy.substring(0, 4))
          : await db.collection("posts").orderBy(orderBy.substring(0, 4));
        const result = await fetchData(res);
        dispatch(adsSlice.actions.setAds(result));
      } else {
        const res = id
          ? await db
              .collection("posts")
              .where("category", "==", parseInt(id))
              .orderBy(orderBy.substring(0, 4))
          : await db.collection("posts").orderBy(orderBy.substring(0, 4));
        const result = await fetchData(res);
        dispatch(adsSlice.actions.setAds(result.reverse()));
      }
    } catch (e) {
      dispatch(adsSlice.actions.setError(e));
    }
  },
);
