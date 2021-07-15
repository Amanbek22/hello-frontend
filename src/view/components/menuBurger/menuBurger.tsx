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
            <ul className={css.burger_title}>
              <NavLink onClick={() => props.setOpen(false)} to="/news/all">
                Жаңылыктар
              </NavLink>
              <NavLink onClick={() => props.setOpen(false)} to="/ads">
                Жарнамалар
              </NavLink>
              <NavLink onClick={() => props.setOpen(false)} to="/communication">
                Маектер
              </NavLink>
              <li>Байланыш</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBurger;
