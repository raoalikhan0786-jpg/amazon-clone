// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaCheckCircle, FaShoppingBag, FaCaretDown } from "react-icons/fa";

// const Register = () => {
//     const navigate = useNavigate();

//     // स्टेट्स
//     const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [selectedCountry, setSelectedCountry] = useState({ code: "IN", prefix: "+91" });
//     const [inputType, setInputType] = useState("email"); // email या phone

//     const [formData, setFormData] = useState({
//         contactValue: "", // मोबाइल नंबर या ईमेल
//         name: "",
//         password: "",
//         rePassword: ""
//     });

//     const [otpInput, setOtpInput] = useState("");
//     const [error, setError] = useState("");

//     // कंट्री लिस्ट डमी डेटा
//     const countries = [
//         { code: "HN", prefix: "+504", name: "Honduras" },
//         { code: "HK", prefix: "+852", name: "Hong Kong" },
//         { code: "HU", prefix: "+36", name: "Hungary" },
//         { code: "IS", prefix: "+354", name: "Iceland" },
//         { code: "IN", prefix: "+91", name: "India" },
//         { code: "ID", prefix: "+62", name: "Indonesia" },
//         { code: "IR", prefix: "+98", name: "Iran" },
//         { code: "IQ", prefix: "+964", name: "Iraq" },
//         { code: "IE", prefix: "+353", name: "Ireland" }
//     ];

//     // इनपुट हैंडलर और डायनामिक ईमेल/फोन डिटेक्शन
//     const handleContactChange = (e) => {
//         const val = e.target.value;
//         setFormData({ ...formData, contactValue: val });
//         setError("");

//         if (/[a-zA-Z@]/.test(val)) {
//             setInputType("email");
//         } else if (/^\d*$/.test(val.replace(/\+/g, ""))) {
//             setInputType("phone");
//         }
//     };

//     const handleFormSubmit = (e) => {
//         e.preventDefault();

//         if (!formData.contactValue.trim()) {
//             setError("Enter your mobile number or email");
//             return;
//         }
//         if (!formData.name.trim()) {
//             setError("Enter your name");
//             return;
//         }
//         if (formData.password.length < 6) {
//             setError("Passwords must be at least 6 characters.");
//             return;
//         }
//         if (formData.password !== formData.rePassword) {
//             setError("Passwords do not match.");
//             return;
//         }

//         alert(`Verification code simulated! (Use Dummy Code: 123456)`);
//         setStep(2);
//     };

//     const handleVerifyOtp = (e) => {
//         e.preventDefault();
//         if (otpInput === "123456") {
//             setStep(3);
//         } else {
//             setError("Invalid verification code. Please try again.");
//         }
//     };

//     return (
//         /* 🌟 फिक्स: यूनिक क्लास 'cust-reg-isolated-page' का इस्तेमाल किया ताकि सेलर से मैच न हो */
//         <div className="amazon-register-page-container cust-reg-isolated-page">
//             <div className="amazon-register-content-wrapper">

//                 {/* अज़ोरा ब्रांड लोगो */}
//                 <div className="amazon-auth-logo" onClick={() => navigate("/")}>
//                     azora
//                 </div>

//                 {/* 🌟 स्टेप 1: क्रिएट अकाउंट फॉर्म */}
//                 {step === 1 && (
//                     <div className="amazon-auth-card animate-fade cust-card-box-unique">
//                         <h1>Create account</h1>

//                         {error && <div className="amazon-alert-danger">⚠️ {error}</div>}

//                         <form onSubmit={handleFormSubmit} className="amazon-pure-form">

//                             {/* 1. मोबाइल नंबर या ईमेल इनपुट */}
//                             <div className="amazon-pure-group">
//                                 <label>Enter mobile number or email</label>
//                                 <div className="amazon-input-row-layout">

//                                     {inputType === "phone" && (
//                                         <div className="amazon-country-select-box" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
//                                             <span>{selectedCountry.code} {selectedCountry.prefix}</span>
//                                             <FaCaretDown className="caret-down-icon" />

//                                             {isDropdownOpen && (
//                                                 <div className="amazon-country-dropdown-list">
//                                                     {countries.map((c) => (
//                                                         <div
//                                                             key={c.code}
//                                                             className="dropdown-item-row"
//                                                             onClick={() => setSelectedCountry({ code: c.code, prefix: c.prefix })}
//                                                         >
//                                                             {c.name} {c.prefix}
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}

//                                     <input
//                                         type="text"
//                                         name="contactValue"
//                                         value={formData.contactValue}
//                                         onChange={handleContactChange}
//                                         placeholder="Mobile number or email"
//                                         className="amazon-main-txt-input cust-input-field-unique"
//                                     />
//                                 </div>
//                             </div>

