import React from "react";
import css from "../profile.module.css";
import { Button, withStyles } from "@material-ui/core";

export const GreenButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    padding: "10px 36px",
    color: "#fff",
    backgroundColor: "#21A95D",
    boxSizing: "border-box",
    lineHeight: 1,
    justifySelf: "center",
    marginTop: 200,
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

interface IProps {
  tabIndex: number;
}

const ProfileAdvertisment: React.FC<IProps> = ({ tabIndex }) => {
  return (
    <div className={tabIndex !== 0 ? css.none : css.adGrid}>
      <GreenButton>Жарнама берүү</GreenButton>
    </div>
  );
};

export default ProfileAdvertisment;
