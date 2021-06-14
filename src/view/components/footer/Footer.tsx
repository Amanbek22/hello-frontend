import Css from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={Css.container}>
      <footer>
        <div className={Css.logo}>
          <img src="/img/logoFooter.png" />
          <div>Колдонуу эрежелери жана шарттары</div>
        </div>
        <div className={Css.contacts}>
          <div className={Css.address}>
            <div>Адрес ул Токтоналиева 86</div>
            <div>№104 офис, Бишкек 2021</div>
          </div>
          <div className={Css.phone}>
            <img src="/img/phone.png" />
            <span>+996 999 060 999</span>
          </div>
        </div>
        <ul className={`${Css.list}`}>
          <li>Жаңылыктар</li>
          <li>Маектер</li>
          <li>Жарнамалар</li>
          <li>Байланыш</li>
        </ul>
        <div className={Css.box_social}>
          <div>Биз социалдык</div>
          <div className={Css.box_img}>
            <img src="/img/instagram.png" />
            <img src="/img/whatsapp.png" />
            <img src="/img/telegram.png" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
