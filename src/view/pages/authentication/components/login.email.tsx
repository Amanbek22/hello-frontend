import { Button } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
import css from "./forms.module.css";

interface IProps {
  onClick: () => void;
}

const LoginEmail: React.FC<IProps> = ({ onClick }) => {
  return (
    <div className={css.container}>
      <p className={css.login__email__text}>Google аккаунт аркылуу кируу</p>
      <Button onClick={() => onClick()}>
        <img src="./img/google.png" width="46" height="46" alt="google" />
      </Button>
      <NavLink to="/" className={css.active}>
        <p className={css.login__email__text}>Башкы бет</p>
      </NavLink>
    </div>
  );
};

export default LoginEmail;
