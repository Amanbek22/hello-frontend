// import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import { RootState } from "../store/rootReducer";
import Header from "../view/components/header";
import Auth from "../view/pages/authentication/Auth";

const AppRouter = () => {
  //   const session = useSelector((state:RootState)=> state.user);
  //   const isAuthenticated = Boolean(true);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          Main page
        </Route>
        <Route path="/authentication">
          <Auth />
        </Route>
        <Route path="/dashboard">this is Dashboard</Route>
      </Switch>
    </>
  );
};

export default AppRouter;
