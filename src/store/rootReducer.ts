import { combineReducers } from "redux";
import userSlice from "./feature/user/user.slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
