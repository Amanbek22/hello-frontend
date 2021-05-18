import Css from "./CardCategory.module.css";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  img: string;
}

const CardCategory = (props: Props) => {
  return (
    <div className={Css.container}>
      <Link to="/Category">
        <div>
          <div className={Css.box}>
            <div className={Css.title}>{props.title}</div>
            <img src={props.img} />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardCategory;
