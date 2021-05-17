// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "../view/components/footer/Footer";
// import { RootState } from "../store/rootReducer";
import Header from "../view/components/header";
import Auth from "../view/pages/authentication/Auth";
import Main from "../view/pages/main/Main";
import Preloader from "../view/preloader/preloader";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublishRoute";

const AppRouter = () => {
  //   const session = useSelector((state:RootState)=> state.user);
  //   const isAuthenticated = Boolean(true);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    setIsFetching(false);
  }, []);
  if (isFetching) return <Preloader />;
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <PublicRoute
          restricted={true}
          component={Auth}
          path="/authentication"
          exact
        />
        <PrivateRoute path="/dashboard" component={() => "This is dashboard"} />
      </Switch>
      <Footer />
    </>
  );
};

export default AppRouter;
