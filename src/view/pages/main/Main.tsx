import CardCategory from "../../components/card_category/CardCategory";
import Css from "./main.module.css";

const Main = () => {
  const backendtest = [
    {
      title: "Secom",
      img: "./img/categorySecom.png",
    },
    {
      title: "ЖРТ",
      img: "./img/categorySecom.png",
    },
    {
      title: "Алгебра",
      img: "./img/categorySecom.png",
    },
    {
      title: "Орус тили",
      img: "./img/categorySecom.png",
    },
    {
      title: "Орус тили",
      img: "./img/categorySecom.png",
    },
    {
      title: "Орус тили",
      img: "./img/categorySecom.png",
    },
  ];
  return (
    <div className="container">
      <div className={Css.title}> Категориялар </div>
      <div className={Css.box_cards}>
        {backendtest.map((item) => (
          <CardCategory title={item.title} img={item.img} />
        ))}
      </div>
    </div>
  );
};

export default Main;
