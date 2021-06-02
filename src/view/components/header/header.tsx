import { Link, NavLink } from "react-router-dom";
import Css from "./header.module.css";
import { useState } from "react";
import MenuBurger from "../menuBurger/menuBurger";

interface PropsType {
  isAuth: boolean;
}

const Header = ({ isAuth }: PropsType) => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <MenuBurger open={open} setOpen={setOpen} />
      <div className={Css.header_burger} onClick={() => setOpen(!open)}>
        <span />
      </div>
      <div className={Css.menu_wrapper}>
        <Link className={Css.logo_wrapper} to="/">
          <img className={Css.logo} src="./img/logo1.png" alt="logo1" />
        </Link>
        <div className={Css.header_menu}>
          <NavLink activeClassName={Css.active} className={Css.item} to="/news">
            Жаңылыктар
          </NavLink>
          <div className={Css.item}>Маектер</div>
          <div className={Css.item}>Жарнамалар</div>
          <div className={Css.item}>Байланыш</div>
        </div>
        <div className={Css.menu}>
          <img className={Css.flag} src="./img/flag.png" alt="flag" />
          <div className={Css.lang}>KG</div>
          <img className={Css.vector} src="./img/vec.png" alt="vector" />
        </div>
      </div>
      {!isAuth ? (
        <Link to="/authentication">
          <button className={Css.btn}>КИРҮҮ</button>
        </Link>
      ) : (
        <button className={Css.btn}>Чыгуу</button>
      )}
    </header>
  );
};

export default Header;
