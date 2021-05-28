// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { fetchInitialize } from "../store/feature/data/data.action";
import { RootState } from "../store/rootReducer";
import Footer from "../view/components/footer/Footer";
// import { RootState } from "../store/rootReducer";
import Header from "../view/components/header";
import Auth from "../view/pages/authentication/Auth";
import Main from "../view/pages/main/Main";
import Preloader from "../view/preloader/preloader";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublishRoute";
import Course from "../view/pages/course";
import News from "../view/pages/news/News";
import Test from "../view/pages/test/Test";

const AppRouter = () => {
  const session = useSelector((state: RootState) => state.user.userData);
  const isAuthenticated = Boolean(session);
  const isFetching = useSelector((state: RootState) => state.data.isFetching);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialize());
  }, []);
  if (isFetching) return <Preloader />;
  return (
    <>
      <Header isAuth={isAuthenticated} />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/news">
          <News />
        </Route>
        <Route path="/course/:id">
          <Course />
        </Route>
        <PublicRoute
          restricted={true}
          component={Auth}
          path="/authentication"
          exact
        />
        <PrivateRoute path="/dashboard" component={() => "This is dashboard"} />
        <PrivateRoute exact path="/test/:uuid/:id" component={Test} />
      </Switch>
      <Footer />
    </>
  );
};

export default AppRouter;
