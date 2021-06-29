import { Link, NavLink, useLocation } from "react-router-dom";
import Css from "./header.module.css";
import { useState } from "react";
import MenuBurger from "../menuBurger/menuBurger";

interface PropsType {
  isAuth: boolean;
  name: string | null;
  img: string | undefined;
}

const Header = ({ isAuth, img, name }: PropsType) => {
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  return (
    <header
      style={
        pathname === "/"
          ? { backgroundColor: "#0b0d34", color: "#ffffff" }
          : { backgroundColor: "#ffffff", color: "#000000" }
      }
    >
      <MenuBurger open={open} setOpen={setOpen} />
      <div className={Css.header_burger} onClick={() => setOpen(!open)}>
        <span />
      </div>
      <div className={Css.menu_wrapper}>
        <Link className={Css.logo_wrapper} to="/">
          <img className={Css.logo} src="/img/logo1.png" alt="logo1" />
        </Link>
        <div className={Css.header_menu}>
          <NavLink
            activeClassName={Css.active}
            className={Css.item}
            to="/news/all"
          >
            Жаңылыктар
          </NavLink>
          <NavLink
            activeClassName={Css.active}
            className={Css.item}
            to="/communication"
          >
            Маектер
          </NavLink>
          <NavLink activeClassName={Css.active} className={Css.item} to="/ads">
            Жарнамалар
          </NavLink>
          <div className={Css.item}>Байланыш</div>
        </div>
        <div className={Css.menu}>
          <img className={Css.flag} src="/img/flag.png" alt="flag" />
          <div className={Css.lang}>KG</div>
          <img className={Css.vector} src="/img/vec.png" alt="vector" />
        </div>
      </div>
      {!isAuth ? (
        <Link to="/authentication">
          <button className={Css.btn}>КИРҮҮ</button>
        </Link>
      ) : (
        <Link to="/profile">
          <div className={Css.user_info}>
            <p>{name}</p>
            {img && (
              <img
                className={Css.avatar}
                width="38"
                height="38"
                src={`${img}`}
                alt="avatar"
              />
            )}
          </div>
        </Link>
      )}
    </header>
  );
};

export default Header;
