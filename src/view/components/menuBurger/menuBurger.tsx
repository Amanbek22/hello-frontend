import css from "./menuBurger.module.css";

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
          <div className={css.logo}>
            <img src="/img/logo2.png" alt="logo" />
          </div>
          <div className={css.header_menu}>
            <ul className={css.burger_title}>
              <li>Жаңылыктар</li>
              <li>Маектер</li>
              <li>Жарнамалар</li>
              <li>Байланыш</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBurger;
