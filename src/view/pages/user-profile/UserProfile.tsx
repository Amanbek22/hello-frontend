import React, { useEffect, useState } from "react";
import css from "./userProfile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import styled from "styled-components";
import UserProfileCard from "./components/userProfileCard/userProfileCard";
import Advertisement from "./components/Advertisment/Advertisement";
import Photos from "./components/Photos/Photos";
import { useHistory, useParams } from "react-router";
import Preloader from "../../preloader/preloader";
import ModalWindow from "../../components/modal/Modal";
import BlackList from "../../components/BlackList/BlackList";
import Application from "./components/userProfileCard/Application/Application";
import { NavLink, Route, Switch, useLocation } from "react-router-dom";
import { fetchVisitor } from "../../../store/feature/visitor/visitor.action";

const Tabs = styled.div`
  margin: 30px 0px 40px;
  text-align: center;
`;

const Tab = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  margin-left: 50px;
  cursor: pointer;
  padding-bottom: 10px;
  &:first-child {
    margin-left: 0;
  }
`;

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const UserProfile = () => {
  const dispatch = useDispatch();
  const { uid } = useParams<{ uid: string }>();
  const { loading, visitor }: any = useSelector(
    (state: RootState) => state.visitor,
  );
  const history = useHistory();
  const query = useQuery();
  const [application, setApplication] = useState<boolean>(false);
  const [blackList, setBlackList] = useState<boolean>(false);

  const onBlackList = () => {
    history.push({
      pathname: history.location.pathname,
      search: !blackList ? `?black-list=true` : "",
    });
  };
  const onApplication = () => {
    history.push({
      pathname: history.location.pathname,
      search: !application ? `?application=true` : "",
    });
  };

  const goBack = () => {
    history.goBack();
  };
  const goToChat = () => {
    history.push(`/chat/${visitor.uid}`);
  };

  useEffect(() => {
    dispatch(fetchVisitor(uid));
  }, [uid]);

  useEffect(() => {
    setApplication(Boolean(query.get("application")));
    setBlackList(Boolean(query.get("black-list")));
  }, [query]);

  return (
    <>
      <div className={css.container}>
        {loading && <Preloader />}
        <UserProfileCard
          name={visitor?.userName}
          img={visitor?.userPhoto}
          city={visitor?.userAddressText}
          photoCount={visitor?.images === undefined ? 0 : visitor.images}
          profession={visitor?.bio}
          onApplication={onApplication}
          onBlackList={onBlackList}
          toChat={goToChat}
        />
        <Tabs>
          <NavLink to={`/user/${uid}/advertisement`}>
            <Tab>Жарнамалар</Tab>
          </NavLink>
          <NavLink to={`/user/${uid}/photos`}>
            <Tab>Сүрөттөр</Tab>
          </NavLink>
        </Tabs>

        <Switch>
          <Route path="/user/:id/advertisement" component={Advertisement} />
          <Route path="/user/:id/photos" component={Photos} />
        </Switch>
      </div>
      <ModalWindow open={blackList} onClose={onBlackList}>
        <BlackList addToBlackList={() => "added"} goBack={goBack} />
      </ModalWindow>
      <ModalWindow open={application} onClose={onApplication}>
        <Application />
      </ModalWindow>
    </>
  );
};

export default UserProfile;
