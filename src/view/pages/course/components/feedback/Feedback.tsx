import React, { useState } from "react";
import css from "./feedback.module.css";
import { NavLink } from "react-router-dom";
import ModalWindow from "../../../../components/modal/Modal";
import EvaluationModal from "../../../../components/EvaluationModal/EvaluationModal";

interface IProps {
  uid: string | undefined;
  likes: [] | undefined;
  addLike: () => void;
  ownerUid: string | undefined;
  addReview: (reviewData: any) => void;
  reviews: [] | undefined;
}

const Feedback: React.FC<IProps> = ({
  uid,
  likes,
  addLike,
  ownerUid,
  addReview,
  reviews,
}) => {
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

  const onEvaluationModalClick = (data: any) => {
    closeLikeModal();
    addReview(data);
  };

  return (
    <div className={css.wrapper}>
      <button
        className={css.like_btn}
        disabled={likes?.some((check: any) => check.user === uid)}
        onClick={() => addLike()}
      >
        <img src="/img/like.png" alt="Like" />
      </button>
      <img onClick={openFeedbackModal} src="/img/message.png" alt="Feedback" />
      <ModalWindow open={feedback} onClose={closeFeedbackModal}>
        <>
          <button
            disabled={reviews?.some((check: any) => check.authorUid === uid)}
            style={
              reviews?.some((check: any) => check.authorUid === uid)
                ? {
                    color: "#7e7e7e",
                  }
                : { color: "#21a95d" }
            }
            className={css.link}
            onClick={openLikeModal}
          >
            Оставить отзыв
          </button>
          <NavLink to={`/chat/${ownerUid}`} className={css.link}>
            Написать автору курса
          </NavLink>
        </>
      </ModalWindow>
      <ModalWindow open={like} onClose={closeLikeModal}>
        <EvaluationModal onClick={onEvaluationModalClick} />
      </ModalWindow>
    </div>
  );
};

export default React.memo(Feedback);
