// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//     const navigate = useNavigate();
//     const [emailOrPhone, setEmailOrPhone] = useState("");
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         if (!emailOrPhone.trim()) {
//             setError("Enter your email address or mobile phone number");
//             return;
//         }

//         setLoading(true);

//         try {
//             // Yahan par backend API call karenge
//             // await API.post("/auth/forgot-password", { emailOrPhone });

//             // Simulation for now
//             setTimeout(() => {
//                 setSuccess(true);
//                 setLoading(false);
//             }, 500);
//         } catch (err) {
//             setError("Account not found with this email or phone number");
//             setLoading(false);
//         }
//     };

//     // ForgotPassword.jsx mein handleGetOTP function ko change karo:

//     const handleGetOTP = () => {
//         if (!emailOrPhone.trim()) {
//             setError("Enter your email address or mobile phone number");
//             return;
//         }
//         // ✅ Direct VerifyOTP page par navigate karega
//         navigate("/verify-otp", { state: { emailOrPhone } });
//     };

//     return (
//         <div className="azora-auth-page-wrapper">
//             {/* Logo */}
//             <div className="auth-logo-center">
//                 <span className="auth-brand-name">
//                     Azora<span className="auth-logo-dot">.</span>
//                 </span>
//             </div>

//             {/* Forgot Password Card */}
//             <div className="auth-card-box">
//                 <h1 className="auth-card-title">Password assistance</h1>

//                 <p className="auth-help-text" style={{
//                     fontSize: "0.85rem",
//                     marginBottom: "20px",
//                     color: "#555",
//                     lineHeight: "1.4"
//                 }}>
//                     Enter the email address or mobile phone number associated with your Azora account.
//                 </p>

//                 {/* Error Message */}
//                 {error && (
//                     <div className="amazon-alert-danger" style={{
//                         backgroundColor: "#fee2e2",
//                         color: "#dc2626",
//                         border: "1px solid #fecaca",
//                         padding: "10px",
//                         borderRadius: "4px",
//                         fontSize: "0.82rem",
//                         marginBottom: "15px"
//                     }}>
//                         ⚠️ {error}
//                     </div>
//                 )}

//                 {/* Success Message */}
//                 {success && (
//                     <div className="amazon-alert-success" style={{
//                         backgroundColor: "#f0fdf4",
//                         color: "#16a34a",
//                         border: "1px solid #bbf7d0",
//                         padding: "10px",
//                         borderRadius: "4px",
//                         fontSize: "0.82rem",
//                         marginBottom: "15px"
//                     }}>
//                         ✅ Password reset link has been sent to your email. Please check your inbox.
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="auth-main-form">

//                     {/* Email or Phone Input */}
//                     <div className="auth-input-group">
//                         <label className="auth-input-label">Email or mobile phone number</label>
//                         <input
//                             type="text"
//                             className="auth-text-field"
//                             value={emailOrPhone}
//                             onChange={(e) => setEmailOrPhone(e.target.value)}
//                             placeholder="Enter email or mobile number"
//                             required
//                         />
//                     </div>

//                     {/* Continue Button */}
//                     <button
//                         type="submit"
//                         className="auth-submit-yellow-btn"
//                         disabled={loading}
//                         style={{ marginBottom: "15px" }}
//                     >
//                         {loading ? "Sending..." : "Continue"}
//                     </button>

//                 </form>

//                 {/* OR Divider */}
//                 <div className="auth-or-divider" style={{
//                     display: "flex",
//                     alignItems: "center",
//                     textAlign: "center",
//                     margin: "15px 0",
//                     color: "#767676",
//                     fontSize: "0.75rem"
//                 }}>
//                     <hr style={{ flex: 1, border: "none", borderTop: "1px solid #e7e7e7" }} />
//                     <span style={{ padding: "0 10px" }}>or</span>
//                     <hr style={{ flex: 1, border: "none", borderTop: "1px solid #e7e7e7" }} />
//                 </div>

//                 {/* Get OTP on Phone Button */}
//                 <button
//                     type="button"
//                     onClick={handleGetOTP}
//                     className="auth-otp-btn"
//                     style={{
//                         width: "100%",
//                         padding: "8px 12px",
//                         backgroundColor: "white",
//                         border: "1px solid #d5d9d9",
//                         borderRadius: "8px",
//                         fontSize: "0.85rem",
//                         fontWeight: "600",
//                         color: "#0f1111",
//                         cursor: "pointer",
//                         transition: "all 0.2s ease"
//                     }}
//                     onMouseEnter={(e) => {
//                         e.target.style.backgroundColor = "#f7fafa";
//                         e.target.style.borderColor = "#a2a6ab";
//                     }}
//                     onMouseLeave={(e) => {
//                         e.target.style.backgroundColor = "white";
//                         e.target.style.borderColor = "#d5d9d9";
//                     }}
//                 >
//                     Get an OTP on your phone
//                 </button>

//                 {/* Back to Sign In Link */}
//                 <div className="auth-back-to-login" style={{ marginTop: "20px", textAlign: "center" }}>
//                     <Link to="/login" className="link-style" style={{ color: "#0066c0", fontSize: "0.85rem" }}>
//                         ← Back to Sign in
//                     </Link>
//                 </div>

//             </div>

//             {/* Footer */}
//             <div className="auth-page-mini-footer">
//                 <div className="mini-footer-links">
//                     <a href="#conditions">Conditions of Use</a>
//                     <a href="#privacy">Privacy Notice</a>
//                     <a href="#help">Help</a>
//                 </div>
//                 <p className="mini-footer-copyright-txt">
//                     &copy; 2026, Azora.com, Inc. or its affiliates
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!emailOrPhone.trim()) {
            setError("Enter your email address or mobile phone number");
            return;
        }

        setLoading(true);

        try {
            // Simulation for now
            setTimeout(() => {
                setLoading(false);
                // ✅ Continue click karne par Verification Code page par jayega
                navigate("/verify-code", { state: { emailOrPhone } });
            }, 500);
        } catch (err) {
            setError("Account not found with this email or phone number");
            setLoading(false);
        }
    };

    return (
        <div className="azora-auth-page-wrapper">
            {/* Logo */}
            <div className="auth-logo-center">
                <span className="auth-brand-name">
                    Azora<span className="auth-logo-dot">.</span>
                </span>
            </div>

            {/* Forgot Password Card */}
            <div className="auth-card-box">
                <h1 className="auth-card-title">Password assistance</h1>

                <p className="auth-help-text" style={{
                    fontSize: "0.85rem",
                    marginBottom: "20px",
                    color: "#555",
                    lineHeight: "1.4"
                }}>
                    Enter the email address or mobile phone number associated with your Azora account.
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

                {/* Success Message */}
                {success && (
                    <div className="amazon-alert-success" style={{
                        backgroundColor: "#f0fdf4",
                        color: "#16a34a",
                        border: "1px solid #bbf7d0",
                        padding: "10px",
                        borderRadius: "4px",
                        fontSize: "0.82rem",
                        marginBottom: "15px"
                    }}>
                        ✅ Password reset link has been sent to your email. Please check your inbox.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-main-form">

                    {/* Email or Phone Input */}
                    <div className="auth-input-group">
                        <label className="auth-input-label">Email or mobile phone number</label>
                        <input
                            type="text"
                            className="auth-text-field"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            placeholder="Enter email or mobile number"
                            required
                        />
                    </div>

                    {/* Continue Button */}
                    <button
                        type="submit"
                        className="auth-submit-yellow-btn"
                        disabled={loading}
                        style={{ marginBottom: "15px" }}
                    >
                        {loading ? "Sending..." : "Continue"}
                    </button>

                </form>

                {/* Back to Sign In Link */}
                <div className="auth-back-to-login" style={{ marginTop: "20px", textAlign: "center" }}>
                    <Link to="/login" className="link-style" style={{ color: "#0066c0", fontSize: "0.85rem" }}>
                        ← Back to Sign in
                    </Link>
                </div>

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

export default ForgotPassword;