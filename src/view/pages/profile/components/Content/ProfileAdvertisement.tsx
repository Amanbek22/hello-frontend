import React from "react";
import css from "../../profile.module.css";
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

const ProfileAdvertisement: React.FC = () => {
  return (
    <div className={css.adGrid}>
      <GreenButton>Жарнама берүү</GreenButton>
    </div>
  );
};

export default ProfileAdvertisement;
