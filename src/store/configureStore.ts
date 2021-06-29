/* eslint-disable no-console */
import { loadState, saveState } from "./util/stateLoader";
import { Action, applyMiddleware } from "redux";
import {
  configureStore,
  getDefaultMiddleware,
  ThunkAction,
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer, { RootState } from "./rootReducer";

export const castRootState = (getState: any): RootState =>
  getState as RootState;

function setupStore() {
  // const middlewares: any[] = [thunk];
  // Debug logs

  const preloadedState = loadState();

  const enhancers = [
    applyMiddleware(thunk),

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ];

  const store = configureStore({
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
    reducer: rootReducer,
    preloadedState: preloadedState,
    enhancers: enhancers,
  });
  store.subscribe(() => {
    const { user } = store.getState();
    saveState({ user });
  });

  return store;
}

export const store = setupStore();

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
export type AppDispatch = typeof store.dispatch;
