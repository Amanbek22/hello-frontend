import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { RootState } from "../../store/rootReducer";

interface PrivateRouteType {
  component: any;
  path: string;
  exact?: boolean;
}
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteType) => {
  const session = useSelector((state: RootState) => state.user.userData);
  const isAuthenticated = Boolean(session);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/authentication",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
