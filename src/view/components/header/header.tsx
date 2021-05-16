import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/authentication">login</Link>
        </li>
      </ul>
      <hr />
    </header>
  );
};

export default Header;
