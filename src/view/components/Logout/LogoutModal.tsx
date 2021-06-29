import React from "react";
import css from "./logout.module.css";
import { Divider } from "@material-ui/core";

interface IProps {
  onLogout: () => void;
  goBack: () => void;
}

const LogoutModal: React.FC<IProps> = ({ onLogout, goBack }) => {
  return (
    <>
      <h1 className={css.logout__header}>Выйти с аккаунта?</h1>
      <p className={css.logout__text} onClick={() => onLogout()}>
        Выйти
      </p>
      <Divider />
      <p className={css.logout__back} onClick={() => goBack()}>
        Назад
      </p>
    </>
  );
};

export default LogoutModal;
