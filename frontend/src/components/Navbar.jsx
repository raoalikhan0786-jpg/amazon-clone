import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

const Navbar = () => {

  const { cart } =
    useContext(StoreContext);

  const userInfo =
    JSON.parse(
      localStorage.getItem("userInfo")
    );

  return (

    <>

      <nav className="navbar">

        <div className="nav-logo">
          amazon
        </div>

        <div className="nav-location">

          <p>Hello</p>
          <h4>Select your address</h4>

        </div>

        <div className="nav-search">

          <select className="search-select">

            <option>All</option>

          </select>

          <input
            type="text"
            placeholder="Search Amazon"
            className="search"
          />

          <button className="search-btn">
            🔍
          </button>

        </div>

        <div className="nav-language">
          EN
        </div>

        {

          userInfo ? (

            <div className="nav-account">

              <p>Hello,</p>
              <h4>My Account</h4>

            </div>

          ) : (

            <Link
              to="/login"
              className="login-link"
              style={{
                color: "white",
                textDecoration: "none"
              }}
            >

              <div className="nav-account">

                <p>Hello, sign in</p>
                <h4>Login</h4>

              </div>

            </Link>

          )

        }

        <div className="nav-orders">

          <p>Returns</p>
          <h4>& Orders</h4>

        </div>

        <Link
          to="/register"
          style={{
            color: "white",
            textDecoration: "none",
            marginRight: "20px"
          }}
        >
          Register
        </Link>

        <Link
          to="/cart"
          className="cart-link"
        >
          🛒 Cart ({cart.length})
        </Link>

      </nav>

      <div className="menu-bar">

        <p>Today's Deals</p>
        <p>Customer Service</p>
        <p>Registry</p>
        <p>Gift Cards</p>
        <p>Sell</p>

      </div>

    </>

  );

};

export default Navbar;