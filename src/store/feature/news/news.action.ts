import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getData,
  setData,
  updateData,
} from "../../../firebase/firebase.actions";
import newsSlice from "./news.slice";
import { RootState } from "../../rootReducer";

export const fetchNewCats = createAsyncThunk(
  "news/newsCats",
  async (_, { dispatch }) => {
    dispatch(newsSlice.actions.setLoading(true));
    try {
      const res = await getData({ path: "newscats" });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(newsSlice.actions.setNewsCats(result));
    } catch (e) {
      dispatch(newsSlice.actions.setError(e));
    }
  },
);

export const fetchNews = createAsyncThunk(
  "news/news",
  async (id: string | undefined, { dispatch }) => {
    dispatch(newsSlice.actions.setLoading(true));
    try {
      const res = id
        ? await getData({ path: "news", where: id })
        : await getData({ path: "news" });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(newsSlice.actions.setNews(result));
    } catch (e) {
      dispatch(newsSlice.actions.setError(e));
    }
  },
);

export const fetchSingleNews = createAsyncThunk(
  "news/singleNews",
  async (id: string, { dispatch }) => {
    dispatch(newsSlice.actions.setLoading(true));
    try {
      const res = await getData({ path: "news", doc: id });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(newsSlice.actions.setSingleNews(result));
    } catch (e) {
      dispatch(newsSlice.actions.setError(e));
    }
  },
);

export const fetchAuthor = createAsyncThunk(
  "news/author",
  async (doc: string, { dispatch }) => {
    dispatch(newsSlice.actions.setLoading(true));
    try {
      const res = await getData({ path: "users", doc: doc });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(newsSlice.actions.setAuthor(result));
    } catch (e) {
      dispatch(newsSlice.actions.setError(e));
    }
  },
);

export const fetchComments = createAsyncThunk(
  "news/comments",
  async (doc: string, { dispatch }) => {
    dispatch(newsSlice.actions.setLoading(true));
    try {
      const res = await getData({ path: "news", doc: doc, path2: "comments" });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(newsSlice.actions.setComments(result));
      result.map((item: any, index: number) =>
        dispatch(fetchCommentsAuthor({ doc: item.authorUid, index: index })),
      );
    } catch (e) {
      dispatch(newsSlice.actions.setError(e));
    }
  },
);

const fetchCommentsAuthor = createAsyncThunk(
  "news/commentsAuthor",
  async ({ doc, index }: any, { dispatch }) => {
    dispatch(newsSlice.actions.setLoading(true));
    try {
      const res = await getData({ path: "users", doc: doc });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(newsSlice.actions.setCommentsAuthor({ result, index }));
    } catch (e) {
      dispatch(newsSlice.actions.setError(e));
    }
  },
);

export const createComments = createAsyncThunk(
  "news/createComment",
  async ({ doc, data }: any, { dispatch, getState }) => {
    dispatch(newsSlice.actions.setLoading(true));
    const { news }: any = getState() as { state: RootState };
    const comment = news.singleNews.comments + 1;
    try {
      await setData({ path: "news", doc: doc, path2: "comments", data: data });
      await updateData({ path: "news", doc: doc, data: { comments: comment } });
      dispatch(fetchComments(doc));
    } catch (e) {
      dispatch(newsSlice.actions.setError(e));
    }
  },
);
