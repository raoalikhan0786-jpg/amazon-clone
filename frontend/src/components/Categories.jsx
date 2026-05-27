// React-Icons से गेमपैड, शर्ट, मोज़े, जूते, घड़ी, सोफा और ग्लास के आइकन्स इम्पोर्ट किए गए हैं
import {
  FaGamepad,
  FaShirt,
  FaSocks,
  FaCouch,
  FaWhiskeyGlass
} from "react-icons/fa6";
import { GiFootprint } from "react-icons/gi"; // जूतों के लिए स्पेशल आइकॉन
import { IoWatchOutline } from "react-icons/io5"; // घड़ी के लिए

const Categories = () => {
  return (
    /* मुख्य कैटेगरी ग्रिड कंटेनर - जो फोटो की तरह 4 कॉलम बनाएगा */
    <div className="azora-categories-grid">

      {/* --- कार्ड 1: Gaming Category --- */}
      <div className="category-card">
        <h3 className="category-title">Get your game on</h3>
        {/* फोटो की तरह बीच में सिंगल बड़ा ग्रे बॉक्स */}
        <div className="single-product-gray-box">
          <FaGamepad className="large-gray-icon" />
        </div>
        <a href="#gaming" className="category-link-anchor">Explore controllers & gear →</a>
      </div>

      {/* --- कार्ड 2: Fashion Category (4-in-1 Grid) --- */}
      <div className="category-card">
        <h3 className="category-title">Shop Fashion for less</h3>
        {/* इसके अंदर 4 छोटे-छोटे डिब्बों का ग्रिड बनेगा */}
        <div className="sub-four-grid">

          <div className="four-grid-item">
            <div className="small-gray-box"><FaShirt className="small-grid-icon" /></div>
            <p className="small-grid-text">Tops under $25</p>
          </div>

          <div className="four-grid-item">
            <div className="small-gray-box"><FaSocks className="small-grid-icon" /></div>
            <p className="small-grid-text">Jeans under $50</p>
          </div>

          <div className="four-grid-item">
            <div className="small-gray-box"><GiFootprint className="small-grid-icon" /></div>
            <p className="small-grid-text">Shoes Sale</p>
          </div>

          <div className="four-grid-item">
            <div className="small-gray-box"><IoWatchOutline className="small-grid-icon" /></div>
            <p className="small-grid-text">Watches</p>
          </div>

        </div>
        <a href="#fashion" className="category-link-anchor">See more fashion deals →</a>
      </div>

      {/* --- कार्ड 3: Home Category --- */}
      <div className="category-card">
        <h3 className="category-title">New home arrivals under $50</h3>
        <div className="single-product-gray-box">
          <FaCouch className="large-gray-icon" />
        </div>
        <a href="#home-decor" className="category-link-anchor">Shop kitchen & decor →</a>
      </div>

      {/* --- कार्ड 4: Trending/Dads Category --- */}
      <div className="category-card">
        <h3 className="category-title">Trending Deals for Dads</h3>
        <div className="single-product-gray-box">
          <FaWhiskeyGlass className="large-gray-icon" />
        </div>
        <a href="#gifts" className="category-link-anchor">See full gift guide →</a>
      </div>

    </div>
  );
};

export default Categories;