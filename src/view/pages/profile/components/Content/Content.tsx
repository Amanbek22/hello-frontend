import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ProfileAdvertisement from "./ProfileAdvertisement";
import ProfileNews from "./ProfileNews";
import ProfileCourses from "./ProfileCourses";
import ProfileFollowers from "./ProfileFollowers";

const Content = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}`}>
        <ProfileAdvertisement />
      </Route>
      <Route path={`${path}/new`}>
        <ProfileNews />
      </Route>
      <Route path={`${path}/courses`}>
        <ProfileCourses />
      </Route>
      <Route path={`${path}/followers`}>
        <ProfileFollowers />
      </Route>
    </Switch>
  );
};

export default Content;
