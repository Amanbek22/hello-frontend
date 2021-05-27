import { QuestionModalType } from "../../../../../models/type";
import Description from "../description/Description";
import css from "../../test.module.css";

interface ResultProps {
  results: string[];
  questions: QuestionModalType[];
}

function Result({ results, questions }: ResultProps) {
  const resultArr = questions.map((el, index) => {
    const arr = [
      { val: "A", var: el.varA },
      { val: "Б", var: el.varB },
      { val: "В", var: el.varC },
      { val: "Г", var: el.varD },
      { val: "Д", var: el.varE },
    ];
    return (
      <div key={el.id}>
        <Description
          question={el.question}
          count={`${index + 1}/${questions.length}`}
        />
        <div className={css.group + " " + css.borderBottom}>
          {arr.map((item, i) => {
            let res = 0;
            if (item.val === "A") {
              res = 1;
            } else if (item.val === "Б") {
              res = 2;
            } else if (item.val === "В") {
              res = 3;
            } else if (item.val === "Г") {
              res = 4;
            } else if (item.val === "Д") {
              res = 5;
            }
            const answer = results[index] === item.val;
            let correct = "";
            let cor = "";
            if (!answer && i + 1 === el.answer && results[index]) {
              cor = css.correct;
            }
            if (res === el.answer && answer) {
              correct = css.correct;
            } else if (answer) {
              correct = css.error;
            }
            return !!item.var ? (
              <div key={item.val} className={`${css.answer} ${correct} ${cor}`}>
                <div className={css.variant}>{item.val}</div>
                <div>{item.var}</div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    );
  });
  return <div>{resultArr}</div>;
}

export default Result;
