// React-Icons से "All" मेन्यू के लिए FaBars (तीन लाइन वाला आइकॉन) इम्पोर्ट किया गया है
import { FaBars } from "react-icons/fa6";

const SubNavbar = () => {
  return (
    /* सब नेवबार लिंक्स रो का मुख्य कंटेनर */
    <div className="sub-navbar-links-bar">
      
      {/* लेफ्ट साइड के नेविगेशन लिंक्स */}
      <div className="sub-nav-left-links">
        {/* FaBars आइकॉन के साथ 'All' मेन्यू ट्रिगर */}
        <span className="all-menu-trigger">
          <FaBars /> All
        </span>
        <a href="#deals" className="sub-nav-anchor">Today's Deals</a>
        <a href="#customer-service" className="sub-nav-anchor">Customer Service</a>
        <a href="#registry" className="sub-nav-anchor">Registry</a>
        <a href="#gift-cards" className="sub-nav-anchor">Gift Cards</a>
        <a href="#sell" className="sub-nav-anchor">Sell</a>
      </div>

      {/* राइट साइड का सेल अलर्ट टेक्स्ट (यह बड़ी स्क्रीन्स पर ही दिखेगा) */}
      <div className="sub-nav-sale-alert">
        🔥 Big Summer Sale Live Now!
      </div>

    </div>
  );
};

export default SubNavbar;