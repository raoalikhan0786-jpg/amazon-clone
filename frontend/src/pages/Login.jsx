import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api";

const Login = () => {
    const navigate = useNavigate();
    
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        if (!emailOrPhone.trim()) {
            setError("Enter your mobile number or email");
            return;
        }
        if (!password.trim()) {
            setError("Enter your password");
            return;
        }

        try {
            const { data } = await API.post("/auth/login", {
                email: emailOrPhone,
                password,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            window.location.href = "/";
        } catch (error) {
            setError("Invalid mobile number/email or password. Please try again.");
        }
    };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    // 🌟 Business Account click handler - Seller Registration page khulega
    const handleBusinessAccount = (e) => {
        e.preventDefault();
        navigate("/seller/register");
    };

    return (
        <div className="azora-auth-page-wrapper">

            <div className="auth-logo-center">
                <span className="auth-brand-name">
                    Azora<span className="auth-logo-dot">.</span>
                </span>
            </div>

            <div className="auth-card-box">
                <h1 className="auth-card-title">Sign in</h1>

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

                    <button type="submit" className="auth-submit-yellow-btn">
                        Continue
                    </button>

                </form>

                <p className="auth-privacy-notice-text">
                    By continuing, you agree to Azora's <a href="#conditions">Conditions of Use</a> and <a href="#privacy">Privacy Notice</a>.
                </p>

                <div className="auth-help-support-link">
                    <a href="#need-help">Need help?</a>
                </div>

                {/* 🌟 Business Account Section - Ab Seller Registration page khulega */}
                <div className="auth-divider-line-thin"></div>
                <div className="auth-business-promo-section">
                    <p className="business-bold-txt">Buying for work?</p>
                    <button
                        onClick={handleBusinessAccount}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#0066c0",
                            cursor: "pointer",
                            fontSize: "0.85rem",
                            textDecoration: "none",
                            padding: "0",
                            fontFamily: "inherit"
                        }}
                        onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                        onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                    >
                        Create a free business account
                    </button>
                </div>

            </div>

            <div className="auth-register-prompt-container">
                <div className="prompt-divider-with-text">
                    <span>New to Azora?</span>
                </div>
                <Link to="/register" className="auth-create-account-gray-btn">
                    Create your Azora account
                </Link>
            </div>

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

export default Login;