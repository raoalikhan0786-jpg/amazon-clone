import { Link } from "react-router-dom";

import { useContext } from "react";

import { StoreContext }
  from "../context/StoreContext";

const userInfo =
  JSON.parse(
    localStorage.getItem("userInfo")
  );

const Navbar = () => {

  const { cart } =
    useContext(StoreContext);

  return (

    <>

      <nav className="navbar">

        <div className="nav-logo">
          amazon
        </div>

        <div className="nav-location">

          <p>Hello</p>

          <h4>
            Select your address
          </h4>

        </div>

        <div className="nav-search">

          <select
            className="search-select"
          >

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

        {/* ACCOUNT */}

        <div className="nav-account">

          {

            userInfo ? (

              <>

                <p>
                  Hello,
                  {userInfo.name}
                </p>

                <h4>
                  My Account
                </h4>

              </>

            ) : (

              <Link to="/login">

                <p>
                  Hello, sign in
                </p>

                <h4>
                  Accounts & Lists
                </h4>

              </Link>

            )

          }

        </div>

        {/* ORDERS */}

        <div className="nav-orders">

          <p>Returns</p>

          <h4>
            & Orders
          </h4>

        </div>

        {/* CART */}

        <Link
          to="/cart"
          className="cart-link"
        >

          🛒 Cart ({cart.length})

        </Link>

      </nav>

      {/* MENU BAR */}

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