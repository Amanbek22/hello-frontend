import Css from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={Css.container}>
      <footer>
        <img src={"./img/logoFooter.png"} />
        <div className={Css.box_title}>
          <div>Жаңылыктар</div>
          <div>Маектер</div>
          <div>Жарнамалар</div>
          <div>Байланыш</div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
