// React-Icons से सभी आवश्यक अमेज़न-स्टाइल आइकन्स इम्पोर्ट किए गए हैं
import {
  FaBagShopping,
  FaLocationDot,
  FaCaretDown,
  FaMagnifyingGlass,
  FaCartShopping
} from "react-icons/fa6";

const Navbar = () => {
  return (
    /* मुख्य टॉप नेवबार कंटेनर */
    <div className="main-navbar">

      {/* 1. ब्रांड लोगो एरिया (Azora.) */}
      <div className="nav-logo-zone">
        <FaBagShopping className="logo-bag-icon" />
        <span className="logo-brand-name">
          Azora<span className="logo-dot">.</span>
        </span>
      </div>

      {/* 2. डिलीवरी लोकेशन एरिया */}
      <div className="nav-location-zone">
        <FaLocationDot className="location-marker-icon" />
        <div className="location-text-box">
          <p className="location-title">Deliver to</p>
          <p className="location-country">India</p>
        </div>
      </div>

      {/* 3. अमेज़न-स्टाइल मर्ज्ड सर्च बार (Drop-down + Input + Button) */}
      <div className="nav-search-container">

        {/* कैटेगरी सेलेक्ट ड्रॉपडाउन */}
        <div className="search-dropdown-wrapper">
          <select className="search-category-select">
            <option>All</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home</option>
          </select>
          <FaCaretDown className="dropdown-caret-icon" />
        </div>

        {/* सर्च इनपुट बॉक्स */}
        <input
          type="text"
          placeholder="Search Azora..."
          className="search-text-input"
        />

        {/* सर्च सबमिट बटन */}
        <button className="search-submit-button">
          <FaMagnifyingGlass className="search-magnifier-icon" />
        </button>
      </div>

      {/* 4. राइट side यूटिलिटी लिंक्स (भाषा, अकाउंट ड्रॉपडाउन, ऑर्डर्स, कार्ट) */}
      <div className="nav-right-links">

        {/* भाषा सिलेक्शन (🌐 EN) */}
        <div className="language-selector-box">
          <span>🌐 EN</span>
          <FaCaretDown className="link-caret-icon" />
        </div>

        {/* 🌟 यहाँ पर हमने नया 'Account & Lists' ड्रॉपडाउन मेन्यू पूरी तरह फिट कर दिया है */}
        <div className="nav-item-account-dropdown">
          {/* यह वो मुख्य बटन है जो हमेशा दिखेगा */}
          <div className="nav-account-trigger">
            <span className="sub-text">Hello, sign in</span>
            <span className="main-text flex-caret">
              Account & Lists <FaCaretDown className="link-caret-icon" />
            </span>
          </div>

          {/* यहाँ से ड्रॉपडाउन मेन्यू शुरू होता है जो माउस ले जाने पर दिखेगा */}
          <div className="azora-account-dropdown-menu">
            {/* टॉप का साइन-इन बटन एरिया */}
            <div className="dropdown-signin-header">
              <a href="/login" class="dropdown-signin-btn">Sign in</a>
              <p className="dropdown-new-cust">New customer? <a href="/register">Start here.</a></p>
            </div>

            {/* दो कॉलम्स वाला मुख्य कंटेंट एरिया */}
            <div className="dropdown-columns-container">

              {/* Left Column: Your Lists */}
              <div className="dropdown-column">
                <h3 className="dropdown-col-title">Your Lists</h3>
                <ul className="dropdown-links-list">
                  <li><a href="/wishlist">Create a Wish List</a></li>
                  <li><a href="/wishlist/find">Find a List or Gift</a></li>
                  <li><a href="/explore">Explore Azora Showroom</a></li>
                </ul>
              </div>

              {/* Right Column: Your Account */}
              <div className="dropdown-column border-left">
                <h3 className="dropdown-col-title">Your Account</h3>
                <ul className="dropdown-links-list">
                  <li><a href="/account">Your Account</a></li>
                  <li><a href="/orders">Your Orders</a></li>
                  <li><a href="/recommendations">Your Recommendations</a></li>
                  <li><a href="/cart">Your Keep Shopping For</a></li>
                  <li><a href="/profile">Switch Accounts</a></li>
                  <li className="menu-divider"></li>
                  <li><a href="/logout" className="sign-out-link">Sign Out</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* रिटर्न और ऑर्डर्स ट्रैकिंग */}
        <div className="returns-orders-box">
          <p className="sub-text">Returns</p>
          <p className="main-text">& Orders</p>
        </div>

        {/* शॉपिंग कार्ट काउंटर के साथ */}
        <div className="shopping-cart-box">
          <div className="cart-icon-wrapper">
            <FaCartShopping className="cart-main-icon" />
            <span className="cart-items-counter">0</span>
          </div>
          <span className="cart-label-text">Cart</span>
        </div>

      </div>

    </div>
  );
};

export default Navbar;