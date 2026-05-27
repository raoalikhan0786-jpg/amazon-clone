import { useState } from "react";
import { Link } from "react-router-dom"; // अमेज़न की तरह लिंक्स पर रीडायरेक्ट करने के लिए
import API from "../api";

const Login = () => {
    // पुराने स्टेट्स और लॉजिक को बिल्कुल वैसे ही रखा गया है ताकि API न टूटे
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post("/auth/login", {
                email,
                password,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            window.location.href = "/"; // लॉगिन सफल होने पर होमपेज पर भेज देगा
        } catch (error) {
            alert("Invalid Login");
        }
    };

    return (
        /* मुख्य लॉगिन पेज कंटेनर */
        <div className="azora-auth-page-wrapper">

            {/* 1. सबसे ऊपर चमचमाता अज़ोरा ब्रांड लोगो (अमेज़न स्टाइल में ब्लैक टेक्स्ट और टील डॉट) */}
            <div className="auth-logo-center">
                <span className="auth-brand-name">
                    Azora<span className="auth-logo-dot">.</span>
                </span>
            </div>

            {/* 2. मुख्य लॉगिन सफ़ेद डिब्बा (Sign-in Card) */}
            <div className="auth-card-box">
                <h1 className="auth-card-title">Sign in</h1>

                <form onSubmit={submitHandler} className="auth-main-form">

                    {/* ईमेल इनपुट फील्ड */}
                    <div className="auth-input-group">
                        <label className="auth-input-label">Email or mobile phone number</label>
                        <input
                            type="email"
                            className="auth-text-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* पासवर्ड इनपुट फील्ड */}
                    <div className="auth-input-group">
                        <label className="auth-input-label">Enter Password</label>
                        <input
                            type="password"
                            className="auth-text-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* अमेज़न स्टाइल चमकीला पीला/ Teal बटन सबमिट करने के लिए */}
                    <button type="submit" className="auth-submit-yellow-btn">
                        Continue
                    </button>

                </form>

                {/* छोटा प्राइवेसी डिस्क्लेमर */}
                <p className="auth-privacy-notice-text">
                    By continuing, you agree to Azora's <a href="#conditions">Conditions of Use</a> and <a href="#privacy">Privacy Notice</a>.
                </p>

                {/* मदद के लिए छोटा सा ड्रॉपडाउन जैसा लिंक */}
                <div className="auth-help-support-link">
                    <a href="#need-help">Need help?</a>
                </div>

                {/* बिजनेस अकाउंट के लिए एक्स्ट्रा इन्फो (जैसा आपकी फोटो में है) */}
                <div className="auth-divider-line-thin"></div>
                <div className="auth-business-promo-section">
                    <p className="business-bold-txt">Buying for work?</p>
                    <a href="#business-account" className="business-link-txt">Create a free business account</a>
                </div>

            </div>

            {/* 3. कार्ड के ठीक नीचे नया कस्टमर रजिस्टर बटन एरिया */}
            <div className="auth-register-prompt-container">
                <div className="prompt-divider-with-text">
                    <span>New to Azora?</span>
                </div>
                {/* रजिस्ट्रेशन पेज पर जाने के लिए React Router का लिंक */}
                <Link to="/register" className="auth-create-account-gray-btn">
                    Create your Azora account
                </Link>
            </div>

            {/* 4. फुटर एरिया (बारीक लिंक्स और आपका नया 2026 कॉपीराइट) */}
            <div className="auth-page-mini-footer">
                <div className="mini-footer-links">
                    <a href="#conditions">Conditions of Use</a>
                    <a href="#privacy">Privacy Notice</a>
                    <a href="#help">Help</a>
                </div>
                <p className="mini-footer-copyright-txt">
                    {/* 🌟 यहाँ पर सिर्फ 2026 कर दिया गया है क्योंकि Azora की शुरुआत यहीं से है */}
                    &copy; 2026, Azora.com, Inc. or its affiliates
                </p>
            </div>

        </div>
    );
};

export default Login;