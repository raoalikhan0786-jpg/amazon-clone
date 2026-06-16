// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUpload, FaStore, FaLock, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

// const SellerRegister = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         ownerName: "",
//         storeName: "",
//         contactInput: "",
//         otpCode: "",
//         panNumber: "",
//         gstinNumber: "",
//         bankAccount: "",
//         ifscCode: ""
//     });

//     const [inputType, setInputType] = useState("email");
//     const [systemOtp, setSystemOtp] = useState("");
//     const [otpSent, setOtpSent] = useState(false);
//     const [isOtpVerified, setIsOtpVerified] = useState(false);
//     const [activeErrors, setActiveErrors] = useState({});

//     const handleContactChange = (e) => {
//         const val = e.target.value;
//         setFormData({ ...formData, contactInput: val });

//         if (activeErrors.contactInput) {
//             setActiveErrors({ ...activeErrors, contactInput: "" });
//         }

//         if (/[a-zA-Z@]/.test(val)) {
//             setInputType("email");
//         } else if (/^\d*$/.test(val.replace(/\+/g, ""))) {
//             setInputType("phone");
//         }
//     };

//     const triggerOtpValidation = () => {
//         if (!formData.contactInput.trim()) {
//             setActiveErrors({ ...activeErrors, contactInput: "Please enter a valid phone number or email first!" });
//             return;
//         }

//         const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
//         setSystemOtp(randomOtp);
//         setOtpSent(true);

//         if (inputType === "phone") {
//             alert(`[SMS Gateway] OTP sent on your phone number! Code is: ${randomOtp}`);
//         } else {
//             alert(`[Gmail Server] OTP sent on your gmail! Code is: ${randomOtp}`);
//         }
//     };

//     const verifyReceivedOtp = () => {
//         if (formData.otpCode === systemOtp && systemOtp !== "") {
//             setIsOtpVerified(true);
//             setActiveErrors({ ...activeErrors, otpCode: "" });
//             alert("Verification Successful! Contact node locked.");
//         } else {
//             setActiveErrors({ ...activeErrors, otpCode: "Incorrect security code. Verification failed!" });
//             alert("Verification Failed! Incorrect OTP.");
//         }
//     };

//     const handleFinalSubmit = (e) => {
//         e.preventDefault();
//         let errors = {};

//         if (!formData.ownerName.trim()) errors.ownerName = "Owner name is required.";
//         if (!formData.storeName.trim()) errors.storeName = "Store/Shop name is required.";
//         if (!formData.contactInput.trim()) errors.contactInput = "Contact details are required.";
//         if (!isOtpVerified) errors.otpCode = "Please complete phone/gmail OTP verification.";
//         if (formData.panNumber.length !== 10) errors.panNumber = "Invalid PAN Number format (Must be 10 characters).";
//         if (formData.gstinNumber.length !== 15) errors.gstinNumber = "Invalid GSTIN Number format (Must be 15 characters).";
//         if (!formData.bankAccount.trim()) errors.bankAccount = "Bank Account number is mandatory.";
//         if (formData.ifscCode.length < 5) errors.ifscCode = "Invalid Bank IFSC Code.";

//         if (Object.keys(errors).length > 0) {
//             setActiveErrors(errors);
//             alert("Registration Failed! Please fix the highlighted fields on the screen.");
//             return;
//         }

//         alert("Seller Basic Info Saved! Now please upload your documents.");

//         // ✅ FIXED: Email aur Phone alag alag save honge (inputType ke hisaab se)
//         const finalSellerData = {
//             ownerName: formData.ownerName,
//             storeName: formData.storeName,
//             email: inputType === "email" ? formData.contactInput : "N/A",
//             phone: inputType === "phone" ? formData.contactInput : "N/A",
//             contactInput: formData.contactInput,
//             otpCode: formData.otpCode,
//             panNumber: formData.panNumber,
//             gstinNumber: formData.gstinNumber,
//             bankAccount: formData.bankAccount,
//             ifscCode: formData.ifscCode
//         };

//         sessionStorage.setItem("sellerBasicInfo", JSON.stringify(finalSellerData));
//         localStorage.setItem("sellerBasicInfo", JSON.stringify(finalSellerData));

//         console.log("✅ Seller basic info saved:", finalSellerData);

