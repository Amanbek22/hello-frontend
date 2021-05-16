import Css from "./CardCategory.module.css";

interface Props {
  title: string;
  img: string;
}

const CardCategory = (props: Props) => {
  return (
    <div className={Css.container}>
      <div className={Css.box}>
        <div className={Css.title}>{props.title}</div>
        <img src={props.img} />
      </div>
    </div>
  );
};

export default CardCategory;
