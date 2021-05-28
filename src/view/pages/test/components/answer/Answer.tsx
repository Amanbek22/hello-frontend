import css from "../../test.module.css";

interface AnswerProps {
  id: string;
  val: string;
  variant: string;
  chek: boolean;
  onChange: any;
  index: number;
  results: string[];
}
const Answer = ({
  id,
  val,
  variant,
  chek,
  onChange,
  index,
  results,
}: AnswerProps) => {
  return (
    <>
      <input
        checked={chek}
        onChange={(e: any) => {
          const arr = results;
          arr[index] = e.target?.value;
          onChange([...arr]);
        }}
        name={id}
        id={variant}
        value={val}
        className={css.radio}
        type="radio"
      />
      <label htmlFor={variant} className={css.answer}>
        <div className={css.variant}>{val}</div>
        <div>{variant}</div>
      </label>
    </>
  );
};

export default Answer;
