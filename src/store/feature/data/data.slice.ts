import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isFetching: true,
  categories: null,
  states: null,
  popular: null,
  newPosts: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<any>) {
      state.categories = action.payload;
    },
    setStates(state, action: PayloadAction<any>) {
      state.states = action.payload;
    },
    setPopular(state, action: PayloadAction<any>) {
      state.popular = action.payload;
    },
    setNew(state, action: PayloadAction<any>) {
      state.newPosts = action.payload;
    },
    setFetching(state) {
      state.isFetching = false;
    },
  },
});

export default {
  actions: dataSlice.actions,
  reducer: dataSlice.reducer,
};
