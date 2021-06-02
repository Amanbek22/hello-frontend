import { Link } from "react-router-dom";
import { BilimModalType } from "../../../models/type";
import css from "./courseCard.module.css";

function courseCard(props: BilimModalType) {
  return (
    <Link
      to={`course/${props.id}`}
      className={css.content}
      style={{ background: props.color }}
    >
      <img className={css.img} src={props.icon} alt={props.name} />
      <div className={css.text}>
        <div className={css.text1}>{props.categoryName}</div>
        <div className={css.text2}>{props.name}</div>
        <div className={css.text3}>
          <div>{props.videoCount} видео сабак</div>
          <div>{props.testCount} тест</div>
        </div>
      </div>
    </Link>
  );
}

export default courseCard;
