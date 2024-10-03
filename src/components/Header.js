import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { useContext } from "react";
import useInternetStatus from "../Hooks/useInternetStatus";
import { AppContext } from "../context/AppContext";
import { useSelector } from "react-redux";

const Header = () => {
  const { loginStatus, setLoginStatus } = useContext(AppContext);
  const internetStatus = useInternetStatus("online");

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  const handleLoginClick = () => {
    setLoginStatus(loginStatus == "Login" ? "Logout" : "Login");
  };

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={LOGO_URL} />
        </Link>
      </div>

      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart">
              <div className="header-cart">
                <img
                  src="https://img.icons8.com/?size=100&id=59997&format=png&color=3C3C3CD9"
                  className="header-cart-image"
                />
                <div className="header-cart-count">{cartItems.length}</div>
              </div>
            </Link>
          </li>
          <button className="login-btn" onClick={handleLoginClick}>
            {loginStatus}{" "}
            <p className="online-indicator">
              {internetStatus == "online" ? "🟢" : "🔴"}
            </p>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;