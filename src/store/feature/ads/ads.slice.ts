import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  categories: [],
  ads: [],
  success: false,
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    setAdsCategories(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.categories = action.payload;
    },
    setAds(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.ads = action.payload;
    },
    setSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = null;
      state.success = action.payload;
    },
  },
});

export default {
  actions: adsSlice.actions,
  reducer: adsSlice.reducer,
};
