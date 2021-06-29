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
  async ({ id, nid }: any, { dispatch, getState }) => {
    dispatch(newsSlice.actions.setLoading(true));
    const { news }: any = getState() as { state: RootState };
    const { user }: any = getState() as { state: RootState };
    const uid = user.userInfo.uid;
    const views = news.singleNews.views + 1;
    try {
      const res =
        id !== "top"
          ? await getData({ path: "news", doc: nid })
          : await getData({ path: "topnews", doc: nid });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(newsSlice.actions.setSingleNews(result));
      const newsId = JSON.parse(localStorage.getItem(uid) || "[]");
      if (!newsId.includes(nid) && views) {
        newsId.push(nid);
        localStorage.setItem(uid, JSON.stringify(newsId));
        await updateData({
          path: "news",
          doc: nid,
          data: { views: views },
        });
      }
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
  async ({ doc, id }: any, { dispatch }) => {
    dispatch(newsSlice.actions.setLoading(true));
    try {
      const res =
        id !== "top"
          ? await getData({
              path: "news",
              doc: doc,
              path2: "comments",
              order: "date",
            })
          : await getData({
              path: "topnews",
              doc: doc,
              path2: "comments",
              order: "date",
            });
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

export const fetchTopNews = createAsyncThunk(
  "news/topNews",
  async (_, { dispatch }) => {
    dispatch(newsSlice.actions.setLoading(true));
    try {
      const res = await getData({ path: "topnews" });
      const result = JSON.parse(JSON.stringify(res));
      dispatch(newsSlice.actions.setTopNews(result));
    } catch (e) {
      dispatch(newsSlice.actions.setError(e));
    }
  },
);
