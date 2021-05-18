import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isFetching: true,
  categories: null,
  states: null,
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
    setFetching(state) {
      state.isFetching = false;
    },
  },
});

export default {
  actions: dataSlice.actions,
  reducer: dataSlice.reducer,
};
