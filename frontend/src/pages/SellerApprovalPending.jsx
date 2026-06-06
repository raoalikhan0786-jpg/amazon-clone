import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaCheckCircle, FaTimesCircle, FaSpinner, FaStore, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const SellerApprovalPending = () => {
    const navigate = useNavigate();
    const [approvalStatus, setApprovalStatus] = useState("pending");
    const [loading, setLoading] = useState(true);
    const [sellerData, setSellerData] = useState(null);
    
    useEffect(() => {
        const completeSellerData = JSON.parse(sessionStorage.getItem("completeSellerData") || "{}");
        const sellerBasicInfo = JSON.parse(sessionStorage.getItem("sellerBasicInfo") || "{}");
        
        const mergedData = { ...sellerBasicInfo, ...completeSellerData };
        setSellerData(mergedData);
        
        const savedStatus = localStorage.getItem("sellerApprovalStatus");
        if (savedStatus === "approved") {
            setApprovalStatus("approved");
            setTimeout(() => {
                navigate("/seller/dashboard");
            }, 2000);
        } else if (savedStatus === "rejected") {
            setApprovalStatus("rejected");
        }
        
        setLoading(false);
        
        const interval = setInterval(() => {
            checkApprovalStatus();
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);
    
    const checkApprovalStatus = () => {
        const status = localStorage.getItem("sellerApprovalStatus");
        if (status === "approved" && approvalStatus !== "approved") {
            setApprovalStatus("approved");
            setTimeout(() => {
                navigate("/seller/dashboard");
            }, 1500);
        } else if (status === "rejected" && approvalStatus !== "rejected") {
            setApprovalStatus("rejected");
        }
    };
    
    const simulateAdminApproval = () => {
        localStorage.setItem("sellerApprovalStatus", "approved");
        setApprovalStatus("approved");
        setTimeout(() => {
            navigate("/seller/dashboard");
        }, 1500);
    };
    
    const simulateAdminRejection = () => {
        localStorage.setItem("sellerApprovalStatus", "rejected");
        setApprovalStatus("rejected");
    };
    
    if (loading) {
        return (
            <div className="azora-auth-page-wrapper" style={{ padding: "30px 10px", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                    <FaSpinner style={{ fontSize: "3rem", color: "#ff9900", animation: "spin 1s linear infinite" }} />
                    <p style={{ marginTop: "15px", color: "#666" }}>Loading your application status...</p>
                </div>
            </div>
        );
    }
    
    // Rejected Page
    if (approvalStatus === "rejected") {
        return (
            <div className="azora-auth-page-wrapper" style={{ padding: "30px 10px", minHeight: "100vh" }}>
                <div className="auth-card-box" style={{ width: "100%", maxWidth: "550px", border: "1px solid #ccc", textAlign: "center" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <FaTimesCircle style={{ fontSize: "5rem", color: "#dc2626" }} />
                    </div>
                    <h2 style={{ color: "#dc2626", marginBottom: "15px" }}>Application Rejected</h2>
                    <p style={{ color: "#555", marginBottom: "20px", lineHeight: "1.5" }}>
                        We regret to inform you that your seller application has been reviewed and <br />
                        <strong>did not meet our marketplace quality standards</strong> at this time.
                    </p>
                    
                    <div style={{ background: "#fef2f2", padding: "15px", borderRadius: "8px", marginBottom: "20px", textAlign: "left" }}>
                        <h4 style={{ color: "#dc2626", marginBottom: "10px", fontSize: "0.9rem" }}>Possible Reasons:</h4>
                        <ul style={{ color: "#666", fontSize: "0.8rem", marginLeft: "20px" }}>
                            <li>Document verification failed</li>
                            <li>Identity verification did not match</li>
                            <li>Business details incomplete or incorrect</li>
                        </ul>
                    </div>
                    
                    <p style={{ color: "#666", fontSize: "0.85rem", marginBottom: "25px" }}>
                        You can contact our support team for more information or re-apply after 30 days.
                    </p>
                    
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                        <button 
                            onClick={() => navigate("/")}
                            style={{ background: "#666", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}
                        >
                            Go to Homepage
                        </button>
                        <button 
                            onClick={() => {
                                localStorage.removeItem("sellerApprovalStatus");
                                localStorage.removeItem("completeSellerData");
                                localStorage.removeItem("sellerBasicInfo");
                                navigate("/seller/register");
                            }}
                            style={{ background: "#dc2626", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}
                        >
                            Re-apply
                        </button>
                    </div>
                </div>
                
                {/* Admin Simulation Buttons - Remove in production */}
                <div style={{ marginTop: "20px", textAlign: "center", opacity: 0.5 }}>
                    <p style={{ fontSize: "0.7rem", color: "#999", marginBottom: "10px" }}>Admin Simulation (Remove in production)</p>
                    <button onClick={simulateAdminApproval} style={{ marginRight: "10px", padding: "5px 10px", background: "#22c55e", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.7rem" }}>Simulate Approve</button>
                    <button onClick={simulateAdminRejection} style={{ padding: "5px 10px", background: "#dc2626", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.7rem" }}>Simulate Reject</button>
                </div>
            </div>
        );
    }
    
    // Pending Page
    return (
        <div className="azora-auth-page-wrapper" style={{ padding: "30px 10px", minHeight: "100vh" }}>
            <div className="auth-card-box" style={{ width: "100%", maxWidth: "650px", border: "1px solid #ccc" }}>
                
                {/* Header */}
                <div style={{ textAlign: "center", marginBottom: "25px" }}>
                    <div style={{ 
                        width: "80px", 
                        height: "80px", 
                        background: "#fff7ed", 
                        borderRadius: "50%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        margin: "0 auto 15px"
                    }}>
                        <FaStore style={{ fontSize: "2.5rem", color: "#ff9900" }} />
                    </div>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#0f1111", marginBottom: "8px" }}>
                        Application Under Review
                    </h2>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#fef3c7", padding: "6px 12px", borderRadius: "20px" }}>
                        <FaClock style={{ color: "#d97706", fontSize: "0.8rem" }} />
                        <span style={{ color: "#d97706", fontSize: "0.75rem", fontWeight: "500" }}>Pending Approval</span>
                    </div>
                </div>
                
                {/* Progress Message */}
                <div style={{ 
                    background: "#f0fdf4", 
                    border: "1px solid #bbf7d0", 
                    borderRadius: "10px", 
                    padding: "15px", 
                    marginBottom: "25px",
                    textAlign: "center"
                }}>
                    <FaCheckCircle style={{ color: "#16a34a", fontSize: "1.2rem", marginBottom: "8px" }} />
                    <p style={{ color: "#16a34a", fontWeight: "500", marginBottom: "5px" }}>
                        Your application has been submitted successfully!
                    </p>
                    <p style={{ color: "#555", fontSize: "0.8rem" }}>
                        Our team is reviewing your documents and information.
                    </p>
                </div>
                
                {/* Application Summary */}
                <div style={{ marginBottom: "25px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                        Application Summary
                    </h3>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div>
                            <p style={{ fontSize: "0.7rem", color: "#666", marginBottom: "2px" }}>Store Name</p>
                            <p style={{ fontSize: "0.85rem", fontWeight: "500" }}>{sellerData?.storeName || "Not provided"}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "0.7rem", color: "#666", marginBottom: "2px" }}>Owner Name</p>
                            <p style={{ fontSize: "0.85rem", fontWeight: "500" }}>{sellerData?.ownerName || "Not provided"}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "0.7rem", color: "#666", marginBottom: "2px" }}>Contact</p>
                            <p style={{ fontSize: "0.85rem", fontWeight: "500" }}>{sellerData?.contactInput || "Not provided"}</p>
                        </div>
                        <div>
                            <p style={{ fontSize: "0.7rem", color: "#666", marginBottom: "2px" }}>PAN Number</p>
                            <p style={{ fontSize: "0.85rem", fontWeight: "500" }}>{sellerData?.panNumber || "Not provided"}</p>
                        </div>
                    </div>
                </div>
                
                {/* Document Status */}
                <div style={{ marginBottom: "25px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                        Document Status
                    </h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px" }}>
                            <span style={{ fontSize: "0.85rem" }}>PAN Card</span>
                            {sellerData?.panCard ? (
                                <span style={{ color: "#16a34a", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <FaCheckCircle /> Uploaded
                                </span>
                            ) : (
                                <span style={{ color: "#d97706", fontSize: "0.75rem" }}>Pending</span>
                            )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px" }}>
                            <span style={{ fontSize: "0.85rem" }}>GSTIN Certificate</span>
                            {sellerData?.gstinCert ? (
                                <span style={{ color: "#16a34a", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <FaCheckCircle /> Uploaded
                                </span>
                            ) : (
                                <span style={{ color: "#d97706", fontSize: "0.75rem" }}>Pending</span>
                            )}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px" }}>
                            <span style={{ fontSize: "0.85rem" }}>Live Selfie Verification</span>
                            {sellerData?.selfieImage ? (
                                <span style={{ color: "#16a34a", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <FaCheckCircle /> Completed
                                </span>
                            ) : (
                                <span style={{ color: "#d97706", fontSize: "0.75rem" }}>Pending</span>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Timeline */}
                <div style={{ marginBottom: "25px" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                        What&apos;s Next?
                    </h3>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <div style={{ width: "24px", height: "24px", background: "#ff9900", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: "bold" }}>1</div>
                            <div>
                                <p style={{ fontWeight: "500", marginBottom: "2px" }}>Document Verification</p>
                                <p style={{ fontSize: "0.75rem", color: "#666" }}>Our team will verify your PAN, GSTIN, and identity documents</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <div style={{ width: "24px", height: "24px", background: "#ff9900", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: "bold" }}>2</div>
                            <div>
                                <p style={{ fontWeight: "500", marginBottom: "2px" }}>Admin Review</p>
                                <p style={{ fontSize: "0.75rem", color: "#666" }}>Admin will review your application (typically within 24-48 hours)</p>
                            </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                            <div style={{ width: "24px", height: "24px", background: "#ff9900", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.7rem", fontWeight: "bold" }}>3</div>
                            <div>
                                <p style={{ fontWeight: "500", marginBottom: "2px" }}>Approval & Onboarding</p>
                                {/* 🔴 YAHAN LINE FIX KI - double quote hataya */}
                                <p style={{ fontSize: "0.75rem", color: "#666" }}>Once approved, you will get access to Seller Dashboard</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Contact Support */}
                <div style={{ 
                    background: "#f8fafc", 
                    borderRadius: "10px", 
                    padding: "15px", 
                    textAlign: "center",
                    border: "1px solid #e2e8f0"
                }}>
                    <p style={{ fontSize: "0.8rem", color: "#555", marginBottom: "10px" }}>
                        Have questions about your application?
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                        <a href="mailto:seller-support@azora.com" style={{ color: "#0066c0", fontSize: "0.8rem", textDecoration: "none" }}>
                            <FaEnvelope style={{ marginRight: "5px" }} /> Email Support
                        </a>
                        <a href="tel:1800-123-4567" style={{ color: "#0066c0", fontSize: "0.8rem", textDecoration: "none" }}>
                            <FaPhoneAlt style={{ marginRight: "5px" }} /> Call Support
                        </a>
                    </div>
                </div>
                
                {/* Navigation Buttons */}
                <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
                    <button 
                        onClick={() => navigate("/")}
                        style={{ background: "#666", color: "white", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", flex: 1 }}
                    >
                        Back to Home
                    </button>
                    <button 
                        onClick={() => {
                            checkApprovalStatus();
                            alert("Checking application status...");
                        }}
                        style={{ background: "#ff9900", color: "white", border: "none", padding: "10px", borderRadius: "8px", cursor: "pointer", flex: 1 }}
                    >
                        Check Status
                    </button>
                </div>
                
                {/* Admin Simulation Buttons - Remove in production */}
                <div style={{ marginTop: "20px", textAlign: "center", paddingTop: "15px", borderTop: "1px solid #eee", opacity: 0.5 }}>
                    <p style={{ fontSize: "0.7rem", color: "#999", marginBottom: "10px" }}>Admin Simulation (Remove in production)</p>
                    <button onClick={simulateAdminApproval} style={{ marginRight: "10px", padding: "5px 10px", background: "#22c55e", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.7rem" }}>Simulate Approve</button>
                    <button onClick={simulateAdminRejection} style={{ padding: "5px 10px", background: "#dc2626", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "0.7rem" }}>Simulate Reject</button>
                </div>
                
            </div>
        </div>
    );
};

export default SellerApprovalPending;