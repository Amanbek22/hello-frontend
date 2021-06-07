import { useState } from "react";
import css from "./forms.module.css";
import { Link } from "react-router-dom";
import { TextField, withStyles } from "@material-ui/core";

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#21A95D",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#21A95D",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#21A95D",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#21A95D",
      },
    },
  },
})(TextField);
interface PropsType {
  onSubmit: (str: string) => void;
}
const PhoneForm = (props: PropsType) => {
  const [phone, setPhone] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [error, setError] = useState("");
  const submit = (e: React.FormEvent) => {
    if (/^\996[0-9]{9}$/.test(phone)) {
      e.preventDefault();
      setIsDisabled(true);
      props.onSubmit(phone);
      setError("");
    } else {
      e.preventDefault();
      setError("Введите данные в формате 996_________");
    }
  };
  return (
    <form className={css.container} onSubmit={submit}>
      <img className={css.logo} src="./img/logoFooter.png" alt="HelloIT" />
      <p>Кирүү же каттоодон өтүү үчүн телефон номериңизди жазыңыз</p>
      <div className={css.wrapper}>
        <CssTextField
          error={!!error}
          className={css.input}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          required
          id="outlined-basic"
          label="Телефон номериниз"
          variant="outlined"
          helperText={error}
        />
        <p className={css.accept}>
          Каттоодон өтүү менен, сиз автоматтык түрдө тиркеменин колдонуу
          шарттарына макул болосуз
        </p>
        <Link className={css.rules} to="#">
          Колдонуу эрежелери жана шарттары
        </Link>
        <button disabled={isDisabled} className={css.submit_btn}>
          КИРҮҮ
        </button>
      </div>
    </form>
  );
};

export default PhoneForm;