//         navigate("/seller/document-upload");
//     };

//     return (
//         <div className="azora-auth-page-wrapper" style={{ padding: "30px 10px" }}>
//             <div className="auth-card-box" style={{ width: "100%", maxWidth: "650px", border: "1px solid #ccc" }}>

//                 <h2 className="auth-card-title" style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "20px" }}>
//                     🏢 Open Your Azora Merchant Account
//                 </h2>

//                 <form onSubmit={handleFinalSubmit} className="amazon-pure-form">

//                     <div className="auth-input-group">
//                         <label className="auth-input-label">1. Owner Full Name</label>
//                         <input
//                             type="text"
//                             className="auth-text-field"
//                             placeholder="Enter owner full name"
//                             style={{ borderColor: activeErrors.ownerName ? "#dc2626" : "#a6a6a6", background: activeErrors.ownerName ? "#fef2f2" : "#fff" }}
//                             value={formData.ownerName}
//                             onChange={(e) => { setFormData({ ...formData, ownerName: e.target.value }); setActiveErrors({ ...activeErrors, ownerName: "" }); }}
//                         />
//                         {activeErrors.ownerName && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.ownerName}</span>}
//                     </div>

//                     <div className="auth-input-group">
//                         <label className="auth-input-label">2. Store / Shop Name</label>
//                         <input
//                             type="text"
//                             className="auth-text-field"
//                             placeholder="Enter store/shop name"
//                             style={{ borderColor: activeErrors.storeName ? "#dc2626" : "#a6a6a6", background: activeErrors.storeName ? "#fef2f2" : "#fff" }}
//                             value={formData.storeName}
//                             onChange={(e) => { setFormData({ ...formData, storeName: e.target.value }); setActiveErrors({ ...activeErrors, storeName: "" }); }}
//                         />
//                         {activeErrors.storeName && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.storeName}</span>}
//                     </div>

//                     <div className="auth-input-group">
//                         <label className="auth-input-label">3. Enter Mobile Number or Gmail</label>
//                         <div style={{ display: "flex", gap: "10px" }}>
//                             <input
//                                 type="text"
//                                 className="auth-text-field"
//                                 placeholder="Email address or phone"
//                                 disabled={isOtpVerified}
//                                 style={{ flexGrow: 1, borderColor: activeErrors.contactInput ? "#dc2626" : "#a6a6a6", background: activeErrors.contactInput ? "#fef2f2" : "#fff" }}
//                                 value={formData.contactInput}
//                                 onChange={handleContactChange}
//                             />
//                             <button
//                                 type="button"
//                                 disabled={isOtpVerified}
//                                 onClick={triggerOtpValidation}
//                                 style={{ padding: "0 15px", background: isOtpVerified ? "#16a34a" : "#0f172a", color: "white", border: "none", borderRadius: "3px", fontSize: "0.8rem", fontWeight: "bold", cursor: "pointer" }}
//                             >
//                                 {isOtpVerified ? "✓ Verified" : "Get OTP"}
//                             </button>
//                         </div>
//                         {activeErrors.contactInput && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.contactInput}</span>}
//                     </div>

//                     {otpSent && (
//                         <div className="auth-input-group animate-fade" style={{ background: "#f8fafc", padding: "12px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
//                             <label className="auth-input-label" style={{ color: "#0f172a" }}>🔒 Enter Received Security Code</label>
//                             <div style={{ display: "flex", gap: "10px" }}>
//                                 <input
//                                     type="text"
//                                     className="auth-text-field"
//                                     placeholder="Enter 6-digit code"
//                                     maxLength="6"
//                                     disabled={isOtpVerified}
//                                     style={{ flexGrow: 1, borderColor: activeErrors.otpCode ? "#dc2626" : "#a6a6a6" }}
//                                     value={formData.otpCode}
//                                     onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
//                                 />
//                                 <button
//                                     type="button"
//                                     disabled={isOtpVerified}
//                                     onClick={verifyReceivedOtp}
//                                     style={{ padding: "0 15px", background: "#10b981", color: "white", border: "none", borderRadius: "3px", fontSize: "0.8rem", fontWeight: "bold", cursor: "pointer" }}
//                                 >
//                                     Verify Code
//                                 </button>
//                             </div>
//                             {activeErrors.otpCode && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.otpCode}</span>}
//                         </div>
//                     )}

