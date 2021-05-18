import { useState } from "react";
import css from "./forms.module.css";
import { CssTextField } from "./phone.form";

interface PropsType {
  onSubmit: (str: string) => void;
  setBack: () => void;
}
const CodeForm = (props: PropsType) => {
  const [code, setCode] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    props.onSubmit(code);
  };
  return (
    <form className={css.container} onSubmit={submit}>
      <img className={css.logo} src="./img/logoFooter.png" alt="HelloIT" />
      <div className={css.wrapper}>
        <div onClick={() => props.setBack()}>Артка</div>
        <br />
        <p>Сиздин телефон номеринизге келген кодду жазыныз</p>
        <br />
        <CssTextField
          className={css.input}
          value={code}
          required
          onChange={(e) => setCode(e.target.value)}
          type="number"
          id="outlined-basic"
          label="Тастыктуу код"
          variant="outlined"
        />
        <br />
        <button disabled={isDisabled} className={css.submit_btn}>
          Тастыктоо
        </button>
      </div>
    </form>
  );
};

export default CodeForm;
