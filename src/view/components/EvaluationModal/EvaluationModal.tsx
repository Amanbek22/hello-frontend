import React, { ChangeEvent, useState } from "react";
import css from "./evaluation.module.css";
import Rating from "@material-ui/lab/Rating";
import { Button, TextField, withStyles } from "@material-ui/core";

const CssTextField = withStyles({
  root: {
    width: "calc(100% - 80px)",
    margin: "0 auto",
    padding: 10,
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

const GreenButton = withStyles({
  root: {
    margin: "30px auto",
    width: 200,
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

const EvaluationModal = () => {
  const [value, setValue] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const onChangeMessage = (e: ChangeEvent<HTMLInputElement>) => {
    if (message.length <= 499) {
      setMessage(e.target.value);
    } else {
      setMessage(message.substring(0, 499));
    }
  };

  const onSubmit = () => {
    console.log("clicked on button");
  };
  return (
    <>
      <h1 className={css.header}>Сын-пикир калтыруу </h1>
      <div className={css.stars}>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event: any, newValue: any) => {
            setValue(newValue);
          }}
          className={css.rating}
        />
        {value > 0 ? (
          <p className={css.value}>{value}.0</p>
        ) : (
          <p className={css.value} />
        )}
      </div>
      <CssTextField
        className={css.input}
        value={message}
        onChange={onChangeMessage}
        type="text"
        required
        id="outlined-basic"
        label="Сын-пикир калтыруу"
        variant="outlined"
        rows="4"
        autoFocus={true}
        multiline={true}
      />
      <span className={css.max}>{message.length}/500</span>
      <GreenButton onClick={onSubmit}>Жиберүү</GreenButton>
    </>
  );
};

export default EvaluationModal;
