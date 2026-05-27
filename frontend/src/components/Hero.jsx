// रिएक्ट-आइकॉन्स से शॉपिंग बैग और लेफ्ट-राइट एरो इम्पोर्ट किए गए हैं
import { FaBagShopping, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Hero = () => {
  return (
    /* मुख्य हीरो सेक्शन कंटेनर */
    <div className="azora-hero-slider">

      {/* बैकग्राउंड में दिखने वाला बड़ा पारदर्शी शॉपिंग बैग (वाटरमार्क इफ़ेक्ट) */}
      <div className="hero-background-watermark">
        <FaBagShopping />
      </div>

      {/* हीरो सेक्शन का मुख्य टेक्स्ट और बटन एरिया */}
      <div className="hero-content-box">
        {/* 'Exclusive Offers' वाला छोटा राउंडेड टैग */}
        <span className="hero-badge">Exclusive Offers</span>

        {/* मुख्य बड़ी हेडलाइन */}
        <h1 className="hero-main-title">
          Upgrade Your Style <br />
          <span className="hero-gradient-text">Save up to 40% Off</span>
        </h1>

        {/* छोटा डिस्क्रिप्शन टेक्स्ट */}
        <p className="hero-description">
          Discover premium gadgets, trending clothing, and home essentials tailored just for you.
        </p>

        {/* 'Shop Deals Now' का मुख्य बटन */}
        <button className="hero-action-button">
          Shop Deals Now
        </button>
      </div>

      {/* स्लाइडर के लेफ्ट और राइट एरो बटन्स (फोटो के अनुसार पारदर्शी लुक में) */}
      <button className="hero-arrow-btn arrow-left">
        <FaChevronLeft />
      </button>

      <button className="hero-arrow-btn arrow-right">
        <FaChevronRight />
      </button>

    </div>
  );
};

export default Hero;