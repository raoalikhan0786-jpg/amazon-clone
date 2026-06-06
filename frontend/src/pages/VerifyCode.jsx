import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const VerifyCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { emailOrPhone } = location.state || { emailOrPhone: "" };
    
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);
    const [isWhatsAppMode, setIsWhatsAppMode] = useState(false);

    // Format phone number for display (hide middle digits)
    const getMaskedPhone = () => {
        const phone = emailOrPhone.replace(/[^0-9]/g, "");
        if (phone.length >= 10) {
            return `***-***-${phone.slice(-2)}`;
        }
        return emailOrPhone;
    };

    // Timer for resend button
    useEffect(() => {
        if (timer > 0 && !canResend) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            setCanResend(true);
        }
    }, [timer, canResend]);

    const generateAndSendCode = () => {
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        sessionStorage.setItem("resetCode", randomCode);
        
        // Check if email or phone
        const isEmail = emailOrPhone.includes("@");
        if (isEmail) {
            alert(`📧 Verification code sent to your email: ${emailOrPhone}\nCode: ${randomCode}`);
        } else {
            alert(`📱 Verification code sent to your phone: ${emailOrPhone}\nCode: ${randomCode}`);
        }
        return randomCode;
    };

    const generateAndSendWhatsAppCode = () => {
        const randomCode = Math.floor(100000 + Math.random() * 900000).toString();
        sessionStorage.setItem("whatsappResetCode", randomCode);
        
        // WhatsApp par code bhejna
        const phoneNumber = emailOrPhone.replace(/[^0-9]/g, "");
        const whatsappMessage = `Your Azora verification code is: ${randomCode}. Please enter this code to verify your account.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        return randomCode;
    };

    useEffect(() => {
        generateAndSendCode();
    }, []);

    const handleResendCode = () => {
        if (canResend) {
            if (isWhatsAppMode) {
                generateAndSendWhatsAppCode();
            } else {
                generateAndSendCode();
            }
            setTimer(60); // 60 seconds as per Amazon style
            setCanResend(false);
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        let storedCode;
        if (isWhatsAppMode) {
            storedCode = sessionStorage.getItem("whatsappResetCode");
        } else {
            storedCode = sessionStorage.getItem("resetCode");
        }
        
        if (verificationCode === storedCode) {
            setTimeout(() => {
                setLoading(false);
                navigate("/reset-password", { state: { emailOrPhone } });
            }, 500);
        } else {
            setError("Invalid verification code. Please try again.");
            setLoading(false);
        }
    };

    const handleWhatsAppVerify = () => {
        setIsWhatsAppMode(true);
        generateAndSendWhatsAppCode();
        setTimer(86);
        setCanResend(false);
        setVerificationCode("");
        setError("");
    };

    const handleBackToNormalVerify = () => {
        setIsWhatsAppMode(false);
        generateAndSendCode();
        setTimer(30);
        setCanResend(false);
        setVerificationCode("");
        setError("");
    };

    return (
        <div className="azora-auth-page-wrapper">
            {/* Logo */}
            <div className="auth-logo-center">
                <span className="auth-brand-name">
                    Azora<span className="auth-logo-dot">.</span>
                </span>
            </div>

            {/* Verification Code Card */}
            <div className="auth-card-box">
                <h1 className="auth-card-title">
                    {isWhatsAppMode ? "Verify with WhatsApp" : "Enter verification code"}
                </h1>

                <p className="auth-help-text" style={{
                    fontSize: "0.85rem",
                    marginBottom: "20px",
                    color: "#555",
                    lineHeight: "1.4"
                }}>
                    {isWhatsAppMode 
                        ? `Enter the code we sent to your phone number ${getMaskedPhone()} on WhatsApp.`
                        : `For your security, we have sent the code to your phone ${getMaskedPhone()}`
                    }
                </p>

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

                <form onSubmit={handleSubmit} className="auth-main-form">

                    {/* Verification Code Input - 50% smaller text */}
                    <div className="auth-input-group">
                        <label className="auth-input-label" style={{ fontSize: "1.0rem",fontWeight:"0.5rem",marginBottom: "10px" }}>
                            {isWhatsAppMode ? "Enter code" : "Enter verification code"}
                        </label>
                        <input
                            type="text"
                            className="auth-text-field"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            maxLength="6"
                            required
                            style={{ 
                                textAlign: "center", 
                                fontSize: "0.85rem", 
                                letterSpacing: "3px",
                                padding: "8px"
                            }}
                        />
                    </div>

                    {/* Resend Code Link */}
                    <div className="auth-resend-code" style={{ textAlign: "center", marginBottom: "15px" }}>
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={!canResend}
                            style={{
                                background: "none",
                                border: "none",
                                color: canResend ? "#0066c0" : "#999",
                                cursor: canResend ? "pointer" : "not-allowed",
                                fontSize: "0.85rem",
                                fontWeight: "normal",
                                textDecoration: "none"
                            }}
                            onMouseEnter={(e) => {
                                if (canResend) e.target.style.textDecoration = "underline";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.textDecoration = "none";
                            }}
                        >
                            Resend code
                            {!canResend && (
                                <span style={{ color: "#999", marginLeft: "5px", fontSize: "0.7rem" }}>
                                    (Please wait {timer} seconds before requesting another code)
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Submit Code Button */}
                    <button
                        type="submit"
                        className="auth-submit-yellow-btn"
                        disabled={loading}
                        style={{ marginBottom: "15px" }}
                    >
                        {loading ? "Verifying..." : (isWhatsAppMode ? "Verify" : "Submit code")}
                    </button>

                </form>

                {/* Need Help Section */}
                <div className="auth-need-help" style={{ marginTop: "15px" }}>
                    <p style={{ fontSize: "0.75rem", color: "#666", marginBottom: "5px" }}>
                        Need help?
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#666", marginBottom: "15px" }}>
                        If you cannot receive the code or if you changed your email or phone number, 
                        <Link to="/login" style={{ color: "#0066c0", textDecoration: "none", marginLeft: "4px" }}
                            onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                            onMouseLeave={(e) => e.target.style.textDecoration = "none"}>
                            try a different way
                        </Link>
                    </p>
                </div>


                {/* Back to Normal Verify Link (when in WhatsApp mode) */}
                {isWhatsAppMode && (
                    <div className="auth-back-to-normal" style={{ textAlign: "center", marginTop: "15px" }}>
                        <button
                            type="button"
                            onClick={handleBackToNormalVerify}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#0066c0",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                textDecoration: "none"
                            }}
                            onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                            onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                        >
                            ← Back to code verification
                        </button>
                    </div>
                )}

                {/* Back to Sign In Link */}
                <div className="auth-back-to-login" style={{ marginTop: "20px", textAlign: "center" }}>
                    <Link to="/login" className="link-style" style={{ color: "#0066c0", fontSize: "0.85rem" }}>
                        ← Back to Sign in
                    </Link>
                </div>

            </div>
            <div>
                {/* Verify with WhatsApp - Chote div ke andar */}
                {!isWhatsAppMode && (
                    <div className="auth-whatsapp-verify" style={{ 
                        textAlign: "center", 
                        marginTop: "15px",
                        padding: "12px",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid #e7e7e7"
                    }}>
                        <button
                            type="button"
                            onClick={handleWhatsAppVerify}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#0066c0",
                                cursor: "pointer",
                                fontSize: "1.0rem",
                                textDecoration: "none",
                                fontWeight: "500"
                            }}
                            onMouseEnter={(e) => e.target.style.textDecoration = "underline"}
                            onMouseLeave={(e) => e.target.style.textDecoration = "none"}
                        >
                            Verify with WhatsApp
                        </button>
                        <p style={{ fontSize: "0.7rem", color: "#666", marginTop: "8px", marginBottom: "0" }}>
                            Don't have WhatsApp? You can download the app on your device.
                        </p>
                    </div>
                )}
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

export default VerifyCode;