//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
//                         <div className="auth-input-group">
//                             <label className="auth-input-label">4. PAN Card Number</label>
//                             <input
//                                 type="text"
//                                 maxLength="10"
//                                 className="auth-text-field"
//                                 placeholder="ABCDE1234F"
//                                 style={{ borderColor: activeErrors.panNumber ? "#dc2626" : "#a6a6a6", background: activeErrors.panNumber ? "#fef2f2" : "#fff" }}
//                                 value={formData.panNumber}
//                                 onChange={(e) => { setFormData({ ...formData, panNumber: e.target.value.toUpperCase() }); setActiveErrors({ ...activeErrors, panNumber: "" }); }}
//                             />
//                             {activeErrors.panNumber && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.panNumber}</span>}
//                         </div>

//                         <div className="auth-input-group">
//                             <label className="auth-input-label">5. GSTIN Number</label>
//                             <input
//                                 type="text"
//                                 maxLength="15"
//                                 className="auth-text-field"
//                                 placeholder="22AAAAA0000A1Z"
//                                 style={{ borderColor: activeErrors.gstinNumber ? "#dc2626" : "#a6a6a6", background: activeErrors.gstinNumber ? "#fef2f2" : "#fff" }}
//                                 value={formData.gstinNumber}
//                                 onChange={(e) => { setFormData({ ...formData, gstinNumber: e.target.value.toUpperCase() }); setActiveErrors({ ...activeErrors, gstinNumber: "" }); }}
//                             />
//                             {activeErrors.gstinNumber && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.gstinNumber}</span>}
//                         </div>
//                     </div>

//                     <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
//                         <div className="auth-input-group">
//                             <label className="auth-input-label">6. Bank Account Number</label>
//                             <input
//                                 type="text"
//                                 className="auth-text-field"
//                                 placeholder="123456789012345"
//                                 style={{ borderColor: activeErrors.bankAccount ? "#dc2626" : "#a6a6a6", background: activeErrors.bankAccount ? "#fef2f2" : "#fff" }}
//                                 value={formData.bankAccount}
//                                 onChange={(e) => { setFormData({ ...formData, bankAccount: e.target.value }); setActiveErrors({ ...activeErrors, bankAccount: "" }); }}
//                             />
//                             {activeErrors.bankAccount && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.bankAccount}</span>}
//                         </div>

//                         <div className="auth-input-group">
//                             <label className="auth-input-label">7. Bank IFSC Code</label>
//                             <input
//                                 type="text"
//                                 className="auth-text-field"
//                                 placeholder="SBIN0001234"
//                                 style={{ borderColor: activeErrors.ifscCode ? "#dc2626" : "#a6a6a6", background: activeErrors.ifscCode ? "#fef2f2" : "#fff" }}
//                                 value={formData.ifscCode}
//                                 onChange={(e) => { setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() }); setActiveErrors({ ...activeErrors, ifscCode: "" }); }}
//                             />
//                             {activeErrors.ifscCode && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.ifscCode}</span>}
//                         </div>
//                     </div>

//                     <button type="submit" className="auth-submit-yellow-btn" style={{ height: "40px", fontSize: "1rem", marginTop: "15px" }}>
//                         Continue & Register As Seller
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SellerRegister;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaStore, FaLock, FaCheckCircle, FaExclamationCircle, FaBuilding, FaMapMarkerAlt, FaRegBuilding } from "react-icons/fa";

