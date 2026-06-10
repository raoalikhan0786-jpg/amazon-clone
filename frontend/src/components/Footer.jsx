import { FaBagShopping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="azora-main-footer">

            <button onClick={handleScrollToTop} className="footer-back-to-top-btn">
                BACK TO TOP
            </button>

            <div className="footer-links-grid-container">

                <div className="footer-links-column">
                    <h5 className="column-heading">Get to Know Us</h5>
                    <ul className="column-links-list">
                        <li><a href="#about">About Azora</a></li>
                        <li><a href="#careers">Careers</a></li>
                        <li><a href="#press">Press Releases</a></li>
                    </ul>
                </div>

                <div className="footer-links-column">
                    <h5 className="column-heading">Connect with Us</h5>
                    <ul className="column-links-list">
                        <li><a href="#facebook">Facebook</a></li>
                        <li><a href="#twitter">Twitter / X</a></li>
                        <li><a href="#instagram">Instagram</a></li>
                    </ul>
                </div>

                <div className="footer-links-column">
                    <h5 className="column-heading">Make Money with Us</h5>
                    <ul className="column-links-list">
                        {/* 🌟 SECURITY REMOVED - Ab koi bhi access kar sakta hai */}
                        <li>
                            <Link to="/seller/register" style={{ fontWeight: "600" }}>
                                Sell on Azora
                            </Link>
                        </li>
                        <li><a href="#affiliate">Become an Affiliate</a></li>
                        <li><a href="#advertise">Advertise Your Products</a></li>
                    </ul>
                </div>

                <div className="footer-links-column">
                    <h5 className="column-heading">Let Us Help You</h5>
                    <ul className="column-links-list">
                        <li><a href="#account">Your Account</a></li>
                        <li><a href="#orders">Your Orders</a></li>
                        <li><a href="#help">Help Center</a></li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom-copyright-area">
                <div className="footer-bottom-logo">
                    <FaBagShopping className="footer-logo-icon" />
                    <span className="footer-logo-text">Azora<span className="footer-logo-dot">.</span></span>
                </div>
                <p className="copyright-fine-print">
                    &copy; 2026 Azora Inc. or its affiliates. All rights reserved.
                </p>
            </div>

        </footer>
    );
};

export default Footer;