//                             {/* 2. यूजर का नाम */}
//                             <div className="amazon-pure-group">
//                                 <label>Your name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="First and last name"
//                                     value={formData.name}
//                                     className="cust-input-field-unique"
//                                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                                 />
//                             </div>

//                             {/* 3. पासवर्ड */}
//                             <div className="amazon-pure-group">
//                                 <label>Password (at least 6 characters)</label>
//                                 <input
//                                     type="password"
//                                     placeholder="At least 6 characters"
//                                     value={formData.password}
//                                     className="cust-input-field-unique"
//                                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                                 />
//                                 <span className="amazon-hint-text">⚠️ Passwords must be at least 6 characters.</span>
//                             </div>

//                             {/* 4. दोबारा पासवर्ड दर्ज करें */}
//                             <div className="amazon-pure-group">
//                                 <label>Re-enter password</label>
//                                 <input
//                                     type="password"
//                                     value={formData.rePassword}
//                                     className="cust-input-field-unique"
//                                     onChange={(e) => setFormData({ ...formData, rePassword: e.target.value })}
//                                 />
//                             </div>

//                             {/* 🌟 यूनिक बटन क्लास */}
//                             <button type="submit" className="amazon-gold-action-btn cust-btn-gold-unique">Continue</button>
//                         </form>

//                         <div className="amazon-legal-notice-txt">
//                             By creating an account, you agree to Azora's <span className="link-style">Conditions of Use</span> and <span className="link-style">Privacy Notice</span>.
//                         </div>

//                         <div className="amazon-divider-thin"></div>

//                         <div className="amazon-switch-auth-row">
//                             Already a customer? <Link to="/login" className="link-style">Sign in instead</Link>
//                         </div>
//                     </div>
//                 )}

//                 {/* 🌟 स्टेप 2: डायनामिक ओटीपी स्क्रीन */}
//                 {step === 2 && (
//                     <div className="amazon-auth-card animate-fade cust-card-box-unique">
//                         <h1>{inputType === "email" ? "Verify email address" : "Verify mobile number"}</h1>

//                         <p className="amazon-otp-sub-p">
//                             To verify your {inputType === "email" ? "email" : "mobile number"}, we've sent a One Time Password (OTP) to {" "}
//                             <strong>{inputType === "phone" ? selectedCountry.prefix : ""} {formData.contactValue}</strong>
//                             <span className="link-style" style={{ marginLeft: "5px", fontSize: "12px", cursor: "pointer" }} onClick={() => setStep(1)}>(Change)</span>
//                         </p>

//                         {error && <div className="amazon-alert-danger">⚠️ {error}</div>}

//                         <form onSubmit={handleVerifyOtp} className="amazon-pure-form">
//                             <div className="amazon-pure-group">
//                                 <label>Enter security code</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter OTP"
//                                     maxLength="6"
//                                     className="cust-input-field-unique"
//                                     value={otpInput}
//                                     onChange={(e) => { setOtpInput(e.target.value); setError(""); }}
//                                     required
//                                 />
//                             </div>

//                             <button type="submit" className="amazon-gold-action-btn cust-btn-gold-unique">Create your Azora account</button>
//                         </form>

//                         <div className="amazon-otp-resend-link" style={{ cursor: "pointer" }} onClick={() => alert("OTP Resent! Code is 123456")}>
//                             Resend code
//                         </div>

//                         {inputType === "phone" && (
//                             <div className="amazon-whatsapp-zone">
//                                 <div className="or-line-separator"><span>or</span></div>
//                                 <button className="amazon-whatsapp-btn" type="button" onClick={() => alert("OTP code requested on WhatsApp!")}>
//                                     Send code to WhatsApp
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {/* 🌟 स्टेप 3: सक्सेसफुल बैनर */}
//                 {step === 3 && (
//                     <div className="amazon-success-box animate-fade cust-success-banner-unique">
//                         <div className="success-header-row">
//                             <FaCheckCircle className="green-check-icon" />
//                             <h2>Your account has been successfully created. Shop now!</h2>
//                         </div>
//                         <p>Welcome to the family, <strong>{formData.name}</strong>. Your marketplace profile is completely live.</p>
//                         <button className="amazon-start-shopping-btn" onClick={() => navigate("/")}>
//                             <FaShoppingBag /> Let's Go Shopping
//                         </button>
//                     </div>
//                 )}

//             </div>
//         </div>
//     );
// };

