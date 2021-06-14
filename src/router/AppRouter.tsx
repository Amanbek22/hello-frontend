// import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { fetchInitialize } from "../store/feature/data/data.action";
import { RootState } from "../store/rootReducer";
import Footer from "../view/components/footer/Footer";
// import { RootState } from "../store/rootReducer";
import Header from "../view/components/header/header";
import Auth from "../view/pages/authentication/Auth";
import Main from "../view/pages/main/Main";
import Preloader from "../view/preloader/preloader";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublishRoute";
import Course from "../view/pages/course";
import News from "../view/pages/news/News";
import Test from "../view/pages/test/Test";
import Lesson from "../view/pages/lesson/Lesson";
import Category from "../view/pages/category/Category";
import EditProfile from "../view/pages/edit-profile/EditProfile";
import UserProfile from "../view/pages/userProfile/UserProfile";
import Profile from "../view/pages/profile/Profile";
import Communication from "../view/pages/communication/Communication";

const AppRouter = () => {
  const session = useSelector((state: RootState) => state.user.userData);
  const isAuthenticated = Boolean(session);
  const isFetching = useSelector((state: RootState) => state.data.isFetching);
  const userInfo: any = useSelector((state: RootState) => state.user.userInfo);
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitialize(session));
  }, []);
  if (isFetching) return <Preloader absolute />;
  if (loading) return <Preloader absolute />;
  if (userInfo && !userInfo?.profileDone) return <EditProfile />;
  return (
    <>
      <Header
        isAuth={isAuthenticated}
        name={userInfo?.userName}
        img={userInfo?.userPhoto || userInfo?.photoUrl}
      />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/news">
          <News />
        </Route>
        <Route exact path="/lesson/:id/:vid">
          <Lesson />
        </Route>
        <Route path="/course/:id">
          <Course />
        </Route>
        <Route exact path="/category/:id">
          <Category />
        </Route>
        <PublicRoute
          restricted={true}
          component={Auth}
          path="/authentication"
          exact
        />
        <PrivateRoute path="/dashboard" component={() => "This is dashboard"} />
        <PrivateRoute path="/edit-profile" component={EditProfile} />
        <PrivateRoute path="/my-profile" component={Profile} />
        <PrivateRoute path="/user-profile" component={UserProfile} />
        <PrivateRoute path="/communication" component={Communication} />
        <PrivateRoute exact path="/test/:uuid/:id" component={Test} />
      </Switch>
      <Footer />
    </>
  );
};

export default AppRouter;
