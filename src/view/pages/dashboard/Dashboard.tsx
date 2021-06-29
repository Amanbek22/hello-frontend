import React, { useState } from "react";
import css from "./dashboard.module.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Divider } from "@material-ui/core";
import LogoutModal from "../../components/Logout/LogoutModal";
import ModalWindow from "../../components/modal/Modal";
import { Logout } from "../../../firebase/firebase";
import userSlice from "../../../store/feature/user/user.slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import ShareModal from "./components/ShareModal/ShareModal";
import EvaluationModal from "../../components/EvaluationModal/EvaluationModal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [logout, setLogout] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<boolean>(false);

  const goBack = () => {
    history.goBack();
  };

  const openLogoutModal = () => {
    setLogout(true);
  };
  const closeLogoutModal = () => {
    setLogout(false);
  };
  const openShareModal = () => {
    setShare(true);
  };
  const closeShareModal = () => {
    setShare(false);
  };

  const openEvaluationModal = () => {
    setEvaluation(true);
  };
  const closeEvaluationModal = () => {
    setEvaluation(false);
  };

  const onLogoutHandler = async () => {
    await Logout();
    dispatch(userSlice.actions.setUserData(null));
    history.push("/");
  };

  const onFriendship = () => {
    history.push("/friendship");
  };

  return (
    <>
      <div className={css.container}>
        <div className={css.wrapper}>
          <h1 className={css.header}>Hello</h1>
          <p className={css.link} onClick={openShareModal}>
            Профилди бөлүшүү
          </p>
          <p className={css.link} onClick={onFriendship}>
            Дострого сунуштоо
          </p>
          <p className={css.link}>Hello жөнүндө</p>
          <p className={css.link} onClick={openEvaluationModal}>
            Сунуш пикир калтыруу
          </p>
          <Divider className={css.divider} />
          <div className={css.exit} onClick={openLogoutModal}>
            <p className={css.exit__text}>Чыгуу</p>
            <ExitToAppIcon className={css.exit__icon} />
          </div>
        </div>
      </div>
      <ModalWindow open={logout} onClose={closeLogoutModal}>
        <LogoutModal onLogout={onLogoutHandler} goBack={goBack} />
      </ModalWindow>
      <ModalWindow open={share} onClose={closeShareModal}>
        <ShareModal />
      </ModalWindow>
      <ModalWindow open={evaluation} onClose={closeEvaluationModal}>
        <EvaluationModal />
      </ModalWindow>
    </>
  );
};

export default Dashboard;
