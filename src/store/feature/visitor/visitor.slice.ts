import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  visitor: null,
  ads: [],
};

const visitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    setVisitor(state, action: PayloadAction<any>) {
      state.visitor = action.payload;
      state.error = null;
      state.loading = false;
    },
    setAds(state, action: PayloadAction<any>) {
      state.ads = action.payload;
      state.error = null;
      state.loading = false;
    },
  },
});

export default {
  actions: visitorSlice.actions,
  reducer: visitorSlice.reducer,
};
