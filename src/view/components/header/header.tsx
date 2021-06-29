import { Link, NavLink } from "react-router-dom";
import Css from "./header.module.css";
import { useState } from "react";
import MenuBurger from "../menuBurger/menuBurger";
import i18n from "../../../i18next/i18n";
import { useTranslation } from "react-i18next";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import "./select.css";

interface PropsType {
  isAuth: boolean;
  name: string | null;
  img: string | undefined;
}
const useStyles = makeStyles((theme) => ({
  select: {
    color: "#FFFFFF",
  },
}));

const Header = ({ isAuth, img, name }: PropsType) => {
  const [open, setOpen] = useState(false);
  const [openSel, setOpenSel] = useState(false);
  const [lan, setLan] = useState<any>(() => localStorage.getItem("i18nextLng"));
  const { t } = useTranslation();
  const onChange = (event: any) => {
    i18n.changeLanguage(event.target.value);
    setLan(event.target.value);
    localStorage.setItem("i18nextLng", event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseSelect = () => {
    setOpenSel(false);
  };
  const handleOpenSelect = () => {
    setOpenSel(true);
  };
  const classes = useStyles();
  return (
    <header>
      <MenuBurger open={open} setOpen={setOpen} />
      <div className={Css.header_burger} onClick={() => setOpen(!open)}>
        <span />
      </div>
      <div className={Css.menu_wrapper}>
        <Link className={Css.logo_wrapper} to="/">
          <img className={Css.logo} src="/img/logo1.png" alt="logo1" />
        </Link>
        <div className={Css.header_menu}>
          <NavLink activeClassName={Css.active} className={Css.item} to="/news">
            {t("header.news")}
          </NavLink>
          <NavLink activeClassName={Css.active} className={Css.item} to="/ads">
            {t("header.chatskg")}
          </NavLink>
          <NavLink
            activeClassName={Css.active}
            className={Css.item}
            to="/communication"
          >
            {t("header.posts")}
          </NavLink>
          <div className={Css.item}>{t("header.contacts")}</div>
        </div>
        <div className={Css.menu}>
          <FormControl>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openSel}
              onClose={handleCloseSelect}
              onOpen={handleOpenSelect}
              value={lan}
              onChange={onChange}
              className={classes.select}
              disableUnderline
            >
              <MenuItem value="RU" className={Css.lan}>
                <div className={Css.box_option}>
                  <img src="/img/flag_ru.svg" className={Css.flag} />
                  RU
                </div>
              </MenuItem>
              <MenuItem value="KG" className={Css.lan}>
                <div className={Css.box_option}>
                  <img src="/img/flag_kg.svg" className={Css.flag} />
                  KG
                </div>
              </MenuItem>
              <MenuItem value="EN" className={Css.lan}>
                <div className={Css.box_option}>
                  <img src="/img/flag_en.svg" className={Css.flag} />
                  En
                </div>
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {!isAuth ? (
        <Link to="/authentication">
          <button className={Css.btn}>{t("header.login")}</button>
        </Link>
      ) : (
        <Link to="/my-profile">
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
