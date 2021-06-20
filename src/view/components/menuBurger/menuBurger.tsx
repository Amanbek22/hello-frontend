import css from "./menuBurger.module.css";
import { Link, NavLink } from "react-router-dom";

interface PropsType {
  open: boolean;
  setOpen: any;
}

const MenuBurger = (props: PropsType) => {
  return (
    <div className={`${css.menu} ${props.open ? css.menuActive : ""}`}>
      <div className={css.blur}>
        <div className={css.menu_content}>
          <div className={css.close} onClick={() => props.setOpen(false)}>
            <img src="/img/close.png" alt="X" />
          </div>
          <Link
            to="/"
            onClick={() => props.setOpen(false)}
            className={css.logo}
          >
            <img src="/img/logo2.png" alt="logo" />
          </Link>
          <div className={css.header_menu}>
            <div className={css.burger_title}>
              <NavLink
                className={css.item}
                onClick={() => props.setOpen(false)}
                to="/news"
              >
                Жаңылыктар
              </NavLink>
              <NavLink
                className={css.item}
                onClick={() => props.setOpen(false)}
                to="/ads"
              >
                Жарнамалар
              </NavLink>
              <NavLink
                className={css.item}
                onClick={() => props.setOpen(false)}
                to="/communication"
              >
                Маектер
              </NavLink>
              <div className={css.item}>Байланыш</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBurger;
