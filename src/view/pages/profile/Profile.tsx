import React, { useEffect, useState } from "react";
import css from "./profile.module.css";
import ProfileCard from "./components/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { useHistory } from "react-router";
import { Logout } from "../../../firebase/firebase";
import userSlice from "../../../store/feature/user/user.slice";
import { useLocation } from "react-router-dom";
import ModalWindow from "../../components/modal/Modal";
import LogoutModal from "./components/LogoutModal";
import ContentHeader from "./components/ContentHeader/ContentHeader";
import Content from "./components/Content/Content";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Profile = () => {
  //hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const [logout, setLogout] = useState<boolean>(false);
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
        <ContentHeader />
      </div>

      <Content />

      <ModalWindow open={logout} onClose={onLogoutModal}>
        <LogoutModal onLogout={onLogoutHandler} goBack={goBack} />
      </ModalWindow>
    </>
  );
};

export default Profile;
