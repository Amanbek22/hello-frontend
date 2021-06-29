import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  ads: [],
  news: [],
  courses: [],
  passengers: [],
};

const personalSlice = createSlice({
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
    setAds(state, action: PayloadAction<any>) {
      state.ads = action.payload;
      state.loading = false;
    },
    setNews(state, action: PayloadAction<any>) {
      state.news = action.payload;
      state.loading = false;
    },
    setCourses(state, action: PayloadAction<any>) {
      state.courses = action.payload;
      state.loading = false;
    },
    setPassengers(state, action: PayloadAction<any>) {
      state.passengers = action.payload;
      state.loading = false;
    },
  },
});

export default {
  actions: personalSlice.actions,
  reducer: personalSlice.reducer,
};
