import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../../store/rootReducer";

interface PublicRouteType {
  component: any;
  path: string;
  exact?: boolean;
  restricted?: boolean;
}
const PublicRoute = ({
  component: Component,
  restricted,
  ...rest
}: PublicRouteType) => {
  const session = useSelector((state: RootState) => state.user.userData);
  const isAuthenticated = Boolean(session);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
