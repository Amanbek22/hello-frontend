import React, { useEffect, useState } from "react";
import css from "./feedback.module.css";
import { useHistory } from "react-router";
import { Link, useLocation } from "react-router-dom";
import ModalWindow from "../../../../components/modal/Modal";

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
      <ModalWindow open={feedback} onClose={onFeedBack}>
        <>
          <Link to="#" className={css.link}>
            Оставить отзыв
          </Link>
          <Link to="#" className={css.link}>
            Написать автору курса
          </Link>
        </>
      </ModalWindow>
      <ModalWindow open={like} onClose={onLike}>
        This is like
      </ModalWindow>
    </div>
  );
}

export default React.memo(Feedback);
