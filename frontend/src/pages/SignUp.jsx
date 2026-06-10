import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCaretDown, FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
    const navigate = useNavigate();

    // स्टेट्स
    const [step, setStep] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ code: "IN", prefix: "+91" });
    const [inputType, setInputType] = useState("email");

    // Password show/hide ke liye states
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const [formData, setFormData] = useState({
        contactValue: "",
        name: "",
        password: "",
        rePassword: ""
    });

    const [otpInput, setOtpInput] = useState("");
    const [systemGeneratedOtp, setSystemGeneratedOtp] = useState("");
    const [otpMessage, setOtpMessage] = useState("");
    const [error, setError] = useState("");

    const countries = [
        { code: "HN", prefix: "+504", name: "Honduras" },
        { code: "HK", prefix: "+852", name: "Hong Kong" },
        { code: "HU", prefix: "+36", name: "Hungary" },
        { code: "IS", prefix: "+354", name: "Iceland" },
        { code: "IN", prefix: "+91", name: "India" },
        { code: "ID", prefix: "+62", name: "Indonesia" },
        { code: "IR", prefix: "+98", name: "Iran" },
        { code: "IQ", prefix: "+964", name: "Iraq" },
        { code: "IE", prefix: "+353", name: "Ireland" }
    ];

    const handleContactChange = (e) => {
        const val = e.target.value;
        setFormData({ ...formData, contactValue: val });
        setError("");

        if (/[a-zA-Z@]/.test(val)) {
            setInputType("email");
        } else if (/^\d*$/.test(val.replace(/\+/g, ""))) {
            setInputType("phone");
        }
    };

    const sendOtpSimulation = () => {
        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSystemGeneratedOtp(randomOtp);

        if (inputType === "phone") {
            setOtpMessage(`OTP sent on your phone number: ${selectedCountry.prefix} ${formData.contactValue}`);
            alert(`[SMS Gateway Simulate] OTP sent! Your Verification Code is: ${randomOtp}`);
        } else {
            setOtpMessage(`OTP sent on your gmail: ${formData.contactValue}`);
            alert(`[Email Server Simulate] OTP sent! Your Verification Code is: ${randomOtp}`);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (!formData.contactValue.trim()) {
            setError("Enter your mobile number or email");
            return;
        }
        if (!formData.name.trim()) {
            setError("Enter your name");
            return;
        }
        if (formData.password.length < 6) {
            setError("Passwords must be at least 6 characters.");
            return;
        }
        if (formData.password !== formData.rePassword) {
            setError("Passwords do not match.");
            return;
        }

        sendOtpSimulation();
        setStep(2);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        
        if (otpInput === systemGeneratedOtp) {
            let emailValue = "";
            let phoneValue = "";
            
            if (inputType === "email") {
                emailValue = formData.contactValue;
                phoneValue = "N/A";
            } else {
                emailValue = "N/A";
                phoneValue = `${selectedCountry.prefix} ${formData.contactValue}`;
            }
            
            const customerData = {
                id: "CUST-" + Math.floor(Math.random() * 1000),
                name: formData.name,
                email: emailValue,
                phone: phoneValue,
                currentPassword: formData.password,
                joinedDate: new Date().toLocaleDateString(),
                shippingAddress: "",
                totalOrdersPlaced: 0,
                totalWalletSpent: "0",
                accountStatus: "Active",
                orders: [],
                returns: [],
                wishlist: []
            };
            
            const existingCustomers = JSON.parse(localStorage.getItem("customersList") || "[]");
            
            if (inputType === "email") {
                const emailExists = existingCustomers.some(c => c.email === emailValue);
                if (emailExists) {
                    alert("Email already registered!");
                    setError("Email already registered!");
                    return;
                }
            }
            
            existingCustomers.push(customerData);
            localStorage.setItem("customersList", JSON.stringify(existingCustomers));
            localStorage.setItem("currentCustomer", JSON.stringify(customerData));
            
            const today = new Date().toLocaleDateString();
            const todayNewCount = existingCustomers.filter(c => c.joinedDate === today).length;
            localStorage.setItem("simulated_new_customers", todayNewCount.toString());
            
            console.log("✅ Customer SignUp:", customerData);
            alert("Registration successful! 🎉");
            setError("");
            
            setTimeout(() => {
                navigate("/");
            }, 100);
        } else {
            alert("Registration failed! Incorrect OTP code.");
            setError("Verification failed. The security code you entered does not match our records. Please try again.");
        }
    };

    // 🔴 COMMON INPUT STYLE - SABHI FIELDS KE LIYE SAME
    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        fontSize: "14px",
        lineHeight: "1.5",
        border: "1px solid #ccc",
        borderRadius: "4px",
        outline: "none",
        transition: "border-color 0.2s",
        boxSizing: "border-box",
        height: "32px"  // ✅ FIXED HEIGHT - Sabhi fields same height
    };

    return (
        <div className="azora-auth-page-wrapper">

            {/* Logo */}
            <div className="auth-logo-center">
                <span className="auth-brand-name">
                    Azora<span className="auth-logo-dot">.</span>
                </span>
            </div>

            {step === 1 && (
                <>
                    <div className="auth-card-box">
                        <h1 className="auth-card-title">Create account</h1>

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

                        <form onSubmit={handleFormSubmit} className="auth-main-form">

                            {/* Enter mobile number or email - FIXED HEIGHT & LENGTH */}
                            <div className="auth-input-group">
                                <label className="auth-input-label">Enter mobile number or email</label>
                                <div style={{ display: "flex", gap: "0px", alignItems: "center" }}>
                                    {inputType === "phone" && (
                                        <div 
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "5px",
                                                padding: "0 10px",
                                                border: "1px solid #ccc",
                                                borderRight: "none",
                                                borderRadius: "4px 0 0 4px",
                                                cursor: "pointer",
                                                height: "42px",  // ✅ Same height as input
                                                backgroundColor: "#f9f9f9",
                                                fontSize: "14px"
                                            }}
                                        >
                                            <span>{selectedCountry.code} {selectedCountry.prefix}</span>
                                            <FaCaretDown className="caret-down-icon" />
                                            {isDropdownOpen && (
                                                <div className="amazon-country-dropdown-list" style={{
                                                    position: "absolute",
                                                    top: "100%",
                                                    left: 0,
                                                    background: "white",
                                                    border: "1px solid #ccc",
                                                    borderRadius: "4px",
                                                    zIndex: 1000,
                                                    maxHeight: "200px",
                                                    overflow: "auto"
                                                }}>
                                                    {countries.map((c) => (
                                                        <div
                                                            key={c.code}
                                                            style={{ padding: "5px 10px", cursor: "pointer" }}
                                                            onClick={() => setSelectedCountry({ code: c.code, prefix: c.prefix })}
                                                        >
                                                            {c.name} {c.prefix}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <input
                                        type="text"
                                        value={formData.contactValue}
                                        onChange={handleContactChange}
                                        placeholder="Mobile number or email"
                                        style={{
                                            ...inputStyle,
                                            borderRadius: inputType === "phone" ? "0 4px 4px 0" : "4px",
                                            flex: 1
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Your name */}
                            <div className="auth-input-group">
                                <label className="auth-input-label">Your name</label>
                                <input
                                    type="text"
                                    placeholder="First and last name"
                                    value={formData.name}
                                    style={inputStyle}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* Password Field */}
                            <div className="auth-input-group">
                                <label className="auth-input-label">Password (at least 6 characters)</label>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="At least 6 characters"
                                        value={formData.password}
                                        style={{ ...inputStyle, paddingRight: "40px" }}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                                <span className="amazon-hint-text" style={{ fontSize: "0.7rem", color: "#666", marginTop: "5px", display: "block" }}>
                                    ⚠️ Passwords must be at least 6 characters.
                                </span>
                            </div>

                            {/* Re-enter Password Field */}
                            <div className="auth-input-group">
                                <label className="auth-input-label">Re-enter password</label>
                                <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <input
                                        type={showRePassword ? "text" : "password"}
                                        value={formData.rePassword}
                                        style={{ ...inputStyle, paddingRight: "40px" }}
                                        onChange={(e) => setFormData({ ...formData, rePassword: e.target.value })}
                                    />
                                    <span
                                        onClick={() => setShowRePassword(!showRePassword)}
                                        style={{
                                            position: "absolute",
                                            right: "12px",
                                            cursor: "pointer",
                                            color: "#666",
                                            fontSize: "18px"
                                        }}
                                    >
                                        {showRePassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                            <button type="submit" className="auth-submit-yellow-btn">
                                Continue
                            </button>
                        </form>

                        <p className="auth-privacy-notice-text">
                            By creating an account, you agree to Azora's <a href="#conditions">Conditions of Use</a> and <a href="#privacy">Privacy Notice</a>.
                        </p>

                        <div className="auth-help-support-link">
                            <a href="#need-help">Need help?</a>
                        </div>
                    </div>

                    <div className="auth-SignUp-prompt-container">
                        <div className="prompt-divider-with-text">
                            <span>Already a customer?</span>
                        </div>
                        <Link to="/SignIn" className="auth-create-account-gray-btn">
                            Sign in instead
                        </Link>
                    </div>
                </>
            )}

            {step === 2 && (
                <div className="auth-card-box">
                    <h1 className="auth-card-title">{inputType === "email" ? "Verify email address" : "Verify mobile number"}</h1>

                    <div style={{
                        backgroundColor: "#f0fdf4",
                        color: "#16a34a",
                        border: "1px solid #bbf7d0",
                        padding: "10px",
                        borderRadius: "4px",
                        fontSize: "0.82rem",
                        fontWeight: "bold",
                        marginBottom: "15px"
                    }}>
                        📢 {otpMessage}
                    </div>

                    <p className="auth-privacy-notice-text">
                        To verify your identity, we've sent a One Time Password (OTP) to the gateway node.
                        <span style={{ marginLeft: "5px", fontSize: "12px", cursor: "pointer", color: "#0066c0" }} onClick={() => setStep(1)}>(Change)</span>
                    </p>

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

                    <form onSubmit={handleVerifyOtp} className="auth-main-form">
                        <div className="auth-input-group">
                            <label className="auth-input-label">Enter security code</label>
                            <input
                                type="text"
                                placeholder="Enter 6-Digit OTP"
                                maxLength="6"
                                style={inputStyle}
                                value={otpInput}
                                onChange={(e) => setOtpInput(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="auth-submit-yellow-btn">Create your Azora account</button>
                    </form>

                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <button
                            type="button"
                            onClick={() => { sendOtpSimulation(); alert("New fresh dynamic OTP code generated!"); }}
                            style={{
                                background: "none",
                                border: "none",
                                color: "#0066c0",
                                cursor: "pointer",
                                fontSize: "0.75rem"
                            }}
                        >
                            Resend code
                        </button>
                    </div>
                </div>
            )}

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

export default SignUp;