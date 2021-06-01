import { QuestionModalType } from "../../../../../models/type";
import css from "../../test.module.css";
import Answer from "../answer/Answer";

type PropsType = QuestionModalType & {
  index: number;
  results: string[];
  setResults: any;
};
function AnswerGroup({
  varA,
  varB,
  varC,
  varD,
  varE,
  id,
  index,
  results,
  setResults,
}: PropsType) {
  const arr = [
    { val: "A", var: varA },
    { val: "Б", var: varB },
    { val: "В", var: varC },
    { val: "Г", var: varD },
    { val: "Д", var: varE },
  ];
  return (
    <div className={css.group} id={id}>
      {arr.map((el) =>
        !!el.var ? (
          <Answer
            key={el.val}
            index={index}
            results={results}
            onChange={setResults}
            chek={results[index] === el.val}
            id={id}
            val={el.val}
            variant={el.var}
          />
        ) : null,
      )}
    </div>
  );
}

export default AnswerGroup;
