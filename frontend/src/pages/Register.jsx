import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaCaretDown, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
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
            alert("Registration successfully!");
            setError("");
            // 🌟 FIX: Step 3 remove kiya, direct home page par redirect with success alert
            // Pehle success alert dikhega, phir home page par chala jayega
            setTimeout(() => {
                navigate("/");
            }, 100); // 0.1 second me redirect
        } else {
            alert("Registration failed! Incorrect OTP code.");
            setError("Verification failed. The security code you entered does not match our records. Please try again.");
        }
    };

    return (
        <div className="amazon-register-page-container cust-reg-isolated-page">
            <div className="amazon-register-content-wrapper">

                <div className="amazon-auth-logo" onClick={() => navigate("/")}>
                    azora
                </div>

                {step === 1 && (
                    <div className="amazon-auth-card animate-fade cust-card-box-unique">
                        <h1>Create account</h1>

                        {error && <div className="amazon-alert-danger">⚠️ {error}</div>}

                        <form onSubmit={handleFormSubmit} className="amazon-pure-form">

                            <div className="amazon-pure-group">
                                <label>Enter mobile number or email</label>
                                <div className="amazon-input-row-layout">

                                    {inputType === "phone" && (
                                        <div className="amazon-country-select-box" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                            <span>{selectedCountry.code} {selectedCountry.prefix}</span>
                                            <FaCaretDown className="caret-down-icon" />

                                            {isDropdownOpen && (
                                                <div className="amazon-country-dropdown-list">
                                                    {countries.map((c) => (
                                                        <div
                                                            key={c.code}
                                                            className="dropdown-item-row"
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
                                        name="contactValue"
                                        value={formData.contactValue}
                                        onChange={handleContactChange}
                                        placeholder="Mobile number or email"
                                        className="amazon-main-txt-input cust-input-field-unique"
                                    />
                                </div>
                            </div>

                            <div className="amazon-pure-group">
                                <label>Your name</label>
                                <input
                                    type="text"
                                    placeholder="First and last name"
                                    value={formData.name}
                                    className="cust-input-field-unique"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* PASSWORD FIELD WITH EYE ICON */}
                            <div className="amazon-pure-group">
                                <label>Password (at least 6 characters)</label>
                                <div className="password-input-wrapper" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="At least 6 characters"
                                        value={formData.password}
                                        className="cust-input-field-unique"
                                        style={{ flex: 1, paddingRight: "40px" }}
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
                                <span className="amazon-hint-text">⚠️ Passwords must be at least 6 characters.</span>
                            </div>

                            {/* RE-PASSWORD FIELD WITH EYE ICON */}
                            <div className="amazon-pure-group">
                                <label>Re-enter password</label>
                                <div className="password-input-wrapper" style={{ position: "relative", display: "flex", alignItems: "center" }}>
                                    <input
                                        type={showRePassword ? "text" : "password"}
                                        value={formData.rePassword}
                                        className="cust-input-field-unique"
                                        style={{ flex: 1, paddingRight: "40px" }}
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

                            <button type="submit" className="amazon-gold-action-btn cust-btn-gold-unique">Continue</button>
                        </form>

                        <div className="amazon-legal-notice-txt">
                            By creating an account, you agree to Azora's <span className="link-style">Conditions of Use</span> and <span className="link-style">Privacy Notice</span>.
                        </div>

                        <div className="amazon-divider-thin"></div>

                        <div className="amazon-switch-auth-row">
                            Already a customer? <Link to="/login" className="link-style">Sign in instead</Link>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="amazon-auth-card animate-fade cust-card-box-unique">
                        <h1>{inputType === "email" ? "Verify email address" : "Verify mobile number"}</h1>

                        <div className="amazon-alert-success" style={{
                            backgroundColor: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0",
                            padding: "10px", borderRadius: "4px", fontSize: "0.82rem", fontWeight: "bold", marginBottom: "15px"
                        }}>
                            📢 {otpMessage}
                        </div>

                        <p className="amazon-otp-sub-p">
                            To verify your identity, we've sent a One Time Password (OTP) to the gateway node.
                            <span className="link-style" style={{ marginLeft: "5px", fontSize: "12px", cursor: "pointer" }} onClick={() => setStep(1)}>(Change)</span>
                        </p>

                        {error && <div className="amazon-alert-danger">⚠️ {error}</div>}

                        <form onSubmit={handleVerifyOtp} className="amazon-pure-form">
                            <div className="amazon-pure-group">
                                <label>Enter security code</label>
                                <input
                                    type="text"
                                    placeholder="Enter 6-Digit OTP"
                                    maxLength="6"
                                    className="cust-input-field-unique"
                                    value={otpInput}
                                    onChange={(e) => { setOtpInput(e.target.value); }}
                                    required
                                />
                            </div>

                            <button type="submit" className="amazon-gold-action-btn cust-btn-gold-unique">Create your Azora account</button>
                        </form>

                        <div className="amazon-otp-resend-link" style={{ cursor: "pointer" }} onClick={() => { sendOtpSimulation(); alert("New fresh dynamic OTP code generated!"); }}>
                            Resend code
                        </div>

                        {inputType === "phone" && (
                            <div className="amazon-whatsapp-zone">
                                <div className="or-line-separator"><span>or</span></div>
                                <button className="amazon-whatsapp-btn" type="button" onClick={() => alert("Verification request triggered on WhatsApp pipeline!")}>
                                    Send code to WhatsApp
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* 🌟 STEP 3 COMPLETELY REMOVED - Ab success page nahi dikhega */}

            </div>
        </div>
    );
};

export default Register;