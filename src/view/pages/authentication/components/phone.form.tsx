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
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    props.onSubmit(email);
  };
  return (
    <form className={css.container} onSubmit={submit}>
      <img className={css.logo} src="./img/logoFooter.png" alt="HelloIT" />
      <p>Кируу же каттоодон отуу учун телефон номеринизди жазынынз</p>
      <div className={css.wrapper}>
        <CssTextField
          className={css.input}
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          type="number"
          id="outlined-basic"
          label="Телефон номериниз"
          variant="outlined"
        />
        <p className={css.acceptt}>
          Каттоодон отуу менен, сиз автоматтык турдо тиркеменин колдонуу
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
