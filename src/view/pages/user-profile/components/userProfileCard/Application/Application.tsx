import React, { useState } from "react";
import { Button, TextField, withStyles } from "@material-ui/core";
import css from "./application.module.css";

const ApplyButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 14,
    padding: "10px 36px",
    color: "#fff",
    backgroundColor: "#21A95D",
    boxSizing: "border-box",
    lineHeight: 1,
    width: 198,
    height: 40,
    marginBottom: 15,
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

const CssTextField = withStyles({
  root: {
    width: "calc(100% - 80px)",
    margin: "46px 0 25px",
    "& label": {
      fontSize: 14,
    },
    "& label.Mui-focused": {
      color: "#21A95D",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#21A95D",
    },
    "& .MuiOutlinedInput-root": {
      height: 80,
      borderColor: "#21A95D",
      "&:hover fieldset": {
        borderColor: "#21A95D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#21A95D",
      },
    },
  },
})(TextField);

const Application = () => {
  const [application, setApplication] = useState("");

  return (
    <div>
      <h3 className={css.header}>Колдонуучун үстүнөн арыз берүү? </h3>
      <CssTextField
        value={application}
        onChange={(e) => setApplication(e.target.value)}
        type="text"
        required
        id="outlined-basic"
        label="Арыз берүүңүздүн себеби"
        variant="outlined"
        rows="4"
        autoFocus={true}
        multiline={true}
      />
      <ApplyButton>Арыз калтыруу</ApplyButton>
    </div>
  );
};

export default Application;
