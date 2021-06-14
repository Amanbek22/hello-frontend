import React, { useEffect, useState } from "react";
import css from "./profile.module.css";
import ProfileCard from "./components/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useHistory } from "react-router";
import { Logout } from "../../../firebase/firebase";
import userSlice from "../../../store/feature/user/user.slice";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import ModalWindow from "../../components/modal/Modal";
import LogoutModal from "./components/LogoutModal";
import ProfileAdvertisment from "./components/ProfileAdvertisment";
import ProfileNews from "./components/ProfileNews";
import ProfileCourses from "./components/ProfileCourses";
import ProfileFollowers from "./components/ProfileFollowerrs";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Tabs = styled.div`
  margin: 0 auto;
  padding: 0 100px;
  max-width: 1200px;
  width: 100%;
  background-color: #fff;
  border-radius: 50px;
`;

const Tab = styled.button`
  box-sizing: border-box;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 20px 17px 30px;
  border-bottom: 1px solid #e0e7ea;
  &:first-child {
    padding-left: 0;
  }
  &:hover {
    color: #21a95d;
    border-bottom-color: #21a95d;
  }
`;

const tabs = ["Жарнамалар", "Жаңылыктар", "Курстар", "Жүргүнчүлөр үчүн"];

const Profile = () => {
  //hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const query = useQuery();
  const { login, userName, userPhoto, userAddressText }: any = useSelector(
    (state: RootState) => state.user.userInfo,
  );

  //functions

  const onLogoutHandler = async () => {
    await Logout();
    dispatch(userSlice.actions.setUserData(null));
    history.push("/");
  };

  const onProfileEdit = () => {
    history.push("/edit-profile");
  };

  const goBack = () => {
    history.goBack();
  };

  const onLogoutModal = () => {
    history.push({
      pathname: history.location.pathname,
      search: !logout ? `?logout=true` : "",
    });
  };

  useEffect(() => {
    setLogout(Boolean(query.get("logout")));
  }, [query]);

  return (
    <>
      <ProfileCard
        name={userName}
        img={userPhoto}
        login={login}
        city={userAddressText}
        onLogout={onLogoutHandler}
        onEditProfile={onProfileEdit}
        onLogoutModal={onLogoutModal}
        logout={logout}
      />
      <div className={css.tabs}>
        <Tabs>
          {tabs.map((tab, index) => (
            <Tab
              className={index === tabIndex ? css.active : ""}
              key={tab}
              onClick={() => setTabIndex(index)}
            >
              {tab}
            </Tab>
          ))}
        </Tabs>
      </div>

      <ProfileAdvertisment tabIndex={tabIndex} />
      <ProfileNews tabIndex={tabIndex} />
      <ProfileCourses tabIndex={tabIndex} />
      <ProfileFollowers tabIndex={tabIndex} />

      <ModalWindow open={logout} onClose={onLogoutModal}>
        <LogoutModal onLogout={onLogoutHandler} goBack={goBack} />
      </ModalWindow>
    </>
  );
};

export default Profile;
