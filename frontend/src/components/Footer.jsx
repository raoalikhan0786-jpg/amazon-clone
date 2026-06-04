// // एज़ोरा ब्रांड लोगो के लिए शॉपिंग बैग का आइकॉन इम्पोर्ट किया गया है
// import { FaBagShopping } from "react-icons/fa6";
// // 🌟 नया एडिशन: बिना पेज लोड किए राउटिंग करने के लिए react-router-dom से Link इम्पोर्ट किया
// import { Link } from "react-router-dom";

// const Footer = () => {
//     // 'BACK TO TOP' बटन पर क्लिक करने पर स्क्रीन को स्मूथली ऊपर स्क्रॉल करने का फंक्शन
//     const handleScrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//         });
//     };

//     return (
//         /* मुख्य फुटर कंटेनर - जो डार्क अमेज़न थीम पर आधारित है */
//         <footer className="azora-main-footer">

//             {/* 1. बैक टू顶 बटन - पूरी चौड़ाई में */}
//             <button onClick={handleScrollToTop} className="footer-back-to-top-btn">
//                 BACK TO TOP
//             </button>

//             {/* 2. लिंक्स ग्रिड - जो बड़ी स्क्रीन पर 4 कॉलम में बंट जाएगा */}
//             <div className="footer-links-grid-container">

//                 {/* कॉलम 1 */}
//                 <div className="footer-links-column">
//                     <h5 className="column-heading">Get to Know Us</h5>
//                     <ul className="column-links-list">
//                         <li><a href="#about">About Azora</a></li>
//                         <li><a href="#careers">Careers</a></li>
//                         <li><a href="#press">Press Releases</a></li>
//                     </ul>
//                 </div>

//                 {/* कॉलम 2 */}
//                 <div className="footer-links-column">
//                     <h5 className="column-heading">Connect with Us</h5>
//                     <ul className="column-links-list">
//                         <li><a href="#facebook">Facebook</a></li>
//                         <li><a href="#twitter">Twitter / X</a></li>
//                         <li><a href="#instagram">Instagram</a></li>
//                     </ul>
//                 </div>

//                 {/* कॉलम 3 */}
//                 <div className="footer-links-column">
//                     <h5 className="column-heading">Make Money with Us</h5>
//                     <ul className="column-links-list">
//                         {/* 🌟 जादू: 'Sell on Azora' को साधारण <a> से बदलकर <Link> कर दिया जो हमारे नए पेज पर ले जाएगा */}
//                         <li><Link to="/seller/register">Sell on Azora</Link></li>
//                         <li><a href="#affiliate">Become an Affiliate</a></li>
//                         <li><a href="#advertise">Advertise Your Products</a></li>
//                     </ul>
//                 </div>

//                 {/* कॉलम 4 */}
//                 <div className="footer-links-column">
//                     <h5 className="column-heading">Let Us Help You</h5>
//                     <ul className="column-links-list">
//                         <li><a href="#account">Your Account</a></li>
//                         <li><a href="#orders">Your Orders</a></li>
//                         <li><a href="#help">Help Center</a></li>
//                     </ul>
//                 </div>

//             </div>

//             {/* 3. बॉटम एरिया - जहाँ लोगो और कॉपीराइट टेक्स्ट है */}
//             <div className="footer-bottom-copyright-area">

//                 {/* सेंटर ब्रांड लोगो */}
//                 <div className="footer-bottom-logo">
//                     <FaBagShopping className="footer-logo-icon" />
//                     <span className="footer-logo-text">Azora<span className="footer-logo-dot">.</span></span>
//                 </div>

//                 {/* कॉपीराइट डिक्लेरेशन */}
//                 <p className="copyright-fine-print">
//                     &copy; 2026 Azora Inc. or its affiliates. All rights reserved.
//                 </p>

//             </div>

//         </footer>
//     );
// };

