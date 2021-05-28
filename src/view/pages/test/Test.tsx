import { useEffect, useState } from "react";
import { QuestionModalType } from "../../../models/type";
import { getData } from "../../../firebase/firebase.actions";
import { useParams } from "react-router";
import Preloader from "../../preloader/preloader";
import css from "./test.module.css";
import Description from "./components/description/Description";
import AnswerGroup from "./components/answer-group/AnswerGroup";
import Result from "./components/result/Result";
import ModalWindow from "../../components/modal/Modal";

type Params = {
  id: string;
  uuid: string;
};
function Test() {
  const [questions, setQuestions] = useState<QuestionModalType[]>([]);
  const [test, setTest] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [active, setActive] = useState<QuestionModalType | null>(null);
  const [activeC, setActiveC] = useState(0);
  const [results, setResults] = useState<string[]>([]);
  const [isResult, setIsResult] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const { uuid, id }: Params = useParams();
  // Get data
  useEffect(() => {
    getData({
      path: `bilim/${uuid}/tests/`,
      doc: id,
    }).then((res: any) => {
      setTest(res);
    });
    getData({
      path: `bilim/${uuid}/tests/${id}/questions`,
    })
      .finally(() => setIsFetching(false))
      .then((data: QuestionModalType[]) => setQuestions(data));
  }, [uuid, id]);
  // Question block element
  const qArray: any = questions.map((el, index) => (
    <div>
      <Description
        question={el.question}
        count={`${index + 1}/${questions.length}`}
      />
      <AnswerGroup
        {...el}
        index={index}
        results={results}
        setResults={setResults}
      />
    </div>
  ));
  // Set active question
  useEffect(() => {
    setActive(qArray[activeC]);
  }, [questions, activeC, results]);
  //next btn
  const onNext = () => {
    if (activeC + 1 === questions.length) {
      return;
    } else {
      setActiveC(1 + activeC);
    }
  };
  // prev btn
  const onPrev = () => {
    if (activeC === 0) {
      return;
    } else {
      setActiveC(activeC - 1);
    }
  };
  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };
  const onResult = () => {
    setIsResult(true);
  };
  if (isFetching) return <Preloader absolute />;
  if (isResult)
    return (
      <div className={css.wrapper}>
        <h2 className={css.name}>{test?.name}</h2>
        <Result results={results} questions={questions} />
        <button className={css.testBtn}>Башка тесттерге</button>
      </div>
    );
  return (
    <div className={css.wrapper}>
      <h2 className={css.name}>{test?.name}</h2>
      {active}
      <div className={css.btnWrapper}>
        <button className={css.btn} onClick={onPrev}>
          Мурунку
        </button>
        {activeC !== questions.length - 1 ? (
          <button className={css.btn} onClick={onNext}>
            Кийинки
          </button>
        ) : (
          <button className={css.btn} onClick={openModal}>
            Жыйынтык
          </button>
        )}
      </div>
      <ModalWindow open={isModal} onClose={closeModal}>
        <div className={css.modalWrapper}>
          <h3>Жыйынтыкты коруу?</h3>
          <div onClick={onResult} className={css.getResult}>
            Ооба (Ырастоо)
          </div>
          <div onClick={closeModal}>Жок, артка</div>
        </div>
      </ModalWindow>
    </div>
  );
}

export default Test;