// export default Register;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaShoppingBag, FaCaretDown } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();

    // स्टेट्स
    const [step, setStep] = useState(1); // 1: Form, 2: OTP, 3: Success
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({ code: "IN", prefix: "+91" });
    const [inputType, setInputType] = useState("email"); // email या phone

    const [formData, setFormData] = useState({
        contactValue: "", // मोबाइल नंबर या ईमेल
        name: "",
        password: "",
        rePassword: ""
    });

    const [otpInput, setOtpInput] = useState("");
    const [systemGeneratedOtp, setSystemGeneratedOtp] = useState(""); // 🌟 असली रैंडम ओटीपी स्टोर करने के लिए
    const [otpMessage, setOtpMessage] = useState(""); // 🌟 स्क्रीन पर डायनामिक मैसेज दिखाने के लिए
    const [error, setError] = useState("");

    // कंट्री लिस्ट डमी डेटा
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

    // इनपुट हैंडलर और डायनामिक ईमेल/फोन डिटेक्शन
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

    // 🌟 जादुई फंक्शन: रैंडम 6-डिजिट ओटीपी जेनरेट करने और भेजने के लिए
    const sendOtpSimulation = () => {
        // 6 डिजिट का रैंडम नंबर जनरेट किया
        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSystemGeneratedOtp(randomOtp);

        // आपकी कंडीशन: अगर फोन है तो फोन का मैसेज, ईमेल है तो ईमेल का मैसेज
        if (inputType === "phone") {
            setOtpMessage(`OTP sent on your phone number: ${selectedCountry.prefix} ${formData.contactValue}`);
            alert(`[SMS Gateway Simulate] OTP sent on your phone number! Your Verification Code is: ${randomOtp}`);
        } else {
            setOtpMessage(`OTP sent on your gmail: ${formData.contactValue}`);
            alert(`[Email Server Simulate] OTP sent on your gmail! Your Verification Code is: ${randomOtp}`);
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

        // 🌟 फॉर्म सबमिट होते ही डायनामिक ओटीपी ट्रिगर करें
        sendOtpSimulation();
        setStep(2);
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        
        // 🌟 आपकी कंडीशन: सही ओटीपी डालने पर सक्सेस, गलत पर फेल्ड एरर
        if (otpInput === systemGeneratedOtp) {
            alert("Registration successfully!");
            setError("");
            setStep(3); // सक्सेस स्क्रीन पर भेजें
        } else {
            alert("Registration failed! Incorrect OTP code.");
            setError("Verification failed. The security code you entered does not match our records. Please try again.");
        }
    };

    return (
        <div className="amazon-register-page-container cust-reg-isolated-page">
            <div className="amazon-register-content-wrapper">

                {/* अज़ोरा ब्रांड लोगो */}
                <div className="amazon-auth-logo" onClick={() => navigate("/")}>
                    azora
                </div>

                {/* 🌟 स्टेप 1: क्रिएट अकाउंट फॉर्म */}
                {step === 1 && (
                    <div className="amazon-auth-card animate-fade cust-card-box-unique">
                        <h1>Create account</h1>

                        {error && <div className="amazon-alert-danger">⚠️ {error}</div>}

                        <form onSubmit={handleFormSubmit} className="amazon-pure-form">

                            {/* 1. मोबाइल नंबर या ईमेल इनपुट */}
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

                            {/* 2. यूजर का नाम */}
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

                            {/* 3. पासवर्ड */}
                            <div className="amazon-pure-group">
                                <label>Password (at least 6 characters)</label>
                                <input
                                    type="password"
                                    placeholder="At least 6 characters"
                                    value={formData.password}
                                    className="cust-input-field-unique"
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <span className="amazon-hint-text">⚠️ Passwords must be at least 6 characters.</span>
                            </div>

                            {/* 4. दोबारा पासवर्ड दर्ज करें */}
                            <div className="amazon-pure-group">
                                <label>Re-enter password</label>
                                <input
                                    type="password"
                                    value={formData.rePassword}
                                    className="cust-input-field-unique"
                                    onChange={(e) => setFormData({ ...formData, rePassword: e.target.value })}
                                />
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

                {/* 🌟 स्टेप 2: डायनामिक ओटीपी स्क्रीन (आपकी कंडीशंस के साथ फुल्ली अपग्रेडेड) */}
                {step === 2 && (
                    <div className="amazon-auth-card animate-fade cust-card-box-unique">
                        <h1>{inputType === "email" ? "Verify email address" : "Verify mobile number"}</h1>

                        {/* 🌟 यहाँ दिखेगा कड़क लाइव डायनामिक अलर्ट संदेश */}
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

                {/* 🌟 स्टेप 3: सक्सेसफुल बैनर */}
                {step === 3 && (
                    <div className="amazon-success-box animate-fade cust-success-banner-unique">
                        <div className="success-header-row">
                            <FaCheckCircle className="green-check-icon" />
                            <h2>Your account has been successfully created. Shop now!</h2>
                        </div>
                        <p>Welcome to the family, <strong>{formData.name}</strong>. Your marketplace profile is completely live.</p>
                        <button className="amazon-start-shopping-btn" onClick={() => navigate("/")}>
                            <FaShoppingBag /> Let's Go Shopping
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Register;