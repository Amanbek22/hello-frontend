import { combineReducers } from "redux";
import userSlice from "./feature/user/user.slice";
import dataSlice from "./feature/data/data.slice";
import newsSlice from "./feature/news/news.slice";
import visitorSlice from "./feature/visitor/visitor.slice";
import chatSlice from "./feature/chat/chat.slice";

const rootReducer = combineReducers({
  user: userSlice.reducer,
  data: dataSlice.reducer,
  news: newsSlice.reducer,
  visitor: visitorSlice.reducer,
  chat: chatSlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
