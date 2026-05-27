// React-Icons से प्रोडक्ट आइकन्स, रेटिंग स्टार्स और कार्ट में ऐड करने का आइकॉन इम्पोर्ट किया गया है
import {
    FaHeadphonesSimple,
    FaStopwatch,
    FaMugSaucer,
    FaGlasses,
    FaStar,
    FaStarHalfStroke,
    FaCartPlus
} from "react-icons/fa6";

const Trending = () => {
    return (
        /* मुख्य ट्रेंडिंग सेक्शन का रैपर */
        <div className="azora-trending-section">

            {/* सेक्शन की मुख्य हेडिंग - टील कलर के छोटे पिलर (Indicator) के साथ */}
            <h2 className="trending-main-heading">
                <span className="heading-teal-indicator"></span>
                Trending Today on Azora
            </h2>

            {/* ४ कॉलम वाला मुख्य प्रोडक्ट ग्रिड */}
            <div className="products-card-grid">

                {/* --- प्रोडक्ट कार्ड 1: Headphones --- */}
                <div className="product-item-card">
                    <div className="product-card-top">
                        {/* ग्रे कलर का इमेज बॉक्स जिसके अंदर आइकॉन हवर करने पर ज़ूम होगा */}
                        <div className="product-gray-img-box">
                            <FaHeadphonesSimple className="product-icon-inside" />
                            <span className="discount-badge badge-rose">-15%</span>
                        </div>
                        <span className="product-category-tag">Electronics</span>
                        <h4 className="product-item-name">Azora SoundBlast Pro Wireless Headphones</h4>
                        {/* स्टार रेटिंग सिस्टम */}
                        <div className="product-stars-rating">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfStroke />
                            <span className="rating-count-text">(1,240)</span>
                        </div>
                    </div>
                    {/* बॉटम एरिया - जहाँ प्राइस और कार्ट बटन एक लाइन में हैं */}
                    <div className="product-card-bottom">
                        <div className="product-price-block">
                            <span className="current-price">$129.00</span>
                            <span className="original-price">$149.00</span>
                        </div>
                        <button className="add-to-cart-circle-btn">
                            <FaCartPlus />
                        </button>
                    </div>
                </div>

                {/* --- प्रोडक्ट कार्ड 2: Smart Watch --- */}
                <div className="product-item-card">
                    <div className="product-card-top">
                        <div className="product-gray-img-box">
                            <FaStopwatch className="product-icon-inside" />
                            <span className="discount-badge badge-emerald">Top Seller</span>
                        </div>
                        <span className="product-category-tag">Gadgets</span>
                        <h4 className="product-item-name">FitTrack Smart Sport Watch v4</h4>
                        <div className="product-stars-rating">
                            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            <span className="rating-count-text">(890)</span>
                        </div>
                    </div>
                    <div className="product-card-bottom">
                        <div className="product-price-block">
                            <span className="current-price">$79.99</span>
                        </div>
                        <button className="add-to-cart-circle-btn">
                            <FaCartPlus />
                        </button>
                    </div>
                </div>

                {/* --- प्रोडक्ट कार्ड 3: Coffee Mug --- */}
                <div className="product-item-card">
                    <div className="product-card-top">
                        <div className="product-gray-img-box">
                            <FaMugSaucer className="product-icon-inside" />
                        </div>
                        <span className="product-category-tag">Kitchen</span>
                        <h4 className="product-item-name">Minimalist Ceramic Coffee Mug Set (4-Piece)</h4>
                        <div className="product-stars-rating">
                            <FaStar /><FaStar /><FaStar /><FaStarHalfStroke /><i className="fa-regular fa-star" style={{ color: '#eab308' }}></i>
                            <span className="rating-count-text">(120)</span>
                        </div>
                    </div>
                    <div className="product-card-bottom">
                        <div className="product-price-block">
                            <span className="current-price">$24.50</span>
                        </div>
                        <button className="add-to-cart-circle-btn">
                            <FaCartPlus />
                        </button>
                    </div>
                </div>

                {/* --- प्रोडक्ट कार्ड 4: Sunglasses --- */}
                <div className="product-item-card">
                    <div className="product-card-top">
                        <div className="product-gray-img-box">
                            <FaGlasses className="product-icon-inside" />
                            <span className="discount-badge badge-rose">-30%</span>
                        </div>
                        <span className="product-category-tag">Fashion</span>
                        <h4 className="product-item-name">Urban Classic Polarized Sunglasses</h4>
                        <div className="product-stars-rating">
                            <FaStar /><FaStar /><FaStar /><FaStar /><i className="fa-regular fa-star" style={{ color: '#eab308' }}></i>
                            <span className="rating-count-text">(450)</span>
                        </div>
                    </div>
                    <div className="product-card-bottom">
                        <div className="product-price-block">
                            <span className="current-price">$35.00</span>
                            <span className="original-price">$50.00</span>
                        </div>
                        <button className="add-to-cart-circle-btn">
                            <FaCartPlus />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Trending;