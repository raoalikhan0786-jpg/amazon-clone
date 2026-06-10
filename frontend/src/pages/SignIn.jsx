import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api";

const SignIn = () => {
    const navigate = useNavigate();  // ✅ ADDED for navigation

    // States
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        // Validation - Email ya Phone dono accept karega
        if (!emailOrPhone.trim()) {
            setError("Enter your mobile number or email");
            return;
        }
        if (!password.trim()) {
            setError("Enter your password");
            return;
        }

        try {
            // Email ya Phone dono bhej rahe hain as "email" field mein
            const { data } = await API.post("/auth/SignIn", {
                email: emailOrPhone,
                password,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            window.location.href = "/";
        } catch (error) {
            setError("Invalid mobile number/email or password. Please try again.");
        }
    };

    // 🔴🔴🔴 FIXED: Forgot Password - Sirf page open karega, reset link nahi bhejega 🔴🔴🔴
    const handleForgotPassword = () => {
        // ✅ Ab bina email/phone check ke seedha forgot password page open hoga
        navigate("/forgot-password");
    };

    return (
        <div className="azora-auth-page-wrapper">

            {/* Logo */}
            <div className="auth-logo-center">
                <span className="auth-brand-name">
                    Azora<span className="auth-logo-dot">.</span>
                </span>
            </div>

            {/* Main SignIn Card */}
            <div className="auth-card-box">
                <h1 className="auth-card-title">Sign in</h1>

                {/* Error Message */}
                {error && (
                    <div className="amazon-alert-danger" style={{
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        border: "1px solid #fecaca",
                        padding: "10px",
                        borderRadius: "4px",
                        fontSize: "0.82rem",
                        marginBottom: "15px"
                    }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={submitHandler} className="auth-main-form">

                    {/* Email or Phone Input - Dono accept karega */}
                    <div className="auth-input-group">
                        <label className="auth-input-label">Enter mobile number or email</label>
                        <input
                            type="text"
                            className="auth-text-field"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            placeholder="Enter mobile number or email"
                            required
                        />
                    </div>

                    {/* Password Field with Eye Icon */}
                    <div className="auth-input-group">
                        <label className="auth-input-label">Enter Password</label>
                        <div className="password-input-wrapper" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="auth-text-field"
                                style={{ flex: 1, paddingRight: "40px" }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "12px",
                                    cursor: "pointer",
                                    color: "#666",
                                    fontSize: "18px"
                                }}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    </div>

                    {/* Forgot Password Link - ✅ Ab seedha page khulega */}
                    <div className="auth-forgot-password" style={{ textAlign: "right", marginBottom: "15px" }}>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#0066c0",
                                cursor: "pointer",
                                fontSize: "0.75rem",
                                fontWeight: "normal",
                                textDecoration: "none"
                            }}
                            onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                            onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                        >
                            Forgot your password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="auth-submit-yellow-btn">
                        Continue
                    </button>

                </form>

                {/* Privacy Notice */}
                <p className="auth-privacy-notice-text">
                    By continuing, you agree to Azora's <a href="#conditions">Conditions of Use</a> and <a href="#privacy">Privacy Notice</a>.
                </p>

                {/* Help Link */}
                <div className="auth-help-support-link">
                    <a href="#need-help">Need help?</a>
                </div>

                {/* Business Account Section */}
                <div className="auth-divider-line-thin"></div>
                <div className="auth-business-promo-section">
                    <p className="business-bold-txt">Buying for work?</p>
                    <Link to="/seller/register" className="business-link-txt">
                        Create a free business account
                    </Link>
                </div>

            </div>

            {/* New Customer SignUp Section */}
            <div className="auth-SignUp-prompt-container">
                <div className="prompt-divider-with-text">
                    <span>New to Azora?</span>
                </div>

                <Link to="/SignUp" className="auth-create-account-gray-btn">
                    Create your Azora account
                </Link>
            </div>

            {/* Footer */}
            <div className="auth-page-mini-footer">
                <div className="mini-footer-links">
                    <a href="#conditions">Conditions of Use</a>
                    <a href="#privacy">Privacy Notice</a>
                    <a href="#help">Help</a>
                </div>
                <p className="mini-footer-copyright-txt">
                    &copy; 2026, Azora.com, Inc. or its affiliates
                </p>
            </div>

        </div>
    );
};

export default SignIn;