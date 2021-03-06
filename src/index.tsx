import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import GlobalStyle from "./theme/globalStyle";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxStoreProvider } from "react-redux";
import theme from "./theme";
import { store } from "./store/configureStore";
import AppRouter from "./router/AppRouter";

ReactDOM.render(
  <ReduxStoreProvider store={store}>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </MuiThemeProvider>
    </BrowserRouter>
  </ReduxStoreProvider>,
  document.getElementById("root"),
);

reportWebVitals();
