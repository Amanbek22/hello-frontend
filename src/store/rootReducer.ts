import { combineReducers } from "redux";
import userSlice from "./feature/user/user.slice";
import dataSlice from "./feature/data/data.slice";
import newsSlice from "./feature/news/news.slice";
import visitor from "./feature/visitor/visitor.slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  data: dataSlice.reducer,
  news: newsSlice.reducer,
  visitor: visitor.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
