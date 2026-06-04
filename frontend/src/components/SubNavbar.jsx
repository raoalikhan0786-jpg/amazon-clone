import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SubNavbar = () => {
  // साइडबार ओपन/क्लोज करने के लिए स्टेट
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // 🌟 केवल इस हिस्से को अपने पुराने useEffect की जगह रिप्लेस (बदल) करना है:
  useEffect(() => {
    if (isSidebarOpen) {
      // 1. जब साइडबार खुलेगा, तो बॉडी (body) पर 'stop-scroll' नाम की क्लास जुड़ जाएगी
      document.body.classList.add("stop-scroll");
    } else {
      // 2. जब साइडबार बंद होगा, तो बॉडी से वो क्लास हट जाएगी
      document.body.classList.remove("stop-scroll");
    }

    // 3. सेफ्टी रीसेट: अगर कस्टमर पेज छोड़कर कहीं और चला जाए, तो क्लास हटा दो
    return () => {
      document.body.classList.remove("stop-scroll");
    };
  }, [isSidebarOpen]); // यह सिर्फ तब चलेगा जब 'isSidebarOpen' की स्टेट बदलेगी

  return (
    <>
      {/* 1. मास्टर सब-नेवबार कंटेनर */}
      <div className="azora-master-sub-navbar">

        {/* लेफ्ट साइड के सारे लिंक्स एक कतार में */}
        <div className="azora-sub-nav-links-left-group">
          <div className="azora-sub-link-item azora-all-trigger" onClick={toggleSidebar}>
            <span>☰</span> All
          </div>
          <Link to="/" className="azora-sub-link-item">Today's Deals</Link>
          <Link to="/customer-service" className="azora-sub-link-item">Customer Service</Link>
          <Link to="/registry" className="azora-sub-link-item">Registry</Link>
          <Link to="/gift-cards" className="azora-sub-link-item">Gift Cards</Link>
          <Link to="/seller/register" className="azora-sub-link-item">Sell</Link>
        </div>

        {/* राइट साइड में चमकता हुआ प्रोमो टेक्स्ट */}
        <div className="azora-sub-nav-promo-right-group">
          <span className="azora-sub-promo-highlight-text">🔥 Big Summer Sale Live Now!</span>
        </div>

      </div>

      {/* 2. बैकग्राउंड पर्दा */}
      {isSidebarOpen && (
        <div className="azora-sidebar-backdrop-curtain" onClick={toggleSidebar}></div>
      )}

      {/* 3. अमेज़न ओरिजिनल कॉपी स्लाइडिंग साइडबार */}
      <div className={`amazon-sliding-sidebar ${isSidebarOpen ? "open" : ""}`}>

        {/* साइडबार हेडर */}
        <div className="sidebar-user-header">
          <div className="user-avatar-circle">👤</div>
          <h3>Hello, Sign In</h3>
          <button className="sidebar-close-x-btn" onClick={toggleSidebar}>✕</button>
        </div>

        {/* मेनू स्क्रॉलेबल कंटेंट */}
        <div className="sidebar-menu-content-scroll">
          <div className="sidebar-section-title">Trending</div>
          <Link to="/" className="sidebar-item-link" onClick={toggleSidebar}>Best Sellers</Link>
          <Link to="/" className="sidebar-item-link" onClick={toggleSidebar}>New Releases</Link>
          <Link to="/" className="sidebar-item-link" onClick={toggleSidebar}>Movers and Shakers</Link>

          <hr className="sidebar-divider-line" />

          <div className="sidebar-section-title">Shop By Department</div>
          <Link to="/" className="sidebar-item-link" onClick={toggleSidebar}>Electronics & Gadgets <span>›</span></Link>
          <Link to="/" className="sidebar-item-link" onClick={toggleSidebar}>Computers & Accessories <span>›</span></Link>
          <Link to="/" className="sidebar-item-link" onClick={toggleSidebar}>Smart Home Devices <span>›</span></Link>
          <Link to="/" className="sidebar-item-link" onClick={toggleSidebar}>Men's & Women's Fashion <span>›</span></Link>

          <hr className="sidebar-divider-line" />

          <div className="sidebar-section-title">Help & Settings</div>
          <Link to="/login" className="sidebar-item-link" onClick={toggleSidebar}>Your Account</Link>
          <Link to="/customer-service" className="sidebar-item-link" onClick={toggleSidebar}>Customer Service</Link>
          <Link to="/login" className="sidebar-item-link" onClick={toggleSidebar}>Sign In</Link>
        </div>

      </div>
    </>
  );
};

export default SubNavbar;