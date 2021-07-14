import { createAsyncThunk } from "@reduxjs/toolkit";
import adsSlice from "./ads.slice";
import {
  fetchData,
  getData,
  setData,
  db,
} from "../../../firebase/firebase.actions";

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
    dispatch(adsSlice.actions.setLoading(true));
    try {
      await setData({ path: "posts", data: values });
      dispatch(adsSlice.actions.setSuccess(true));
    } catch (e) {
      dispatch(adsSlice.actions.setError(e));
    }
  },
);

const compareDate = () => {
  return (a: any, b: any) => (a.date.seconds > b.date.seconds ? 1 : -1);
};

const compareCost = () => {
  return (a: any, b: any) => (a.cost > b.cost ? 1 : -1);
};

export const fetchAds = createAsyncThunk(
  "ads/ads",
  async ({ id, order }: any, { dispatch }) => {
    dispatch(adsSlice.actions.setLoading(true));
    const orderBy = !!order ? order : "date";
    try {
      const res = id
        ? await db.collection("posts").where("category", "==", parseInt(id))
        : await db.collection("posts");
      const result = await fetchData(res);
      const sort =
        orderBy.substring(0, 4) === "date"
          ? result.sort(compareDate())
          : result.sort(compareCost());
      orderBy.indexOf("reverse") !== -1
        ? dispatch(adsSlice.actions.setAds(sort))
        : dispatch(adsSlice.actions.setAds(sort.reverse()));
    } catch (e) {
      dispatch(adsSlice.actions.setError(e));
    }
  },
);
