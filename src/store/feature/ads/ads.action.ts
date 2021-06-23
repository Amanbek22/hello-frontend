import { createAsyncThunk } from "@reduxjs/toolkit";
import adsSlice from "./ads.slice";
import { getData } from "../../../firebase/firebase.actions";

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
