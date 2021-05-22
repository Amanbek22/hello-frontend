import React, { useEffect, useState } from "react";
import css from "./feedback.module.css";
import { Modal } from "@material-ui/core";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function Feedback() {
  const history = useHistory();
  const query = useQuery();
  const [feedback, setFeedback] = useState(false);
  const [like, setLike] = useState(false);
  useEffect(() => {
    setLike(Boolean(query.get("like")));
    setFeedback(Boolean(query.get("feedback")));
  }, [query]);
  const onFeedBack = () => {
    history.push({
      pathname: history.location.pathname,
      search: !feedback ? `?feedback=true` : "",
    });
  };
  const onLike = () => {
    history.push({
      pathname: history.location.pathname,
      search: !like ? `?like=true` : "",
    });
  };
  return (
    <div className={css.wrapper}>
      <img onClick={onLike} src="/img/like.png" alt="Like" />
      <img onClick={onFeedBack} src="/img/message.png" alt="Feedback" />
      <Modal
        className={css.modalWrapper}
        open={feedback}
        onClose={onFeedBack}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={css.modal}>
          <img
            onClick={onFeedBack}
            className={css.close}
            src="/img/cancel.png"
            alt="X"
          />
          <div className={css.content}>
            <Link to="#" className={css.link}>
              Оставить отзыв
            </Link>
            <Link to="#" className={css.link}>
              Написать автору курса
            </Link>
          </div>
        </div>
      </Modal>
      <Modal
        className={css.modalWrapper}
        open={like}
        onClose={onLike}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={css.modal}>
          <img
            onClick={onLike}
            className={css.close}
            src="/img/cancel.png"
            alt="X"
          />
          <div className={css.content}>This is like</div>
        </div>
      </Modal>
    </div>
  );
}

export default React.memo(Feedback);
