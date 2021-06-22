import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  categories: [],
  states: [],
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
    setStates(state, action: PayloadAction<any>) {
      state.error = null;
      state.loading = false;
      state.states = action.payload;
    },
  },
});

export default {
  actions: adsSlice.actions,
  reducer: adsSlice.reducer,
};