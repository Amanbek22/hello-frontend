import React, { useEffect, useState } from "react";
import css from "./dashboard.module.css";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Divider } from "@material-ui/core";
import LogoutModal from "../../components/Logout/LogoutModal";
import ModalWindow from "../../components/modal/Modal";
import { Logout } from "../../../firebase/firebase";
import userSlice from "../../../store/feature/user/user.slice";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import ShareModal from "./components/ShareModal/ShareModal";
import EvaluationModal from "./components/EvaluationModal/EvaluationModal";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const [logout, setLogout] = useState<boolean>(false);
  const [share, setShare] = useState<boolean>(false);
  const [evaluation, setEvaluation] = useState<boolean>(false);

  const goBack = () => {
    history.goBack();
  };

  const onLogoutModal = () => {
    history.push({
      pathname: history.location.pathname,
      search: !logout ? `?logout=true` : "",
    });
  };
  const onLogoutHandler = async () => {
    await Logout();
    dispatch(userSlice.actions.setUserData(null));
    history.push("/");
  };

  const onShareModal = () => {
    history.push({
      pathname: history.location.pathname,
      search: !share ? `?share=true` : "",
    });
  };

  const onEvaluationModal = () => {
    history.push({
      pathname: history.location.pathname,
      search: !evaluation ? `?evaluation=true` : "",
    });
  };

  const onFriendship = () => {
    history.push("/friendship");
  };

  useEffect(() => {
    setLogout(Boolean(query.get("logout")));
    setShare(Boolean(query.get("share")));
    setEvaluation(Boolean(query.get("evaluation")));
  }, [query]);
  return (
    <>
      <div className={css.container}>
        <div className={css.wrapper}>
          <h1 className={css.header}>Hello</h1>
          <p className={css.link} onClick={onShareModal}>
            Профилди бөлүшүү
          </p>
          <p className={css.link} onClick={onFriendship}>
            Дострого сунуштоо
          </p>
          <p className={css.link}>Hello жөнүндө</p>
          <p className={css.link} onClick={onEvaluationModal}>
            Сунуш пикир калтыруу
          </p>
          <Divider className={css.divider} />
          <div className={css.exit} onClick={onLogoutModal}>
            <p className={css.exit__text}>Чыгуу</p>
            <ExitToAppIcon className={css.exit__icon} />
          </div>
        </div>
      </div>
      <ModalWindow open={logout} onClose={onLogoutModal}>
        <LogoutModal onLogout={onLogoutHandler} goBack={goBack} />
      </ModalWindow>
      <ModalWindow open={share} onClose={onShareModal}>
        <ShareModal />
      </ModalWindow>
      <ModalWindow open={evaluation} onClose={onEvaluationModal}>
        <EvaluationModal />
      </ModalWindow>
    </>
  );
};

export default Dashboard;