const SellerRegister = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ownerName: "",
        storeName: "",
        contactInput: "",
        otpCode: "",
        panNumber: "",
        gstinNumber: "",
        bankAccount: "",
        ifscCode: "",
        
        // ========== 🆕 NEW FIELDS FOR INVOICE SYSTEM (ADDED, NOTHING DELETED) ==========
        businessName: "",
        businessAddress: "",
        registeredOffice: "",
        cinNumber: "",
        businessPhone: "",
        businessEmail: "",
        bankAccountHolderName: "",
        bankName: "",
        upiId: ""
    });

    const [inputType, setInputType] = useState("email");
    const [systemOtp, setSystemOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [activeErrors, setActiveErrors] = useState({});

    // ========== 🆕 NEW STATE FOR TOGGLING BUSINESS DETAILS SECTION ==========
    const [showBusinessDetails, setShowBusinessDetails] = useState(false);

    const handleContactChange = (e) => {
        const val = e.target.value;
        setFormData({ ...formData, contactInput: val });

        if (activeErrors.contactInput) {
            setActiveErrors({ ...activeErrors, contactInput: "" });
        }

        if (/[a-zA-Z@]/.test(val)) {
            setInputType("email");
        } else if (/^\d*$/.test(val.replace(/\+/g, ""))) {
            setInputType("phone");
        }
    };

    const triggerOtpValidation = () => {
        if (!formData.contactInput.trim()) {
            setActiveErrors({ ...activeErrors, contactInput: "Please enter a valid phone number or email first!" });
            return;
        }

        const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSystemOtp(randomOtp);
        setOtpSent(true);

        if (inputType === "phone") {
            alert(`[SMS Gateway] OTP sent on your phone number! Code is: ${randomOtp}`);
        } else {
            alert(`[Gmail Server] OTP sent on your gmail! Code is: ${randomOtp}`);
        }
    };

    const verifyReceivedOtp = () => {
        if (formData.otpCode === systemOtp && systemOtp !== "") {
            setIsOtpVerified(true);
            setActiveErrors({ ...activeErrors, otpCode: "" });
            alert("Verification Successful! Contact node locked.");
        } else {
            setActiveErrors({ ...activeErrors, otpCode: "Incorrect security code. Verification failed!" });
            alert("Verification Failed! Incorrect OTP.");
        }
    };

    const handleFinalSubmit = (e) => {
        e.preventDefault();
        let errors = {};

        if (!formData.ownerName.trim()) errors.ownerName = "Owner name is required.";
        if (!formData.storeName.trim()) errors.storeName = "Store/Shop name is required.";
        if (!formData.contactInput.trim()) errors.contactInput = "Contact details are required.";
        if (!isOtpVerified) errors.otpCode = "Please complete phone/gmail OTP verification.";
        if (formData.panNumber.length !== 10) errors.panNumber = "Invalid PAN Number format (Must be 10 characters).";
        if (formData.gstinNumber.length !== 15) errors.gstinNumber = "Invalid GSTIN Number format (Must be 15 characters).";
        if (!formData.bankAccount.trim()) errors.bankAccount = "Bank Account number is mandatory.";
        if (formData.ifscCode.length < 5) errors.ifscCode = "Invalid Bank IFSC Code.";

        // ========== 🆕 NEW VALIDATIONS FOR BUSINESS DETAILS (Optional - Sirf agar showBusinessDetails true hai to) ==========
        if (showBusinessDetails) {
            if (!formData.businessName.trim()) errors.businessName = "Business name is required for invoice.";
            if (!formData.businessAddress.trim()) errors.businessAddress = "Business address is required for invoice.";
        }

        if (Object.keys(errors).length > 0) {
            setActiveErrors(errors);
            alert("Registration Failed! Please fix the highlighted fields on the screen.");
            return;
        }

        alert("Seller Basic Info Saved! Now please upload your documents.");

        // ✅ FIXED: Email aur Phone alag alag save honge (inputType ke hisaab se)
        const finalSellerData = {
            ownerName: formData.ownerName,
            storeName: formData.storeName,
            email: inputType === "email" ? formData.contactInput : "N/A",
            phone: inputType === "phone" ? formData.contactInput : "N/A",
            contactInput: formData.contactInput,
            otpCode: formData.otpCode,
            panNumber: formData.panNumber,
            gstinNumber: formData.gstinNumber,
            bankAccount: formData.bankAccount,
            ifscCode: formData.ifscCode,
            
            // ========== 🆕 NEW FIELDS FOR INVOICE ==========
            businessName: formData.businessName || formData.storeName, // Agar businessName nahi hai to storeName use hoga
            businessAddress: formData.businessAddress,
            registeredOffice: formData.registeredOffice,
            cinNumber: formData.cinNumber,
            businessPhone: formData.businessPhone || (inputType === "phone" ? formData.contactInput : ""),
            businessEmail: formData.businessEmail || (inputType === "email" ? formData.contactInput : ""),
            bankAccountHolderName: formData.bankAccountHolderName || formData.ownerName,
            bankName: formData.bankName,
            upiId: formData.upiId
        };

        sessionStorage.setItem("sellerBasicInfo", JSON.stringify(finalSellerData));
        localStorage.setItem("sellerBasicInfo", JSON.stringify(finalSellerData));

        console.log("✅ Seller basic info saved:", finalSellerData);

        navigate("/seller/document-upload");
    };

    return (
        <div className="azora-auth-page-wrapper" style={{ padding: "30px 10px" }}>
            <div className="auth-card-box" style={{ width: "100%", maxWidth: "650px", border: "1px solid #ccc" }}>

                <h2 className="auth-card-title" style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "20px" }}>
                    🏢 Open Your Azora Merchant Account
                </h2>

                <form onSubmit={handleFinalSubmit} className="amazon-pure-form">

                    <div className="auth-input-group">
                        <label className="auth-input-label">1. Owner Full Name</label>
                        <input
                            type="text"
                            className="auth-text-field"
                            placeholder="Enter owner full name"
                            style={{ borderColor: activeErrors.ownerName ? "#dc2626" : "#a6a6a6", background: activeErrors.ownerName ? "#fef2f2" : "#fff" }}
                            value={formData.ownerName}
                            onChange={(e) => { setFormData({ ...formData, ownerName: e.target.value }); setActiveErrors({ ...activeErrors, ownerName: "" }); }}
                        />
                        {activeErrors.ownerName && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.ownerName}</span>}
                    </div>

                    <div className="auth-input-group">
                        <label className="auth-input-label">2. Store / Shop Name</label>
                        <input
                            type="text"
                            className="auth-text-field"
                            placeholder="Enter store/shop name"
                            style={{ borderColor: activeErrors.storeName ? "#dc2626" : "#a6a6a6", background: activeErrors.storeName ? "#fef2f2" : "#fff" }}
                            value={formData.storeName}
                            onChange={(e) => { setFormData({ ...formData, storeName: e.target.value }); setActiveErrors({ ...activeErrors, storeName: "" }); }}
                        />
                        {activeErrors.storeName && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.storeName}</span>}
                    </div>

                    <div className="auth-input-group">
                        <label className="auth-input-label">3. Enter Mobile Number or Gmail</label>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <input
                                type="text"
                                className="auth-text-field"
                                placeholder="Email address or phone"
                                disabled={isOtpVerified}
                                style={{ flexGrow: 1, borderColor: activeErrors.contactInput ? "#dc2626" : "#a6a6a6", background: activeErrors.contactInput ? "#fef2f2" : "#fff" }}
                                value={formData.contactInput}
                                onChange={handleContactChange}
                            />
                            <button
                                type="button"
                                disabled={isOtpVerified}
                                onClick={triggerOtpValidation}
                                style={{ padding: "0 15px", background: isOtpVerified ? "#16a34a" : "#0f172a", color: "white", border: "none", borderRadius: "3px", fontSize: "0.8rem", fontWeight: "bold", cursor: "pointer" }}
                            >
                                {isOtpVerified ? "✓ Verified" : "Get OTP"}
                            </button>
                        </div>
                        {activeErrors.contactInput && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.contactInput}</span>}
                    </div>

                    {otpSent && (
                        <div className="auth-input-group animate-fade" style={{ background: "#f8fafc", padding: "12px", borderRadius: "4px", border: "1px solid #e2e8f0" }}>
                            <label className="auth-input-label" style={{ color: "#0f172a" }}>🔒 Enter Received Security Code</label>
                            <div style={{ display: "flex", gap: "10px" }}>
                                <input
                                    type="text"
                                    className="auth-text-field"
                                    placeholder="Enter 6-digit code"
                                    maxLength="6"
                                    disabled={isOtpVerified}
                                    style={{ flexGrow: 1, borderColor: activeErrors.otpCode ? "#dc2626" : "#a6a6a6" }}
                                    value={formData.otpCode}
                                    onChange={(e) => setFormData({ ...formData, otpCode: e.target.value })}
                                />
                                <button
                                    type="button"
                                    disabled={isOtpVerified}
                                    onClick={verifyReceivedOtp}
                                    style={{ padding: "0 15px", background: "#10b981", color: "white", border: "none", borderRadius: "3px", fontSize: "0.8rem", fontWeight: "bold", cursor: "pointer" }}
                                >
                                    Verify Code
                                </button>
                            </div>
                            {activeErrors.otpCode && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.otpCode}</span>}
                        </div>
                    )}

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "10px" }}>
                        <div className="auth-input-group">
                            <label className="auth-input-label">4. PAN Card Number</label>
                            <input
                                type="text"
                                maxLength="10"
                                className="auth-text-field"
                                placeholder="ABCDE1234F"
                                style={{ borderColor: activeErrors.panNumber ? "#dc2626" : "#a6a6a6", background: activeErrors.panNumber ? "#fef2f2" : "#fff" }}
                                value={formData.panNumber}
                                onChange={(e) => { setFormData({ ...formData, panNumber: e.target.value.toUpperCase() }); setActiveErrors({ ...activeErrors, panNumber: "" }); }}
                            />
                            {activeErrors.panNumber && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.panNumber}</span>}
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-input-label">5. GSTIN Number</label>
                            <input
                                type="text"
                                maxLength="15"
                                className="auth-text-field"
                                placeholder="22AAAAA0000A1Z"
                                style={{ borderColor: activeErrors.gstinNumber ? "#dc2626" : "#a6a6a6", background: activeErrors.gstinNumber ? "#fef2f2" : "#fff" }}
                                value={formData.gstinNumber}
                                onChange={(e) => { setFormData({ ...formData, gstinNumber: e.target.value.toUpperCase() }); setActiveErrors({ ...activeErrors, gstinNumber: "" }); }}
                            />
                            {activeErrors.gstinNumber && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.gstinNumber}</span>}
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                        <div className="auth-input-group">
                            <label className="auth-input-label">6. Bank Account Number</label>
                            <input
                                type="text"
                                className="auth-text-field"
                                placeholder="123456789012345"
                                style={{ borderColor: activeErrors.bankAccount ? "#dc2626" : "#a6a6a6", background: activeErrors.bankAccount ? "#fef2f2" : "#fff" }}
                                value={formData.bankAccount}
                                onChange={(e) => { setFormData({ ...formData, bankAccount: e.target.value }); setActiveErrors({ ...activeErrors, bankAccount: "" }); }}
                            />
                            {activeErrors.bankAccount && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.bankAccount}</span>}
                        </div>

                        <div className="auth-input-group">
                            <label className="auth-input-label">7. Bank IFSC Code</label>
                            <input
                                type="text"
                                className="auth-text-field"
                                placeholder="SBIN0001234"
                                style={{ borderColor: activeErrors.ifscCode ? "#dc2626" : "#a6a6a6", background: activeErrors.ifscCode ? "#fef2f2" : "#fff" }}
                                value={formData.ifscCode}
                                onChange={(e) => { setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() }); setActiveErrors({ ...activeErrors, ifscCode: "" }); }}
                            />
                            {activeErrors.ifscCode && <span style={{ color: "#dc2626", fontSize: "0.75rem", marginTop: "3px" }}>⚠️ {activeErrors.ifscCode}</span>}
                        </div>
                    </div>

                    {/* ========== 🆕 NEW SECTION: BUSINESS DETAILS FOR INVOICE (Toggleable) ========== */}
                    <div style={{ marginTop: "20px", borderTop: "1px solid #e2e8f0", paddingTop: "15px" }}>
                        <button
                            type="button"
                            onClick={() => setShowBusinessDetails(!showBusinessDetails)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                background: "none",
                                border: "none",
                                color: "#03bafc",
                                fontSize: "14px",
                                fontWeight: "bold",
                                cursor: "pointer",
                                marginBottom: showBusinessDetails ? "15px" : "0"
                            }}
                        >
                            <FaBuilding />
                            {showBusinessDetails ? "▼ Hide Business Details (For Invoice)" : "▶ Add Business Details (For Invoice)"}
                        </button>

                        {showBusinessDetails && (
                            <div style={{ 
                                animation: "fadeIn 0.3s ease",
                                background: "#f8fafc",
                                padding: "15px",
                                borderRadius: "8px",
                                marginTop: "5px"
                            }}>
                                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "15px" }}>
                                    📄 These details will appear on customer invoices (like Flipkart/Amazon)
                                </p>

                                <div className="auth-input-group">
                                    <label className="auth-input-label">Business Name (Legal Name) <span style={{ color: "#64748b", fontSize: "11px" }}>(Optional)</span></label>
                                    <input
                                        type="text"
                                        className="auth-text-field"
                                        placeholder="e.g., ABC Electronics Pvt Ltd"
                                        style={{ borderColor: activeErrors.businessName ? "#dc2626" : "#a6a6a6" }}
                                        value={formData.businessName}
                                        onChange={(e) => { setFormData({ ...formData, businessName: e.target.value }); setActiveErrors({ ...activeErrors, businessName: "" }); }}
                                    />
                                    <span style={{ fontSize: "11px", color: "#64748b" }}>If empty, Store Name will be used on invoices</span>
                                </div>

                                <div className="auth-input-group">
                                    <label className="auth-input-label">Business Address <span style={{ color: "#64748b", fontSize: "11px" }}>(Optional)</span></label>
                                    <textarea
                                        rows="2"
                                        className="auth-text-field"
                                        placeholder="Complete business address with city, state, pincode"
                                        style={{ borderColor: activeErrors.businessAddress ? "#dc2626" : "#a6a6a6" }}
                                        value={formData.businessAddress}
                                        onChange={(e) => { setFormData({ ...formData, businessAddress: e.target.value }); setActiveErrors({ ...activeErrors, businessAddress: "" }); }}
                                    />
                                </div>

                                <div className="auth-input-group">
                                    <label className="auth-input-label">Registered Office Address <span style={{ color: "#64748b", fontSize: "11px" }}>(Optional)</span></label>
                                    <textarea
                                        rows="2"
                                        className="auth-text-field"
                                        placeholder="Registered office address (if different from business address)"
                                        value={formData.registeredOffice}
                                        onChange={(e) => setFormData({ ...formData, registeredOffice: e.target.value })}
                                    />
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                    <div className="auth-input-group">
                                        <label className="auth-input-label">CIN Number <span style={{ color: "#64748b", fontSize: "11px" }}>(Optional)</span></label>
                                        <input
                                            type="text"
                                            className="auth-text-field"
                                            placeholder="U52500HR2016PTC064234"
                                            value={formData.cinNumber}
                                            onChange={(e) => setFormData({ ...formData, cinNumber: e.target.value.toUpperCase() })}
                                        />
                                    </div>

                                    <div className="auth-input-group">
                                        <label className="auth-input-label">UPI ID <span style={{ color: "#64748b", fontSize: "11px" }}>(Optional)</span></label>
                                        <input
                                            type="text"
                                            className="auth-text-field"
                                            placeholder="storename@okhdfcbank"
                                            value={formData.upiId}
                                            onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                                    <div className="auth-input-group">
                                        <label className="auth-input-label">Bank Account Holder Name</label>
                                        <input
                                            type="text"
                                            className="auth-text-field"
                                            placeholder="Account holder name"
                                            value={formData.bankAccountHolderName}
                                            onChange={(e) => setFormData({ ...formData, bankAccountHolderName: e.target.value })}
                                        />
                                    </div>

                                    <div className="auth-input-group">
                                        <label className="auth-input-label">Bank Name</label>
                                        <input
                                            type="text"
                                            className="auth-text-field"
                                            placeholder="e.g., State Bank of India"
                                            value={formData.bankName}
                                            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="auth-input-group">
                                    <label className="auth-input-label">Business Phone <span style={{ color: "#64748b", fontSize: "11px" }}>(For Invoice)</span></label>
                                    <input
                                        type="tel"
                                        className="auth-text-field"
                                        placeholder="Business contact number"
                                        value={formData.businessPhone}
                                        onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
                                    />
                                </div>

                                <div className="auth-input-group">
                                    <label className="auth-input-label">Business Email <span style={{ color: "#64748b", fontSize: "11px" }}>(For Invoice)</span></label>
                                    <input
                                        type="email"
                                        className="auth-text-field"
                                        placeholder="business@example.com"
                                        value={formData.businessEmail}
                                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <button type="submit" className="auth-submit-yellow-btn" style={{ height: "40px", fontSize: "1rem", marginTop: "15px" }}>
                        Continue & Register As Seller
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerRegister;