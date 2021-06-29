import React from "react";
import css from "../friendship.module.css";
import { Button, withStyles } from "@material-ui/core";

const GreenButton = withStyles({
  root: {
    marginLeft: 40,
    marginRight: 60,
    width: 160,
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    padding: "10px 36px",
    color: "#fff",
    backgroundColor: "#21A95D",
    boxSizing: "border-box",
    lineHeight: 1,
    justifySelf: "center",
    height: 50,
    "&:hover": {
      backgroundColor: "#33a921",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#21A95D",
    },
  },
})(Button);

const RedButton = withStyles({
  root: {
    width: 133,
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    padding: "10px 36px",
    color: "#FF2E2E",
    boxSizing: "border-box",
    lineHeight: 1,
    justifySelf: "center",
    border: "1px solid #FF2E2E",
    height: 50,
    "&:active": {
      boxShadow: "none",
    },
  },
})(Button);

interface IProps {
  id: string;
  img: string | undefined;
  name: string;
  city: string;
  onConfirm: () => void;
  onRefuse: () => void;
}

const UserCard: React.FC<IProps> = ({
  id,
  img,
  city,
  name,
  onConfirm,
  onRefuse,
}) => {
  return (
    <div className={css.card}>
      {img ? (
        <img src={img} alt="avatar" className={css.avatar} />
      ) : (
        <div className={css.avatar} />
      )}
      <div>
        <p className={css.name}>{name}</p>
        <p className={css.city}>{city}</p>
      </div>
      <GreenButton onClick={() => onConfirm()}>Подтвердить</GreenButton>
      <RedButton onClick={() => onRefuse()}>Отказать</RedButton>
    </div>
  );
};

export default UserCard;
