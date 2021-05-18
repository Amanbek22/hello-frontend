import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  categories: null,
};

const userSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<any>) {
      state.categories = action.payload;
    },
    setStates() {
        alert('Hello Status');
    }
  },
});

export default {
  actions: userSlice.actions,
  reducer: userSlice.reducer,
};