import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<any>) {
      state.loading = action.payload;
    },
    setUserData(state, action: PayloadAction<any>) {
      state.userData = action.payload;
      state.error = null;
      state.loading = false;
    },
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
      state.error = null;
      state.loading = false;
    },
    setError(state, action: PayloadAction<any>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default {
  actions: userSlice.actions,
  reducer: userSlice.reducer,
};
