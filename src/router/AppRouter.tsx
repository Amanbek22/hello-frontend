// import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
// import { RootState } from "../store/rootReducer";
import Header from "../view/components/header";

const AppRouter = () => {
  //   const session = useSelector((state:RootState)=> state);
  //   const isAuthenticated = Boolean(true);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/">Main page</Route>
      </Switch>
    </>
  );
};

export default AppRouter;
