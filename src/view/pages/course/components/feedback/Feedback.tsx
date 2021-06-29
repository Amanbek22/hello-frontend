import React, { useState } from "react";
import css from "./feedback.module.css";
import { Link } from "react-router-dom";
import ModalWindow from "../../../../components/modal/Modal";
import EvaluationModal from "../../../../components/EvaluationModal/EvaluationModal";

function Feedback() {
  const [feedback, setFeedback] = useState(false);
  const [like, setLike] = useState(false);

  const openFeedbackModal = () => {
    setFeedback(true);
  };
  const closeFeedbackModal = () => {
    setFeedback(false);
  };
  const openLikeModal = () => {
    setLike(true);
  };
  const closeLikeModal = () => {
    setLike(false);
  };

  return (
    <div className={css.wrapper}>
      <img onClick={openLikeModal} src="/img/like.png" alt="Like" />
      <img onClick={openFeedbackModal} src="/img/message.png" alt="Feedback" />
      <ModalWindow open={feedback} onClose={closeFeedbackModal}>
        <>
          <Link to="#" className={css.link}>
            Оставить отзыв
          </Link>
          <Link to="#" className={css.link}>
            Написать автору курса
          </Link>
        </>
      </ModalWindow>
      <ModalWindow open={like} onClose={closeLikeModal}>
        <EvaluationModal />
      </ModalWindow>
    </div>
  );
}

export default React.memo(Feedback);