// export default Footer;
// एज़ोरा ब्रांड लोगो के लिए शॉपिंग बैग का आइकॉन इम्पोर्ट किया गया है
import { FaBagShopping } from "react-icons/fa6";
// 🌟 नया एडिशन: बिना पेज लोड किए राउटिंग करने के लिए react-router-dom से Link और useNavigate इम्पोर्ट किया
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate(); // 🌟 नेविगेटर इनिशियलाइज किया

    // 'BACK TO TOP' बटन पर क्लिक करने पर स्क्रीन को स्मूथली ऊपर स्क्रॉल करने का फंक्शन
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
            
        });
    };

    // 🌟 100% सटीक लॉक लॉजिक: चेक करेगा कि कस्टमर रजिस्टर्ड/लॉगिन है या नहीं
    const handleSellerAccessControl = (e) => {
        e.preventDefault(); // डिफ़ॉल्ट एंकर ऐक्शन को रोका
        
        // चेक करें कि क्या यूजर ने वेबसाइट पर अपना कस्टमर अकाउंट बनाया/लॉगिन किया है
        const isCustomerLoggedIn = localStorage.getItem("userInfo");

        if (!isCustomerLoggedIn) {
            // 🛑 अगर कस्टमर का रजिस्ट्रेशन नहीं हुआ है, तो उसे रोककर पहले लॉगिन/रजिस्टर पर भेजें
            alert("Security Access Control: Please register or sign in as an Azora Customer first to unlock the merchant registration panel!");
            navigate("/login");
        } else {
            // ✅ अगर कस्टमर पहले से रजिस्टर्ड है, तो ही मर्चेंट/सेलर फॉर्म खुलेगा
            navigate("/seller/register");
        }
    };

    return (
        /* मुख्य फुटर कंटेनर - जो डार्क अमेज़न थीम पर आधारित है */
        <footer className="azora-main-footer">

            {/* 1. बैक टू टॉप बटन - पूरी चौड़ाई में */}
            <button onClick={handleScrollToTop} className="footer-back-to-top-btn">
                BACK TO TOP
            </button>

            {/* 2. लिंक्स ग्रिड - जो बड़ी स्क्रीन पर 4 कॉलम में बंट जाएगा */}
            <div className="footer-links-grid-container">

                {/* कॉलम 1 */}
                <div className="footer-links-column">
                    <h5 className="column-heading">Get to Know Us</h5>
                    <ul className="column-links-list">
                        <li><a href="#about">About Azora</a></li>
                        <li><a href="#careers">Careers</a></li>
                        <li><a href="#press">Press Releases</a></li>
                    </ul>
                </div>

                {/* कॉलम 2 */}
                <div className="footer-links-column">
                    <h5 className="column-heading">Connect with Us</h5>
                    <ul className="column-links-list">
                        <li><a href="#facebook">Facebook</a></li>
                        <li><a href="#twitter">Twitter / X</a></li>
                        <li><a href="#instagram">Instagram</a></li>
                    </ul>
                </div>

                {/* कॉलम 3 */}
                <div className="footer-links-column">
                    <h5 className="column-heading">Make Money with Us</h5>
                    <ul className="column-links-list">
                        {/* 🌟 जादू: 'Sell on Azora' पर क्लिक करते ही हमारा कड़क सिक्योरिटी गार्ड (Access Control) ट्रिगर होगा */}
                        <li>
                            <a href="#" onClick={handleSellerAccessControl} style={{ fontWeight: "600" }}>
                                Sell on Azora
                            </a>
                        </li>
                        <li><a href="#affiliate">Become an Affiliate</a></li>
                        <li><a href="#advertise">Advertise Your Products</a></li>
                    </ul>
                </div>

                {/* कॉलम 4 */}
                <div className="footer-links-column">
                    <h5 className="column-heading">Let Us Help You</h5>
                    <ul className="column-links-list">
                        <li><a href="#account">Your Account</a></li>
                        <li><a href="#orders">Your Orders</a></li>
                        <li><a href="#help">Help Center</a></li>
                    </ul>
                </div>

            </div>

            {/* 3. बॉटम AREA - जहाँ लोगो और कॉपीराइट टेक्स्ट है */}
            <div className="footer-bottom-copyright-area">

                {/* सेंटर ब्रांड लोगो */}
                <div className="footer-bottom-logo">
                    <FaBagShopping className="footer-logo-icon" />
                    <span className="footer-logo-text">Azora<span className="footer-logo-dot">.</span></span>
                </div>

                {/* कॉपीराइट डिक्लेरेशन */}
                <p className="copyright-fine-print">
                    &copy; 2026 Azora Inc. or its affiliates. All rights reserved.
                </p>

            </div>

        </footer>
    );
};

export default Footer;