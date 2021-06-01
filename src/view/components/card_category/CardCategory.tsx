import { Link } from "react-router-dom";
import Css from "./CardCategory.module.css";

interface Props {
  title: string;
  img: string;
  id: string;
  color: string;
}

const CardCategory = (props: Props) => {
  return (
    <Link
      to={`/category/${props.id}`}
      style={{ background: props.color }}
      className={Css.container}
    >
      <div className={Css.box}>
        <div className={Css.title}>{props.title}</div>
        <img src={props.img ? props.img : "./img/categorySecom.png"} />
      </div>
    </Link>
  );
};

export default CardCategory;
