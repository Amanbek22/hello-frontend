import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  newsCats: [],
  news: [],
  singleNews: [],
  author: null,
  comments: [{ author: {} }] as any,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
      state.news = [];
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
    setNewsCats(state, action: PayloadAction<any>) {
      state.newsCats = action.payload;
      state.loading = false;
    },
    setNews(state, action: PayloadAction<any>) {
      state.news = action.payload;
      state.loading = false;
    },
    setSingleNews(state, action: PayloadAction<any>) {
      state.singleNews = action.payload;
      state.loading = false;
    },
    setAuthor(state, action: PayloadAction<any>) {
      state.author = action.payload;
      state.loading = false;
    },
    setComments(state, action: PayloadAction<any>) {
      state.comments = action.payload;
      state.loading = false;
    },
    setCommentsAuthor(state, action: PayloadAction<any>) {
      state.loading = false;
      state.comments[action.payload.index].author = action.payload.result;
    },
  },
});

export default {
  actions: newsSlice.actions,
  reducer: newsSlice.reducer,
};
