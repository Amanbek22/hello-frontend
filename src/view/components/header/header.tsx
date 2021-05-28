import { Link } from "react-router-dom";
import Css from "./header.module.css";

interface PropsType {
  isAuth: boolean;
}
const Header = ({ isAuth }: PropsType) => {
  return (
    <header>
      <Link to="/">
        <img className={Css.logo} src="/img/logo1.png" alt="logo1" />
      </Link>
      <Link to="/news">
        <div>Жаңылыктар</div>
      </Link>
      <div>Маектер</div>
      <div>Жарнамалар</div>
      <div>Байланыш</div>
      <div className={Css.menu}>
        <img className={Css.flag} src="/img/flag.png" alt="flag" />
        <div>KG</div>
        <img className={Css.vector} src="/img/vec.png" alt="vector" />
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
