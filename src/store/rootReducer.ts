import { combineReducers } from "redux";
import userSlice from "./feature/user/user.slice";
import dataSlice from "./feature/data/data.slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  data: dataSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
