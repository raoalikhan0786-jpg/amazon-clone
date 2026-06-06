import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    FaArrowLeft, FaCheckCircle, FaTimesCircle, FaCamera, 
    FaUpload, FaFileAlt, FaIdCard, FaUserCheck, FaSpinner,
    FaRedo, FaTrash
} from "react-icons/fa";

const SellerDocumentUpload = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Document States
    const [panCard, setPanCard] = useState(null);
    const [panPreview, setPanPreview] = useState(null);
    const [gstinCert, setGstinCert] = useState(null);
    const [gstinPreview, setGstinPreview] = useState(null);
    
    // Selfie States
    const [selfieImage, setSelfieImage] = useState(null);
    const [selfieStep, setSelfieStep] = useState(1);
    const [verificationStatus, setVerificationStatus] = useState({
        neckRotate: false,
        headRotate: false,
        selfieCaptured: false
    });
    
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    
    // Camera Setup
    useEffect(() => {
        if (step === 3 && !selfieImage) {
            startCamera();
        }
        return () => {
            stopCamera();
        };
    }, [step, selfieImage]);
    
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            }
        } catch (err) {
            console.error("Camera error:", err);
            alert("Unable to access camera. Please check permissions.");
        }
    };
    
    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
    };
    
    // Handle File Upload
    const handlePanUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPanCard(file);
            setPanPreview(URL.createObjectURL(file));
        }
    };
    
    const handleGstinUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setGstinCert(file);
            setGstinPreview(URL.createObjectURL(file));
        }
    };
    
    // Capture Selfie
    const captureSelfie = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const imageData = canvasRef.current.toDataURL('image/jpeg');
            setSelfieImage(imageData);
            setVerificationStatus(prev => ({ ...prev, selfieCaptured: true }));
            stopCamera();
        }
    };
    
    // Retake Selfie
    const retakeSelfie = () => {
        setSelfieImage(null);
        setVerificationStatus(prev => ({ ...prev, selfieCaptured: false }));
        startCamera();
    };
    
    // Reset all verifications (retake all steps)
    const resetAllVerifications = () => {
        setSelfieImage(null);
        setVerificationStatus({
            neckRotate: false,
            headRotate: false,
            selfieCaptured: false
        });
        setSelfieStep(1);
        startCamera();
    };
    
    // Simulate Neck Rotate Verification
    const verifyNeckRotate = () => {
        setLoading(true);
        setTimeout(() => {
            setVerificationStatus(prev => ({ ...prev, neckRotate: true }));
            setSelfieStep(2);
            setLoading(false);
            alert("✅ Neck rotation verified! Now please rotate your head left and right.");
        }, 1500);
    };
    
    // Simulate Head Rotate Verification
    const verifyHeadRotate = () => {
        setLoading(true);
        setTimeout(() => {
            setVerificationStatus(prev => ({ ...prev, headRotate: true }));
            setLoading(false);
            alert("✅ Head rotation verified! Now capture your selfie.");
        }, 1500);
    };
    
    // Final Submit - ✅ FIXED: Ab approval pending page par jayega
    const handleFinalSubmit = () => {
        if (!panCard || !gstinCert || !selfieImage) {
            alert("Please complete all steps including document uploads and selfie verification.");
            return;
        }
        
        if (!verificationStatus.neckRotate || !verificationStatus.headRotate || !verificationStatus.selfieCaptured) {
            alert("Please complete the live selfie verification process.");
            return;
        }
        
        setLoading(true);
        
        const sellerBasicInfo = JSON.parse(sessionStorage.getItem("sellerBasicInfo") || "{}");
        const completeSellerData = {
            ...sellerBasicInfo,
            panCard: panPreview,
            gstinCert: gstinPreview,
            selfieImage: selfieImage,
            verificationCompleted: true,
            verificationStatus: verificationStatus
        };
        sessionStorage.setItem("completeSellerData", JSON.stringify(completeSellerData));
        
        setTimeout(() => {
            setLoading(false);
            alert("✅ Congratulations! Your seller application has been submitted successfully!");
            // 🔴 CHANGE: Direct dashboard nahi, approval pending page par jayega
            navigate("/seller/approval-pending");
        }, 1500);
    };
    
    const goBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate("/seller/register");
        }
    };
    
    return (
        <div className="azora-auth-page-wrapper" style={{ padding: "30px 10px", minHeight: "100vh" }}>
            <div className="auth-card-box" style={{ width: "100%", maxWidth: "700px", border: "1px solid #ccc" }}>
                
                {/* Header with Back Button */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
                    <button 
                        onClick={goBack}
                        style={{ background: "none", border: "none", cursor: "pointer", marginRight: "15px", fontSize: "1.2rem", color: "#0066c0" }}
                    >
                        <FaArrowLeft />
                    </button>
                    <h2 style={{ fontSize: "1.4rem", fontWeight: "600", margin: 0, color: "#0f1111" }}>
                        {step === 1 && "📄 Step 1: PAN Card Upload"}
                        {step === 2 && "📑 Step 2: GSTIN Certificate Upload"}
                        {step === 3 && "📸 Step 3: Live Selfie Verification"}
                    </h2>
                </div>
                
                {/* Progress Bar */}
                <div style={{ display: "flex", marginBottom: "30px", gap: "10px" }}>
                    <div style={{ flex: 1, height: "4px", background: step >= 1 ? "#ff9900" : "#ddd", borderRadius: "2px" }}></div>
                    <div style={{ flex: 1, height: "4px", background: step >= 2 ? "#ff9900" : "#ddd", borderRadius: "2px" }}></div>
                    <div style={{ flex: 1, height: "4px", background: step >= 3 ? "#ff9900" : "#ddd", borderRadius: "2px" }}></div>
                </div>
                
                {/* Step 1: PAN Card Upload */}
                {step === 1 && (
                    <div className="animate-fade">
                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            <FaIdCard style={{ fontSize: "3rem", color: "#ff9900" }} />
                            <p style={{ fontSize: "0.85rem", color: "#555", marginTop: "10px" }}>
                                Please upload a clear image of your PAN Card<br />
                                (Allowed formats: JPG, PNG - Max 5MB)
                            </p>
                        </div>
                        
                        <div className="upload-area" style={{
                            border: "2px dashed #ccc",
                            borderRadius: "10px",
                            padding: "30px",
                            textAlign: "center",
                            cursor: "pointer",
                            backgroundColor: panPreview ? "#f0fdf4" : "#fafafa",
                            borderColor: panPreview ? "#22c55e" : "#ccc",
                            transition: "all 0.3s ease"
                        }}>
                            {panPreview ? (
                                <div>
                                    <img src={panPreview} alt="PAN Card Preview" style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px", marginBottom: "10px" }} />
                                    <div style={{ display: "flex", justifyContent: "center", gap: "15px", alignItems: "center" }}>
                                        <FaCheckCircle style={{ color: "#22c55e", fontSize: "1.5rem" }} />
                                        <p style={{ color: "#16a34a", margin: 0 }}>PAN Card Uploaded Successfully!</p>
                                    </div>
                                    <button 
                                        onClick={() => { setPanCard(null); setPanPreview(null); }}
                                        style={{ background: "#dc2626", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.75rem", marginTop: "10px" }}
                                    >
                                        <FaTrash style={{ marginRight: "5px" }} /> Remove & Re-upload
                                    </button>
                                </div>
                            ) : (
                                <label style={{ cursor: "pointer", display: "block" }}>
                                    <FaUpload style={{ fontSize: "2rem", color: "#666", marginBottom: "10px" }} />
                                    <span style={{ display: "block", fontSize: "0.9rem", color: "#0066c0" }}>Click to upload PAN Card</span>
                                    <input type="file" accept="image/*" onChange={handlePanUpload} style={{ display: "none" }} />
                                </label>
                            )}
                        </div>
                        
                        <button 
                            onClick={() => panPreview && setStep(2)}
                            disabled={!panPreview}
                            className="auth-submit-yellow-btn"
                            style={{ marginTop: "25px", width: "100%", opacity: panPreview ? 1 : 0.5, cursor: panPreview ? "pointer" : "not-allowed" }}
                        >
                            {panPreview ? "Continue to Step 2 →" : "Upload PAN Card First"}
                        </button>
                    </div>
                )}
                
                {/* Step 2: GSTIN Certificate Upload */}
                {step === 2 && (
                    <div className="animate-fade">
                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            <FaFileAlt style={{ fontSize: "3rem", color: "#ff9900" }} />
                            <p style={{ fontSize: "0.85rem", color: "#555", marginTop: "10px" }}>
                                Please upload your GSTIN Certificate<br />
                                (Allowed formats: JPG, PNG, PDF - Max 5MB)
                            </p>
                        </div>
                        
                        <div className="upload-area" style={{
                            border: "2px dashed #ccc",
                            borderRadius: "10px",
                            padding: "30px",
                            textAlign: "center",
                            cursor: "pointer",
                            backgroundColor: gstinPreview ? "#f0fdf4" : "#fafafa",
                            borderColor: gstinPreview ? "#22c55e" : "#ccc",
                            transition: "all 0.3s ease"
                        }}>
                            {gstinPreview ? (
                                <div>
                                    <img src={gstinPreview} alt="GSTIN Certificate Preview" style={{ maxWidth: "100%", maxHeight: "200px", borderRadius: "8px", marginBottom: "10px" }} />
                                    <div style={{ display: "flex", justifyContent: "center", gap: "15px", alignItems: "center" }}>
                                        <FaCheckCircle style={{ color: "#22c55e", fontSize: "1.5rem" }} />
                                        <p style={{ color: "#16a34a", margin: 0 }}>GSTIN Certificate Uploaded Successfully!</p>
                                    </div>
                                    <button 
                                        onClick={() => { setGstinCert(null); setGstinPreview(null); }}
                                        style={{ background: "#dc2626", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "0.75rem", marginTop: "10px" }}
                                    >
                                        <FaTrash style={{ marginRight: "5px" }} /> Remove & Re-upload
                                    </button>
                                </div>
                            ) : (
                                <label style={{ cursor: "pointer", display: "block" }}>
                                    <FaUpload style={{ fontSize: "2rem", color: "#666", marginBottom: "10px" }} />
                                    <span style={{ display: "block", fontSize: "0.9rem", color: "#0066c0" }}>Click to upload GSTIN Certificate</span>
                                    <input type="file" accept="image/*,application/pdf" onChange={handleGstinUpload} style={{ display: "none" }} />
                                </label>
                            )}
                        </div>
                        
                        <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
                            <button onClick={() => setStep(1)} style={{ background: "#666", color: "white", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", flex: 1 }}>
                                ← Back
                            </button>
                            <button 
                                onClick={() => gstinPreview && setStep(3)}
                                disabled={!gstinPreview}
                                className="auth-submit-yellow-btn"
                                style={{ flex: 1, opacity: gstinPreview ? 1 : 0.5, cursor: gstinPreview ? "pointer" : "not-allowed" }}
                            >
                                {gstinPreview ? "Continue to Step 3 →" : "Upload GSTIN First"}
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Step 3: Live Selfie Verification with Colored Icons */}
                {step === 3 && (
                    <div className="animate-fade">
                        <div style={{ textAlign: "center", marginBottom: "20px" }}>
                            <FaCamera style={{ fontSize: "3rem", color: "#ff9900" }} />
                            <p style={{ fontSize: "0.85rem", color: "#555", marginTop: "10px" }}>
                                Live Selfie Verification - Follow the instructions below
                            </p>
                        </div>
                        
                        {/* Camera/Video Section */}
                        <div style={{ 
                            background: "#000", 
                            borderRadius: "10px", 
                            overflow: "hidden",
                            position: "relative",
                            border: (verificationStatus.neckRotate && verificationStatus.headRotate && verificationStatus.selfieCaptured) 
                                ? "3px solid #ff9900" 
                                : (verificationStatus.neckRotate || verificationStatus.headRotate) 
                                    ? "3px solid #22c55e" 
                                    : "1px solid #ccc",
                            transition: "all 0.3s ease"
                        }}>
                            {!selfieImage ? (
                                <video 
                                    ref={videoRef} 
                                    autoPlay 
                                    playsInline 
                                    style={{ width: "100%", height: "auto", display: "block" }}
                                />
                            ) : (
                                <img src={selfieImage} alt="Captured Selfie" style={{ width: "100%", height: "auto", display: "block" }} />
                            )}
                            <canvas ref={canvasRef} style={{ display: "none" }} />
                        </div>
                        
                        {/* Retake Button - Red color */}
                        {selfieImage && (
                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <button 
                                    onClick={retakeSelfie}
                                    style={{
                                        background: "#dc2626",
                                        color: "white",
                                        border: "none",
                                        padding: "6px 15px",
                                        borderRadius: "20px",
                                        cursor: "pointer",
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "5px"
                                    }}
                                >
                                    <FaRedo /> Retake Selfie
                                </button>
                            </div>
                        )}
                        
                        {/* Reset All Button */}
                        {(verificationStatus.neckRotate || verificationStatus.headRotate) && (
                            <div style={{ textAlign: "center", marginTop: "10px" }}>
                                <button 
                                    onClick={resetAllVerifications}
                                    style={{
                                        background: "#ea580c",
                                        color: "white",
                                        border: "none",
                                        padding: "6px 15px",
                                        borderRadius: "20px",
                                        cursor: "pointer",
                                        fontSize: "0.7rem",
                                        fontWeight: "bold",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "5px"
                                    }}
                                >
                                    <FaRedo /> Reset All & Start Over
                                </button>
                            </div>
                        )}
                        
                        {/* Verification Steps with Colored Icons */}
                        <div style={{ marginTop: "20px" }}>
                            {/* Step 3.1: Neck Rotate */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px",
                                background: verificationStatus.neckRotate ? "#f0fdf4" : "#f8fafc",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                border: verificationStatus.neckRotate ? "1px solid #22c55e" : "1px solid #e2e8f0"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {verificationStatus.neckRotate ? (
                                        <FaCheckCircle style={{ color: "#22c55e", fontSize: "1.3rem" }} />
                                    ) : (
                                        <FaTimesCircle style={{ color: "#dc2626", fontSize: "1.3rem" }} />
                                    )}
                                    <div>
                                        <span style={{ fontWeight: "600" }}>1. Neck Rotation</span>
                                        <p style={{ fontSize: "0.7rem", color: "#666", margin: 0 }}>Rotate your neck left and right slowly</p>
                                    </div>
                                </div>
                                {!verificationStatus.neckRotate && (
                                    <button 
                                        onClick={verifyNeckRotate}
                                        disabled={loading}
                                        style={{
                                            background: "#ff9900",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            cursor: "pointer",
                                            fontSize: "0.7rem",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {loading ? <FaSpinner style={{ animation: "spin 1s linear infinite" }} /> : "Verify"}
                                    </button>
                                )}
                            </div>
                            
                            {/* Step 3.2: Head Rotate */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px",
                                background: verificationStatus.headRotate ? "#f0fdf4" : "#f8fafc",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                border: verificationStatus.headRotate ? "1px solid #22c55e" : "1px solid #e2e8f0"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {verificationStatus.headRotate ? (
                                        <FaCheckCircle style={{ color: "#22c55e", fontSize: "1.3rem" }} />
                                    ) : (
                                        <FaTimesCircle style={{ color: "#dc2626", fontSize: "1.3rem" }} />
                                    )}
                                    <div>
                                        <span style={{ fontWeight: "600" }}>2. Head Rotation</span>
                                        <p style={{ fontSize: "0.7rem", color: "#666", margin: 0 }}>Rotate your head left and right slowly</p>
                                    </div>
                                </div>
                                {!verificationStatus.headRotate && (
                                    <button 
                                        onClick={verifyHeadRotate}
                                        disabled={!verificationStatus.neckRotate || loading}
                                        style={{
                                            background: verificationStatus.neckRotate ? "#ff9900" : "#ccc",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            cursor: verificationStatus.neckRotate ? "pointer" : "not-allowed",
                                            fontSize: "0.7rem",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {loading ? <FaSpinner style={{ animation: "spin 1s linear infinite" }} /> : "Verify"}
                                    </button>
                                )}
                            </div>
                            
                            {/* Step 3.3: Capture Selfie */}
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "12px",
                                background: verificationStatus.selfieCaptured ? "#f0fdf4" : "#f8fafc",
                                borderRadius: "8px",
                                border: verificationStatus.selfieCaptured ? "1px solid #22c55e" : "1px solid #e2e8f0"
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                    {verificationStatus.selfieCaptured ? (
                                        <FaCheckCircle style={{ color: "#22c55e", fontSize: "1.3rem" }} />
                                    ) : (
                                        <FaTimesCircle style={{ color: "#dc2626", fontSize: "1.3rem" }} />
                                    )}
                                    <div>
                                        <span style={{ fontWeight: "600" }}>3. Capture Selfie</span>
                                        <p style={{ fontSize: "0.7rem", color: "#666", margin: 0 }}>Look straight and capture your photo</p>
                                    </div>
                                </div>
                                {!verificationStatus.selfieCaptured && (
                                    <button 
                                        onClick={captureSelfie}
                                        disabled={!verificationStatus.headRotate || !verificationStatus.neckRotate}
                                        style={{
                                            background: (verificationStatus.headRotate && verificationStatus.neckRotate) ? "#ff9900" : "#ccc",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "20px",
                                            cursor: (verificationStatus.headRotate && verificationStatus.neckRotate) ? "pointer" : "not-allowed",
                                            fontSize: "0.7rem",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        <FaCamera style={{ marginRight: "5px" }} /> Capture
                                    </button>
                                )}
                            </div>
                        </div>
                        
                        {/* Navigation Buttons */}
                        <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
                            <button onClick={() => setStep(2)} style={{ background: "#666", color: "white", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", flex: 1 }}>
                                ← Back
                            </button>
                            <button 
                                onClick={handleFinalSubmit}
                                disabled={!verificationStatus.selfieCaptured || loading}
                                className="auth-submit-yellow-btn"
                                style={{ flex: 1, opacity: verificationStatus.selfieCaptured ? 1 : 0.5, cursor: verificationStatus.selfieCaptured ? "pointer" : "not-allowed" }}
                            >
                                {loading ? <FaSpinner style={{ animation: "spin 1s linear infinite", marginRight: "5px" }} /> : null}
                                Submit Application
                            </button>
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default SellerDocumentUpload;