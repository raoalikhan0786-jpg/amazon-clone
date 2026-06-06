// import React, { useState, useEffect } from "react";
// import {
//     FaChartLine, FaUsers, FaStore, FaGavel, FaEye,
//     FaArrowLeft, FaKey, FaShoppingCart, FaRupeeSign, FaMapMarkerAlt,
//     FaCheckCircle, FaTimesCircle, FaFileAlt, FaIdCard, FaCamera, FaListUl, FaInfoCircle,
//     FaUserShield, FaBoxes, FaTools, FaHeadset, FaComments
// } from "react-icons/fa";

// const AdminDashboard = () => {
//     const [activeTab, setActiveTab] = useState("overview");
//     const [selectedCustomer, setSelectedCustomer] = useState(null);
//     const [viewingCustomerOrders, setViewingCustomerOrders] = useState(false);
//     const [reviewingSellerDocs, setReviewingSellerDocs] = useState(null);
//     const [selectedSellerProfile, setSelectedSellerProfile] = useState(null);
//     const [selectedSellerHelp, setSelectedSellerHelp] = useState(null);
//     const [selectedCustHelp, setSelectedCustHelp] = useState(null);
//     const [liveNewCustomers, setLiveNewCustomers] = useState(0);
//     const [liveNewSellers, setLiveNewSellers] = useState(0);
//     const [sellersList, setSellersList] = useState([]);

//     useEffect(() => {
//         loadSellersFromStorage();
        
//         const storedNewCust = parseInt(localStorage.getItem("simulated_new_customers") || "0");
//         const storedNewSellers = parseInt(localStorage.getItem("simulated_new_sellers") || "0");
//         setLiveNewCustomers(storedNewCust);
//         setLiveNewSellers(storedNewSellers);
//     }, []);

//     const loadSellersFromStorage = () => {
//         const completeSellerData = JSON.parse(sessionStorage.getItem("completeSellerData") || "{}");
//         const sellerBasicInfo = JSON.parse(sessionStorage.getItem("sellerBasicInfo") || "{}");
//         const pendingSeller = JSON.parse(sessionStorage.getItem("pendingSeller") || "null");
        
//         if (completeSellerData.ownerName || sellerBasicInfo.ownerName || pendingSeller) {
//             let mergedData = {};
//             if (pendingSeller) {
//                 mergedData = pendingSeller;
//             } else {
//                 mergedData = { ...sellerBasicInfo, ...completeSellerData };
//             }
            
//             const newSeller = {
//                 id: "SEL-" + Math.floor(Math.random() * 1000),
//                 name: mergedData.storeName || mergedData.name || "New Store",
//                 owner: mergedData.ownerName || mergedData.owner || "Unknown",
//                 email: mergedData.contactInput || mergedData.email || "no-email@example.com",
//                 phone: mergedData.contactInput || mergedData.phone || "N/A",
//                 joinedDate: new Date().toLocaleDateString(),
//                 totalProductsListed: 0,
//                 itemsSold: 0,
//                 totalSalesValue: "0",
//                 wishlistCount: 0,
//                 cartCount: 0,
//                 successfulDeliveries: 0,
//                 status: mergedData.status || "Pending Approval",
//                 documents: {
//                     ownerName: mergedData.ownerName || mergedData.owner,
//                     storeName: mergedData.storeName || mergedData.name,
//                     mobile: mergedData.contactInput || mergedData.phone,
//                     email: mergedData.contactInput || mergedData.email,
//                     panNumber: mergedData.panNumber,
//                     gstin: mergedData.gstinNumber,
//                     bankAccount: mergedData.bankAccount,
//                     ifscCode: mergedData.ifscCode,
//                     gstCertImage: mergedData.gstinCert || "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500",
//                     panImage: mergedData.panCard || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500",
//                     selfieImage: mergedData.selfieImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
//                 }
//             };
            
//             setSellersList([newSeller]);
//             localStorage.setItem("adminSellersList", JSON.stringify([newSeller]));
//         } else {
//             const storedSellers = localStorage.getItem("adminSellersList");
//             if (storedSellers) {
//                 setSellersList(JSON.parse(storedSellers));
//             } else {
//                 setSellersList([
//                     {
//                         id: "SEL-001",
//                         name: "Nexus Retail Hub",
//                         owner: "Ali Khan",
//                         email: "contact@nexusretail.in",
//                         phone: "+91 9410668898",
//                         joinedDate: "02 June 2026",
//                         totalProductsListed: 0,
//                         itemsSold: 0,
//                         totalSalesValue: "0",
//                         wishlistCount: 0,
//                         cartCount: 0,
//                         successfulDeliveries: 0,
//                         status: "Pending Approval",
//                         documents: {
//                             ownerName: "Ali Khan",
//                             storeName: "Nexus Retail Hub",
//                             mobile: "+91 9410668898",
//                             email: "contact@nexusretail.in",
//                             panNumber: "AAAPA1234B",
//                             gstin: "09AAAAA1234A1Z5",
//                             bankAccount: "306625890098452",
//                             ifscCode: "KUNG2590548",
//                             gstCertImage: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500",
//                             panImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500",
//                             selfieImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
//                         }
//                     }
//                 ]);
//             }
//         }
//     };

//     const statsHistory = {
//         customers: {
//             today: 0 + liveNewCustomers,
//             month: 0 + liveNewCustomers,
//             year: 0 + liveNewCustomers,
//             total: 0 + liveNewCustomers
//         },
//         sellers: {
//             today: 0 + liveNewSellers,
//             month: 0 + liveNewSellers,
//             year: 0 + liveNewSellers,
//             total: sellersList.length + liveNewSellers
//         },
//         earnings: { grossSales: "0", totalEarning: "0", adminCommission: "0" }
//     };

//     const sellerSalesHistory = { today: 0, month: 0, year: 0, total: 0 };
//     const adminIncomeHistory = { today: 0, month: 0, year: 0, total: 0 };
//     const [incomingOrders, setIncomingOrders] = useState([]);
//     const [customersList, setCustomersList] = useState([]);

//     const [fraudCases, setFraudCases] = useState([
//         { id: "DISP-404", store: "Nexus Retail Hub", customer: "Rahul Verma", reason: "Customer returned an empty box instead of a smartwatch", value: "4,500", proofImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300", status: "Under Review" }
//     ]);

//     const [sellerHelpRequests, setSellerHelpRequests] = useState([
//         { id: "REQ-701", store: "Nexus Retail Hub", topic: "Listing Error Node", issue: "Hello Admin, we are facing an internal server exception code 503 while pushing our bulk inventory catalog sheets inside the Electronics & Headphones segment. Please unlock our vendor upload band.", date: "Today", status: "Open" }
//     ]);

//     const [customerHelpRequests, setCustomerHelpRequests] = useState([
//         { id: "TKT-551", name: "Rohan Das", topic: "Fulfillment Delay", issue: "Respected Azora Support, my preorder package for the noise-canceling headphone hasn't tracking details updated yet. Either expedite transit dispatch or process full refund to my wallet node.", date: "Yesterday", status: "Pending Action" }
//     ]);

//     const handleFraudDecision = (id, decision) => {
//         alert(`Dispute closed! Verdict: ${decision === "refund" ? "Refund issued to merchant" : "Claim dismissed"}`);
//         setFraudCases(fraudCases.filter(c => c.id !== id));
//     };

//     const handleSellerApproval = (id, action) => {
//         if (action === "approve") {
//             alert("✅ Seller account has been Approved & Activated!");
//             setSellersList(sellersList.map(s => 
//                 s.id === id ? { ...s, status: "Approved" } : s
//             ));
//             localStorage.setItem("sellerApprovalStatus", "approved");
//             const approvedSeller = sellersList.find(s => s.id === id);
//             if (approvedSeller) {
//                 localStorage.setItem("approvedSeller", JSON.stringify(approvedSeller));
//             }
//         } else if (action === "reject") {
//             alert("❌ Seller account has been Rejected!");
//             setSellersList(sellersList.map(s => 
//                 s.id === id ? { ...s, status: "Rejected" } : s
//             ));
//             localStorage.setItem("sellerApprovalStatus", "rejected");
//         }
//         setReviewingSellerDocs(null);
//     };

//     const resetSimulationCounters = () => {
//         localStorage.setItem("simulated_new_customers", "0");
//         localStorage.setItem("simulated_new_sellers", "0");
//         setLiveNewCustomers(0);
//         setLiveNewSellers(0);
//         alert("डैशबोर्ड क्लीन! All test registration counters have been reset back to 0.");
//     };

//     return (
//         <div className="admin-dashboard-layout">
//             <aside className="admin-sidebar">
//                 <div className="admin-sidebar-brand">
//                     Azora<span>Control Room (Admin)</span>
//                 </div>
//                 <nav className="admin-sidebar-menu">
//                     <button className={`admin-menu-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => { setActiveTab("overview"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); }}><FaChartLine /> Global Statistics</button>
//                     <button className={`admin-menu-btn ${activeTab === "customers" ? "active" : ""}`} onClick={() => { setActiveTab("customers"); setSelectedCustomer(null); setViewingCustomerOrders(false); setReviewingSellerDocs(null); setSelectedSellerProfile(null); }}><FaUsers /> Customer Accounts Vault</button>
//                     <button className={`admin-menu-btn ${activeTab === "sellers" ? "active" : ""}`} onClick={() => { setActiveTab("sellers"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); }}><FaStore /> Sellers & Access Control</button>
//                     <button className={`admin-menu-btn ${activeTab === "frauds" ? "active" : ""}`} onClick={() => { setActiveTab("frauds"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); }}><FaGavel /> Fraud Court Center</button>
//                     <button className={`admin-menu-btn ${activeTab === "sellerHelp" ? "active" : ""}`} onClick={() => { setActiveTab("sellerHelp"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); setSelectedSellerHelp(null); }}><FaTools /> Seller Help Workspace</button>
//                     <button className={`admin-menu-btn ${activeTab === "custHelp" ? "active" : ""}`} onClick={() => { setActiveTab("custHelp"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); setSelectedCustHelp(null); }}><FaHeadset /> Customer Support Tickets</button>
//                 </nav>
//                 <button onClick={resetSimulationCounters} style={{ marginTop: "auto", background: "#334155", color: "white", border: "none", padding: "8px", borderRadius: "5px", fontSize: "0.75rem", cursor: "pointer", fontWeight: "bold" }}>
//                     🔄 Reset Test Counters
//                 </button>
//             </aside>

//             <main className="admin-main-content">
//                 <header className="admin-content-header">
//                     <h2>Azora Master Control Panel</h2>
//                     <p>Supreme authority dashboard to monitor accounts, verify catalogs, and stop marketplace frauds.</p>
//                 </header>

//                 {activeTab === "overview" && (
//                     <div className="admin-tab-content animate-fade">
//                         <h3 className="admin-block-title">📊 Time-Based Account Registration Tracker</h3>
//                         <div className="admin-time-tracker-grid">
//                             <div className="tracker-card customer-theme">
//                                 <div className="tracker-card-header"><FaUsers /> Customer Accounts Built</div>
//                                 <div className="tracker-row"><span>Today:</span> <b>+{statsHistory.customers.today} new</b></div>
//                                 <div className="tracker-row"><span>This Month:</span> <b>+{statsHistory.customers.month}</b></div>
//                                 <div className="tracker-row"><span>This Year:</span> <b>+{statsHistory.customers.year}</b></div>
//                                 <div className="tracker-footer-total">Total Customers: {statsHistory.customers.total}</div>
//                             </div>
//                             <div className="tracker-card seller-theme">
//                                 <div className="tracker-card-header"><FaStore /> Seller Partner Registrations</div>
//                                 <div className="tracker-row"><span>Today:</span> <b>+{statsHistory.sellers.today} stores</b></div>
//                                 <div className="tracker-row"><span>This Month:</span> <b>+{statsHistory.sellers.month}</b></div>
//                                 <div className="tracker-row"><span>This Year:</span> <b>+{statsHistory.sellers.year}</b></div>
//                                 <div className="tracker-footer-total">Total Active Sellers: {statsHistory.sellers.total}</div>
//                             </div>
//                         </div>

//                         <h3 className="admin-block-title" style={{ marginTop: "40px" }}>💰 Cumulative Marketplace Financials</h3>
//                         <div className="admin-time-tracker-grid">
//                             <div className="tracker-card money-green-theme">
//                                 <div className="tracker-card-header"><FaRupeeSign /> Total Gross Merchant Earnings</div>
//                                 <div className="tracker-row"><span>Gross Billed Value:</span> <b>₹{statsHistory.earnings.grossSales}</b></div>
//                                 <div className="tracker-row"><span>Net Disbursed to Sellers:</span> <b style={{ color: "#16a34a" }}>₹{statsHistory.earnings.totalEarning}</b></div>
//                                 <div className="tracker-footer-total">Active Liquid Merchant Wealth</div>
//                             </div>
//                             <div className="tracker-card money-blue-theme">
//                                 <div className="tracker-card-header"><FaUserShield /> Simple Net Commission (Flat)</div>
//                                 <div className="tracker-row"><span>Commission Rate:</span> <b>Category Wise (25% Less than Amazon)</b></div>
//                                 <div className="tracker-row"><span>Admin Revenue Pocketed:</span> <b style={{ color: "#2563eb" }}>₹{statsHistory.earnings.adminCommission}</b></div>
//                                 <div className="tracker-footer-total">Pure Profit Cleared</div>
//                             </div>
//                         </div>

//                         <h3 className="admin-block-title" style={{ marginTop: "40px" }}>📈 Real-Time Order Volumes & Admin Yield Tracks</h3>
//                         <div className="admin-time-tracker-grid">
//                             <div className="tracker-card" style={{ borderTop: "4px solid #ea580c" }}>
//                                 <div className="tracker-card-header" style={{ color: "#ea580c" }}><FaBoxes /> 5. Seller Total Product Sales Volumes</div>
//                                 <div className="tracker-row"><span>Today Product Sales:</span> <b style={{ color: "#ea580c" }}>{sellerSalesHistory.today} units sold</b></div>
//                                 <div className="tracker-row"><span>This Month Volume:</span> <b>{sellerSalesHistory.month} units</b></div>
//                                 <div className="tracker-row"><span>This Year Volume:</span> <b>{sellerSalesHistory.year} units</b></div>
//                                 <div className="tracker-footer-total" style={{ color: "#ea580c" }}>Cumulative Sales Stream: {sellerSalesHistory.total}</div>
//                             </div>
//                             <div className="tracker-card" style={{ borderTop: "4px solid #9333ea", backgroundColor: "#faf5ff" }}>
//                                 <div className="tracker-card-header" style={{ color: "#9333ea" }}><FaUserShield /> 6. Admin Net Commission Income Revenue</div>
//                                 <div className="tracker-row"><span>Today Income Net:</span> <b style={{ color: "#9333ea" }}>₹{adminIncomeHistory.today}</b></div>
//                                 <div className="tracker-row"><span>This Month Net Profit:</span> <b>₹{adminIncomeHistory.month}</b></div>
//                                 <div className="tracker-row"><span>This Year Net Profit:</span> <b>₹{adminIncomeHistory.year}</b></div>
//                                 <div className="tracker-footer-total" style={{ color: "#9333ea" }}>Total Revenue Banked: ₹{adminIncomeHistory.total}</div>
//                             </div>
//                         </div>

//                         <div className="admin-section-card animate-fade" style={{ marginTop: "40px" }}>
//                             <h3 className="admin-block-title">💸 Global Order Ledger & Automatic Commission Split Auditor</h3>
//                             <p style={{ fontSize: "0.82rem", color: "#555", marginTop: "-15px", marginBottom: "20px" }}>
//                                 Live snapshot of product transactions with automatic flat deduction applied instantly per category nodes.
//                             </p>
//                             {incomingOrders.length === 0 ? (
//                                 <div className="no-pending-requests-box">
//                                     <h3>No Live Transactions Found!</h3>
//                                     <p>Platform ledger will automatically split values as soon as checkout operations trigger via consumer grid.</p>
//                                 </div>
//                             ) : (
//                                 <div className="table-responsive">
//                                     <table className="admin-master-table">
//                                         <thead>
//                                             <tr>
//                                                 <th>Order ID</th><th>Product & Category</th><th>Gross Billed</th><th>Azora Tech Fee</th><th>Net Payout (To Seller)</th><th>Gateway Status</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {incomingOrders.map((ord) => (
//                                                 <tr key={ord.id}>
//                                                     <td><b>{ord.id}</b></td>
//                                                     <td><div style={{ fontWeight: "bold" }}>{ord.productTitle}</div>
//                                                     <span style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "2px 6px", borderRadius: "3px" }}>{ord.category}</span></td>
//                                                     <td style={{ fontWeight: "700" }}>₹{ord.totalPrice}</td>
//                                                     <td style={{ color: "#dc2626", fontWeight: "600" }}>-₹{ord.azoraCutDeducted} ({ord.commissionPercentageUsed}%)</td>
//                                                     <td style={{ color: "#16a34a", fontWeight: "bold", fontSize: "1rem" }}>₹{ord.sellerNetPayout}</td>
//                                                     <td><span style={{ fontWeight: "800", fontSize: "0.8rem" }}>{ord.paymentMode}</span></td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "customers" && !selectedCustomer && (
//                     <div className="admin-tab-content animate-fade">
//                         <div className="admin-section-card">
//                             <h3 className="admin-block-title">👤 Customer Database Directory</h3>
//                             {customersList.length === 0 ? (
//                                 <div className="no-pending-requests-box">
//                                     <h3>No Registered Customers Yet</h3>
//                                     <p>The consumer vault is clean. New signups will dynamically stack here once active.</p>
//                                 </div>
//                             ) : (
//                                 <div className="table-responsive">
//                                     <table className="admin-master-table">
//                                         <thead>
//                                             <tr><th>Customer ID</th><th>Name</th><th>Email Address</th><th>Phone Number</th><th>Status</th><th>Action</th></tr>
//                                         </thead>
//                                         <tbody>
//                                             {customersList.map((cust) => (
//                                                 <tr key={cust.id}>
//                                                     <td><b>{cust.id}</b></td>
//                                                     <td className="bold-text">{cust.name}</td>
//                                                     <td>{cust.email}</td>
//                                                     <td>{cust.phone}</td>
//                                                     <td><span className="admin-badge approved">{cust.accountStatus}</span></td>
//                                                     <td><button className="admin-action-btn view-profile" onClick={() => { setSelectedCustomer(cust); setViewingCustomerOrders(false); }}><FaEye /> View Full Profile</button></td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "sellers" && !reviewingSellerDocs && !selectedSellerProfile && (
//                     <div className="admin-tab-content animate-fade">
//                         <div className="admin-section-card">
//                             <h3 className="admin-block-title">🏢 Merchant Registration Control Hub</h3>
//                             <div className="table-responsive">
//                                 <table className="admin-master-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Seller ID</th>
//                                             <th>Company Name</th>
//                                             <th>Contact Email</th>
//                                             <th>Registration Status</th>
//                                             <th>Deep Profile</th>
//                                             <th>Verification Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {sellersList.map((seller) => (
//                                             <tr key={seller.id}>
//                                                 <td><b>{seller.id}</b></td>
//                                                 <td className="bold-text">{seller.name}</td>
//                                                 <td>{seller.email}</td>
//                                                 <td>
//                                                     <span className={`admin-badge ${
//                                                         seller.status === "Approved" ? "approved" : 
//                                                         seller.status === "Rejected" ? "rejected" : "pending-approval"
//                                                     }`}>
//                                                         {seller.status}
//                                                     </span>
//                                                 </td>
//                                                 <td>
//                                                     <button className="admin-action-btn view-profile" onClick={() => setSelectedSellerProfile(seller)}>
//                                                         <FaEye /> View Statistics
//                                                     </button>
//                                                 </td>
//                                                 <td>
//                                                     {seller.status === "Pending Approval" ? (
//                                                         <button className="admin-doc-review-btn" onClick={() => setReviewingSellerDocs(seller)}>
//                                                             <FaFileAlt /> Check Details
//                                                         </button>
//                                                     ) : (
//                                                         <div style={{ 
//                                                             display: "inline-block", 
//                                                             padding: "5px 12px", 
//                                                             borderRadius: "20px", 
//                                                             fontSize: "0.75rem", 
//                                                             fontWeight: "bold",
//                                                             backgroundColor: seller.status === "Approved" ? "#dcfce7" : "#fee2e2",
//                                                             color: seller.status === "Approved" ? "#16a34a" : "#dc2626"
//                                                         }}>
//                                                             {seller.status === "Approved" ? "✓ Approved" : "✗ Rejected"}
//                                                         </div>
//                                                     )}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {reviewingSellerDocs && (
//                     <div className="admin-tab-content animate-fade">
//                         <button className="admin-back-btn" onClick={() => setReviewingSellerDocs(null)}><FaArrowLeft /> Back to Merchant List</button>
//                         <div className="admin-doc-vault-container">
//                             <div className="vault-header">
//                                 <FaFileAlt className="vault-logo" style={{ color: "#0d9488" }} />
//                                 <div>
//                                     <h3>Azora Official Document Verification Vault</h3>
//                                     <h2>Reviewing Registration Request for "{reviewingSellerDocs.name}"</h2>
//                                     <p>Applicant Owner: <b>{reviewingSellerDocs.owner}</b> | Contact: {reviewingSellerDocs.phone}</p>
//                                 </div>
//                             </div>
//                             <h3 className="admin-block-title" style={{ fontSize: "1.1rem" }}>📝 Submitted Form Details (7 Sections)</h3>
//                             <div className="seller-submitted-info-grid">
//                                 <div className="info-box-item"><span>1. Owner Name:</span> <b>{reviewingSellerDocs.documents.ownerName || reviewingSellerDocs.owner}</b></div>
//                                 <div className="info-box-item"><span>2. Store/Shop Name:</span> <b>{reviewingSellerDocs.documents.storeName || reviewingSellerDocs.name}</b></div>
//                                 <div className="info-box-item"><span>3. Mobile Number:</span> <b>{reviewingSellerDocs.documents.mobile || reviewingSellerDocs.phone}</b></div>
//                                 <div className="info-box-item"><span>4. Gmail Address:</span> <b>{reviewingSellerDocs.documents.email || reviewingSellerDocs.email}</b></div>
//                                 <div className="info-box-item"><span>5. PAN Number:</span> <b style={{ fontFamily: "monospace" }}>{reviewingSellerDocs.documents.panNumber || "Not provided"}</b></div>
//                                 <div className="info-box-item"><span>6. GSTIN Number:</span> <b style={{ fontFamily: "monospace" }}>{reviewingSellerDocs.documents.gstin || "Not provided"}</b></div>
//                                 <div className="info-box-item"><span>7. Bank Account:</span> <b style={{ fontFamily: "monospace" }}>{reviewingSellerDocs.documents.bankAccount || "Not provided"}</b></div>
//                                 <div className="info-box-item"><span>8. Bank IFSC Code:</span> <b style={{ fontFamily: "monospace" }}>{reviewingSellerDocs.documents.ifscCode || "Not provided"}</b></div>
//                             </div>
//                             <h3 className="admin-block-title" style={{ fontSize: "1.1rem", marginTop: "30px" }}>📸 Submitted Biometric & Identity Assets (3 Options)</h3>
//                             <div className="vault-docs-grid">
//                                 <div className="doc-review-card">
//                                     <h4><FaFileAlt style={{ color: "#2563eb" }} /> 1. GSTIN Certificate</h4>
//                                     <div className="doc-image-preview-container">
//                                         <img src={reviewingSellerDocs.documents.gstCertImage} alt="GST" />
//                                         <button className="zoom-btn" onClick={() => window.open(reviewingSellerDocs.documents.gstCertImage, "_blank")}>Expand Photo</button>
//                                     </div>
//                                 </div>
//                                 <div className="doc-review-card">
//                                     <h4><FaIdCard style={{ color: "#0d9488" }} /> 2. PAN Card Copy</h4>
//                                     <div className="doc-image-preview-container">
//                                         <img src={reviewingSellerDocs.documents.panImage} alt="PAN" />
//                                         <button className="zoom-btn" onClick={() => window.open(reviewingSellerDocs.documents.panImage, "_blank")}>Expand Photo</button>
//                                     </div>
//                                 </div>
//                                 <div className="doc-review-card">
//                                     <h4><FaCamera style={{ color: "#ea580c" }} /> 3. Live Head-Rotation Selfie</h4>
//                                     <div className="doc-image-preview-container">
//                                         <img src={reviewingSellerDocs.documents.selfieImage} alt="Selfie" />
//                                         <button className="zoom-btn" onClick={() => window.open(reviewingSellerDocs.documents.selfieImage, "_blank")}>Expand Selfie Check</button>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="vault-judgment-footer">
//                                 <h3>Marketplace Quality Judgment Panel:</h3>
//                                 <div className="judgment-btn-row">
//                                     <button className="judgment-btn approve-btn" onClick={() => handleSellerApproval(reviewingSellerDocs.id, "approve")}>
//                                         <FaCheckCircle /> Approve Account
//                                     </button>
//                                     <button className="judgment-btn reject-btn" onClick={() => handleSellerApproval(reviewingSellerDocs.id, "reject")}>
//                                         <FaTimesCircle /> Reject Account
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "frauds" && (
//                     <div className="admin-tab-content animate-fade">
//                         <div className="admin-section-card">
//                             <h3 className="admin-block-title">⚖️ Anti-Fraud Dispute Tribunal & Return Court</h3>
//                             {fraudCases.length === 0 ? (
//                                 <div className="no-pending-requests-box"><h3>Zero Active Disputes!</h3><p>Marketplace transaction flow is safe and smooth.</p></div>
//                             ) : (
//                                 <div className="table-responsive">
//                                     <table className="admin-master-table">
//                                         <thead>
//                                             <tr><th>Proof Exhibit</th><th>Dispute Ticket</th><th>Filing Merchant</th><th>Accused Customer</th><th>Item Value</th><th>Action</th></tr>
//                                         </thead>
//                                         <tbody>
//                                             {fraudCases.map((c) => (
//                                                 <tr key={c.id}>
//                                                     <td><img src={c.proofImage} alt="Proof" style={{ width: "60px", height: "60px", borderRadius: "6px", objectFit: "cover", border: "2px solid #ef4444" }} /></td>
//                                                     <td><b style={{ color: "#ef4444" }}>{c.id}</b></td>
//                                                     <td className="bold-text">{c.store}</td>
//                                                     <td>{c.customer}</td>
//                                                     <td style={{ fontWeight: "bold", color: "#dc2626" }}>₹{c.value}</td>
//                                                     <td>
//                                                         <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
//                                                             <button className="admin-action-btn view-profile" style={{ backgroundColor: "#10b981", color: "white" }} onClick={() => handleFraudDecision(c.id, "refund")}>Refund Store</button>
//                                                             <button className="admin-table-btn reject" onClick={() => handleFraudDecision(c.id, "dismiss")}>Dismiss Case</button>
//                                                         </div>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {activeTab === "sellerHelp" && (
//                     <div className="admin-tab-content animate-fade">
//                         <div className="admin-section-card">
//                             <h3 className="admin-block-title">🛠️ Merchant Technical Help Desk Pipeline</h3>
//                             <div className="table-responsive">
//                                 <table className="admin-master-table">
//                                     <thead>
//                                         <tr><th>Ticket ID</th><th>Store Name</th><th>Reported Tech Grievance / Notes</th><th>Date Node</th><th>Status</th><th>Action</th></tr>
//                                     </thead>
//                                     <tbody>
//                                         {sellerHelpRequests.map((req) => (
//                                             <tr key={req.id}>
//                                                 <td><b>{req.id}</b></td>
//                                                 <td className="bold-text">{req.store}</td>
//                                                 <td style={{ maxWidth: "350px" }}>{req.issue}</td>
//                                                 <td>{req.date}</td>
//                                                 <td><span className="admin-badge pending-approval">{req.status}</span></td>
//                                                 <td><button className="admin-action-btn view-profile" onClick={() => setSelectedSellerHelp(req)}>👁️ View Details</button></td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                         {selectedSellerHelp && (
//                             <div className="admin-section-card animate-fade" style={{ marginTop: "20px", borderLeft: "4px solid #0f172a", background: "#f8fafc" }}>
//                                 <h4>📨 Full Message Body From Merchant: <u>{selectedSellerHelp.store}</u></h4>
//                                 <div style={{ background: "white", padding: "15px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem", lineHeight: "1.5", color: "#334155" }}>
//                                     {selectedSellerHelp.issue}
//                                 </div>
//                                 <button onClick={() => { alert("Response channel queued!"); setSelectedSellerHelp(null); }} className="admin-doc-review-btn" style={{ marginTop: "12px", background: "#0f172a", color: "white" }}>
//                                     Reply & Resolve Ticket
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}

//                 {activeTab === "custHelp" && (
//                     <div className="admin-tab-content animate-fade">
//                         <div className="admin-section-card">
//                             <h3 className="admin-block-title">📞 Consumer Support Escalation Matrix</h3>
//                             <div className="table-responsive">
//                                 <table className="admin-master-table">
//                                     <thead>
//                                         <tr><th>Ticket ID</th><th>Customer Name</th><th>Reported Claim Notes</th><th>Date Node</th><th>Fulfillment Status</th><th>Action</th></tr>
//                                     </thead>
//                                     <tbody>
//                                         {customerHelpRequests.map((tkt) => (
//                                             <tr key={tkt.id}>
//                                                 <td><b>{tkt.id}</b></td>
//                                                 <td className="bold-text">{tkt.name}</td>
//                                                 <td style={{ maxWidth: "350px" }}>{tkt.issue}</td>
//                                                 <td>{tkt.date}</td>
//                                                 <td><span className="admin-badge approved" style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}>{tkt.status}</span></td>
//                                                 <td><button className="admin-action-btn view-profile" onClick={() => setSelectedCustHelp(tkt)}>👁️ View Details</button></td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                         {selectedCustHelp && (
//                             <div className="admin-section-card animate-fade" style={{ marginTop: "20px", borderLeft: "4px solid #2563eb", background: "#f8fafc" }}>
//                                 <h4>📨 Full Grievance Notes From Consumer: <u>{selectedCustHelp.name}</u></h4>
//                                 <div style={{ background: "white", padding: "15px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem", lineHeight: "1.5", color: "#334155" }}>
//                                     {selectedCustHelp.issue}
//                                 </div>
//                                 <button onClick={() => { alert("Support note dispatched!"); setSelectedCustHelp(null); }} className="admin-doc-review-btn" style={{ marginTop: "12px", background: "#2563eb", color: "white", border: "none" }}>
//                                     Connect via Azora Chat
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import {
    FaChartLine, FaUsers, FaStore, FaGavel, FaEye,
    FaArrowLeft, FaKey, FaShoppingCart, FaRupeeSign, FaMapMarkerAlt,
    FaCheckCircle, FaTimesCircle, FaFileAlt, FaIdCard, FaCamera, FaListUl, FaInfoCircle,
    FaUserShield, FaBoxes, FaTools, FaHeadset, FaComments
} from "react-icons/fa";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [viewingCustomerOrders, setViewingCustomerOrders] = useState(false);
    const [reviewingSellerDocs, setReviewingSellerDocs] = useState(null);
    const [selectedSellerProfile, setSelectedSellerProfile] = useState(null);
    const [selectedSellerHelp, setSelectedSellerHelp] = useState(null);
    const [selectedCustHelp, setSelectedCustHelp] = useState(null);
    const [liveNewCustomers, setLiveNewCustomers] = useState(0);
    const [liveNewSellers, setLiveNewSellers] = useState(0);
    const [sellersList, setSellersList] = useState([]);

    useEffect(() => {
        loadSellersFromStorage();
        
        const storedNewCust = parseInt(localStorage.getItem("simulated_new_customers") || "0");
        const storedNewSellers = parseInt(localStorage.getItem("simulated_new_sellers") || "0");
        setLiveNewCustomers(storedNewCust);
        setLiveNewSellers(storedNewSellers);
    }, []);

    const loadSellersFromStorage = () => {
        const storedSellers = localStorage.getItem("adminSellersList");
        
        if (storedSellers) {
            const parsedSellers = JSON.parse(storedSellers);
            setSellersList(parsedSellers);
            console.log("✅ Loaded from localStorage:", parsedSellers);
            return;
        }
        
        const completeSellerData = JSON.parse(sessionStorage.getItem("completeSellerData") || "{}");
        const sellerBasicInfo = JSON.parse(sessionStorage.getItem("sellerBasicInfo") || "{}");
        const pendingSeller = JSON.parse(sessionStorage.getItem("pendingSeller") || "null");
        
        if (completeSellerData.ownerName || sellerBasicInfo.ownerName || pendingSeller) {
            let mergedData = {};
            if (pendingSeller) {
                mergedData = pendingSeller;
            } else {
                mergedData = { ...sellerBasicInfo, ...completeSellerData };
            }
            
            const newSeller = {
                id: "SEL-" + Math.floor(Math.random() * 1000),
                name: mergedData.storeName || mergedData.name || "New Store",
                owner: mergedData.ownerName || mergedData.owner || "Unknown",
                email: mergedData.contactInput || mergedData.email || "no-email@example.com",
                phone: mergedData.contactInput || mergedData.phone || "N/A",
                joinedDate: new Date().toLocaleDateString(),
                totalProductsListed: 0,
                itemsSold: 0,
                totalSalesValue: "0",
                wishlistCount: 0,
                cartCount: 0,
                successfulDeliveries: 0,
                status: "Pending Approval",
                documents: {
                    ownerName: mergedData.ownerName || mergedData.owner,
                    storeName: mergedData.storeName || mergedData.name,
                    mobile: mergedData.contactInput || mergedData.phone,
                    email: mergedData.contactInput || mergedData.email,
                    panNumber: mergedData.panNumber,
                    gstin: mergedData.gstinNumber,
                    bankAccount: mergedData.bankAccount,
                    ifscCode: mergedData.ifscCode,
                    gstCertImage: mergedData.gstinCert || "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500",
                    panImage: mergedData.panCard || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500",
                    selfieImage: mergedData.selfieImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                }
            };
            
            setSellersList([newSeller]);
            localStorage.setItem("adminSellersList", JSON.stringify([newSeller]));
        } else {
            setSellersList([
                {
                    id: "SEL-001",
                    name: "Nexus Retail Hub",
                    owner: "Ali Khan",
                    email: "contact@nexusretail.in",
                    phone: "+91 9410668898",
                    joinedDate: "02 June 2026",
                    totalProductsListed: 0,
                    itemsSold: 0,
                    totalSalesValue: "0",
                    wishlistCount: 0,
                    cartCount: 0,
                    successfulDeliveries: 0,
                    status: "Pending Approval",
                    documents: {
                        ownerName: "Ali Khan",
                        storeName: "Nexus Retail Hub",
                        mobile: "+91 9410668898",
                        email: "contact@nexusretail.in",
                        panNumber: "AAAPA1234B",
                        gstin: "09AAAAA1234A1Z5",
                        bankAccount: "306625890098452",
                        ifscCode: "KUNG2590548",
                        gstCertImage: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500",
                        panImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500",
                        selfieImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                    }
                }
            ]);
        }
    };

    const statsHistory = {
        customers: {
            today: 0 + liveNewCustomers,
            month: 0 + liveNewCustomers,
            year: 0 + liveNewCustomers,
            total: 0 + liveNewCustomers
        },
        sellers: {
            today: 0 + liveNewSellers,
            month: 0 + liveNewSellers,
            year: 0 + liveNewSellers,
            total: sellersList.length + liveNewSellers
        },
        earnings: { grossSales: "0", totalEarning: "0", adminCommission: "0" }
    };

    const sellerSalesHistory = { today: 0, month: 0, year: 0, total: 0 };
    const adminIncomeHistory = { today: 0, month: 0, year: 0, total: 0 };
    const [incomingOrders, setIncomingOrders] = useState([]);
    const [customersList, setCustomersList] = useState([]);

    const [fraudCases, setFraudCases] = useState([
        { id: "DISP-404", store: "Nexus Retail Hub", customer: "Rahul Verma", reason: "Customer returned an empty box instead of a smartwatch", value: "4,500", proofImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300", status: "Under Review" }
    ]);

    const [sellerHelpRequests, setSellerHelpRequests] = useState([
        { id: "REQ-701", store: "Nexus Retail Hub", topic: "Listing Error Node", issue: "Hello Admin, we are facing an internal server exception code 503 while pushing our bulk inventory catalog sheets inside the Electronics & Headphones segment. Please unlock our vendor upload band.", date: "Today", status: "Open" }
    ]);

    const [customerHelpRequests, setCustomerHelpRequests] = useState([
        { id: "TKT-551", name: "Rohan Das", topic: "Fulfillment Delay", issue: "Respected Azora Support, my preorder package for the noise-canceling headphone hasn't tracking details updated yet. Either expedite transit dispatch or process full refund to my wallet node.", date: "Yesterday", status: "Pending Action" }
    ]);

    const handleFraudDecision = (id, decision) => {
        alert(`Dispute closed! Verdict: ${decision === "refund" ? "Refund issued to merchant" : "Claim dismissed"}`);
        setFraudCases(fraudCases.filter(c => c.id !== id));
    };

    const handleSellerApproval = (id, action) => {
        if (action === "approve") {
            alert("✅ Seller account has been Approved & Activated!");
            const updatedList = sellersList.map(s => 
                s.id === id ? { ...s, status: "Approved" } : s
            );
            setSellersList(updatedList);
            localStorage.setItem("adminSellersList", JSON.stringify(updatedList));
            localStorage.setItem("sellerApprovalStatus", "approved");
        } else if (action === "reject") {
            alert("❌ Seller account has been Rejected!");
            const updatedList = sellersList.map(s => 
                s.id === id ? { ...s, status: "Rejected" } : s
            );
            setSellersList(updatedList);
            localStorage.setItem("adminSellersList", JSON.stringify(updatedList));
            localStorage.setItem("sellerApprovalStatus", "rejected");
        }
        setReviewingSellerDocs(null);
    };

    const resetSimulationCounters = () => {
        localStorage.setItem("simulated_new_customers", "0");
        localStorage.setItem("simulated_new_sellers", "0");
        setLiveNewCustomers(0);
        setLiveNewSellers(0);
        alert("डैशबोर्ड क्लीन! All test registration counters have been reset back to 0.");
    };

    return (
        <div className="admin-dashboard-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-brand">
                    Azora<span>Control Room (Admin)</span>
                </div>
                <nav className="admin-sidebar-menu">
                    <button className={`admin-menu-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => { setActiveTab("overview"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); }}><FaChartLine /> Global Statistics</button>
                    <button className={`admin-menu-btn ${activeTab === "customers" ? "active" : ""}`} onClick={() => { setActiveTab("customers"); setSelectedCustomer(null); setViewingCustomerOrders(false); setReviewingSellerDocs(null); setSelectedSellerProfile(null); }}><FaUsers /> Customer Accounts Vault</button>
                    <button className={`admin-menu-btn ${activeTab === "sellers" ? "active" : ""}`} onClick={() => { setActiveTab("sellers"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); }}><FaStore /> Sellers & Access Control</button>
                    <button className={`admin-menu-btn ${activeTab === "frauds" ? "active" : ""}`} onClick={() => { setActiveTab("frauds"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); }}><FaGavel /> Fraud Court Center</button>
                    <button className={`admin-menu-btn ${activeTab === "sellerHelp" ? "active" : ""}`} onClick={() => { setActiveTab("sellerHelp"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); setSelectedSellerHelp(null); }}><FaTools /> Seller Help Workspace</button>
                    <button className={`admin-menu-btn ${activeTab === "custHelp" ? "active" : ""}`} onClick={() => { setActiveTab("custHelp"); setSelectedCustomer(null); setReviewingSellerDocs(null); setSelectedSellerProfile(null); setSelectedCustHelp(null); }}><FaHeadset /> Customer Support Tickets</button>
                </nav>
                <button onClick={resetSimulationCounters} style={{ marginTop: "auto", background: "#334155", color: "white", border: "none", padding: "8px", borderRadius: "5px", fontSize: "0.75rem", cursor: "pointer", fontWeight: "bold" }}>
                    🔄 Reset Test Counters
                </button>
            </aside>

            <main className="admin-main-content">
                <header className="admin-content-header">
                    <h2>Azora Master Control Panel</h2>
                    <p>Supreme authority dashboard to monitor accounts, verify catalogs, and stop marketplace frauds.</p>
                </header>

                {activeTab === "overview" && (
                    <div className="admin-tab-content animate-fade">
                        <h3 className="admin-block-title">📊 Time-Based Account Registration Tracker</h3>
                        <div className="admin-time-tracker-grid">
                            <div className="tracker-card customer-theme">
                                <div className="tracker-card-header"><FaUsers /> Customer Accounts Built</div>
                                <div className="tracker-row"><span>Today:</span> <b>+{statsHistory.customers.today} new</b></div>
                                <div className="tracker-row"><span>This Month:</span> <b>+{statsHistory.customers.month}</b></div>
                                <div className="tracker-row"><span>This Year:</span> <b>+{statsHistory.customers.year}</b></div>
                                <div className="tracker-footer-total">Total Customers: {statsHistory.customers.total}</div>
                            </div>
                            <div className="tracker-card seller-theme">
                                <div className="tracker-card-header"><FaStore /> Seller Partner Registrations</div>
                                <div className="tracker-row"><span>Today:</span> <b>+{statsHistory.sellers.today} stores</b></div>
                                <div className="tracker-row"><span>This Month:</span> <b>+{statsHistory.sellers.month}</b></div>
                                <div className="tracker-row"><span>This Year:</span> <b>+{statsHistory.sellers.year}</b></div>
                                <div className="tracker-footer-total">Total Active Sellers: {statsHistory.sellers.total}</div>
                            </div>
                        </div>

                        <h3 className="admin-block-title" style={{ marginTop: "40px" }}>💰 Cumulative Marketplace Financials</h3>
                        <div className="admin-time-tracker-grid">
                            <div className="tracker-card money-green-theme">
                                <div className="tracker-card-header"><FaRupeeSign /> Total Gross Merchant Earnings</div>
                                <div className="tracker-row"><span>Gross Billed Value:</span> <b>₹{statsHistory.earnings.grossSales}</b></div>
                                <div className="tracker-row"><span>Net Disbursed to Sellers:</span> <b style={{ color: "#16a34a" }}>₹{statsHistory.earnings.totalEarning}</b></div>
                                <div className="tracker-footer-total">Active Liquid Merchant Wealth</div>
                            </div>
                            <div className="tracker-card money-blue-theme">
                                <div className="tracker-card-header"><FaUserShield /> Simple Net Commission (Flat)</div>
                                <div className="tracker-row"><span>Commission Rate:</span> <b>Category Wise (25% Less than Amazon)</b></div>
                                <div className="tracker-row"><span>Admin Revenue Pocketed:</span> <b style={{ color: "#2563eb" }}>₹{statsHistory.earnings.adminCommission}</b></div>
                                <div className="tracker-footer-total">Pure Profit Cleared</div>
                            </div>
                        </div>

                        <h3 className="admin-block-title" style={{ marginTop: "40px" }}>📈 Real-Time Order Volumes & Admin Yield Tracks</h3>
                        <div className="admin-time-tracker-grid">
                            <div className="tracker-card" style={{ borderTop: "4px solid #ea580c" }}>
                                <div className="tracker-card-header" style={{ color: "#ea580c" }}><FaBoxes /> 5. Seller Total Product Sales Volumes</div>
                                <div className="tracker-row"><span>Today Product Sales:</span> <b style={{ color: "#ea580c" }}>{sellerSalesHistory.today} units sold</b></div>
                                <div className="tracker-row"><span>This Month Volume:</span> <b>{sellerSalesHistory.month} units</b></div>
                                <div className="tracker-row"><span>This Year Volume:</span> <b>{sellerSalesHistory.year} units</b></div>
                                <div className="tracker-footer-total" style={{ color: "#ea580c" }}>Cumulative Sales Stream: {sellerSalesHistory.total}</div>
                            </div>
                            <div className="tracker-card" style={{ borderTop: "4px solid #9333ea", backgroundColor: "#faf5ff" }}>
                                <div className="tracker-card-header" style={{ color: "#9333ea" }}><FaUserShield /> 6. Admin Net Commission Income Revenue</div>
                                <div className="tracker-row"><span>Today Income Net:</span> <b style={{ color: "#9333ea" }}>₹{adminIncomeHistory.today}</b></div>
                                <div className="tracker-row"><span>This Month Net Profit:</span> <b>₹{adminIncomeHistory.month}</b></div>
                                <div className="tracker-row"><span>This Year Net Profit:</span> <b>₹{adminIncomeHistory.year}</b></div>
                                <div className="tracker-footer-total" style={{ color: "#9333ea" }}>Total Revenue Banked: ₹{adminIncomeHistory.total}</div>
                            </div>
                        </div>

                        <div className="admin-section-card animate-fade" style={{ marginTop: "40px" }}>
                            <h3 className="admin-block-title">💸 Global Order Ledger & Automatic Commission Split Auditor</h3>
                            <p style={{ fontSize: "0.82rem", color: "#555", marginTop: "-15px", marginBottom: "20px" }}>
                                Live snapshot of product transactions with automatic flat deduction applied instantly per category nodes.
                            </p>
                            {incomingOrders.length === 0 ? (
                                <div className="no-pending-requests-box">
                                    <h3>No Live Transactions Found!</h3>
                                    <p>Platform ledger will automatically split values as soon as checkout operations trigger via consumer grid.</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="admin-master-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th><th>Product & Category</th><th>Gross Billed</th><th>Azora Tech Fee</th><th>Net Payout (To Seller)</th><th>Gateway Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {incomingOrders.map((ord) => (
                                                <tr key={ord.id}>
                                                    <td><b>{ord.id}</b></td>
                                                    <td>
                                                        <div style={{ fontWeight: "bold" }}>{ord.productTitle}</div>
                                                        <span style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "2px 6px", borderRadius: "3px" }}>{ord.category}</span>
                                                    </td>
                                                    <td style={{ fontWeight: "700" }}>₹{ord.totalPrice}</td>
                                                    <td style={{ color: "#dc2626", fontWeight: "600" }}>-₹{ord.azoraCutDeducted} ({ord.commissionPercentageUsed}%)</td>
                                                    <td style={{ color: "#16a34a", fontWeight: "bold", fontSize: "1rem" }}>₹{ord.sellerNetPayout}</td>
                                                    <td><span style={{ fontWeight: "800", fontSize: "0.8rem" }}>{ord.paymentMode}</span></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "customers" && !selectedCustomer && (
                    <div className="admin-tab-content animate-fade">
                        <div className="admin-section-card">
                            <h3 className="admin-block-title">👤 Customer Database Directory</h3>
                            {customersList.length === 0 ? (
                                <div className="no-pending-requests-box">
                                    <h3>No Registered Customers Yet</h3>
                                    <p>The consumer vault is clean. New signups will dynamically stack here once active.</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="admin-master-table">
                                        <thead>
                                            <tr>
                                                <th>Customer ID</th>
                                                <th>Name</th>
                                                <th>Email Address</th>
                                                <th>Phone Number</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {customersList.map((cust) => (
                                                <tr key={cust.id}>
                                                    <td><b>{cust.id}</b></td>
                                                    <td className="bold-text">{cust.name}</td>
                                                    <td>{cust.email}</td>
                                                    <td>{cust.phone}</td>
                                                    <td><span className="admin-badge approved">{cust.accountStatus}</span></td>
                                                    <td><button className="admin-action-btn view-profile" onClick={() => { setSelectedCustomer(cust); setViewingCustomerOrders(false); }}><FaEye /> View Full Profile</button></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "sellers" && !reviewingSellerDocs && !selectedSellerProfile && (
                    <div className="admin-tab-content animate-fade">
                        <div className="admin-section-card">
                            <h3 className="admin-block-title">🏢 Merchant Registration Control Hub</h3>
                            <div className="table-responsive">
                                <table className="admin-master-table">
                                    <thead>
                                        <tr>
                                            <th>Seller ID</th>
                                            <th>Company Name</th>
                                            <th>Contact Email</th>
                                            <th>Registration Status</th>
                                            <th>Deep Profile</th>
                                            <th>Verification Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellersList.map((seller) => (
                                            <tr key={seller.id}>
                                                <td><b>{seller.id}</b></td>
                                                <td className="bold-text">{seller.name}</td>
                                                <td>{seller.email}</td>
                                                <td>
                                                    <span className={`admin-badge ${seller.status === "Approved" ? "approved" : seller.status === "Rejected" ? "rejected" : "pending-approval"}`}>
                                                        {seller.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="admin-action-btn view-profile" onClick={() => setSelectedSellerProfile(seller)}>
                                                        <FaEye /> View Statistics
                                                    </button>
                                                </td>
                                                <td>
                                                    {seller.status === "Pending Approval" ? (
                                                        <button className="admin-doc-review-btn" onClick={() => setReviewingSellerDocs(seller)}>
                                                            <FaFileAlt /> Check Details
                                                        </button>
                                                    ) : (
                                                        <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", backgroundColor: seller.status === "Approved" ? "#dcfce7" : "#fee2e2", color: seller.status === "Approved" ? "#16a34a" : "#dc2626" }}>
                                                            {seller.status === "Approved" ? "✓ Approved" : "✗ Rejected"}
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {reviewingSellerDocs && (
                    <div className="admin-tab-content animate-fade">
                        <button className="admin-back-btn" onClick={() => setReviewingSellerDocs(null)}><FaArrowLeft /> Back to Merchant List</button>
                        <div className="admin-doc-vault-container">
                            <div className="vault-header">
                                <FaFileAlt className="vault-logo" style={{ color: "#0d9488" }} />
                                <div>
                                    <h3>Azora Official Document Verification Vault</h3>
                                    <h2>Reviewing Registration Request for {reviewingSellerDocs.name}</h2>
                                    <p>Applicant Owner: <b>{reviewingSellerDocs.owner}</b> | Contact: {reviewingSellerDocs.phone}</p>
                                </div>
                            </div>
                            <h3 className="admin-block-title" style={{ fontSize: "1.1rem" }}>📝 Submitted Form Details (7 Sections)</h3>
                            <div className="seller-submitted-info-grid">
                                <div className="info-box-item"><span>1. Owner Name:</span> <b>{reviewingSellerDocs.documents.ownerName || reviewingSellerDocs.owner}</b></div>
                                <div className="info-box-item"><span>2. Store/Shop Name:</span> <b>{reviewingSellerDocs.documents.storeName || reviewingSellerDocs.name}</b></div>
                                <div className="info-box-item"><span>3. Mobile Number:</span> <b>{reviewingSellerDocs.documents.mobile || reviewingSellerDocs.phone}</b></div>
                                <div className="info-box-item"><span>4. Gmail Address:</span> <b>{reviewingSellerDocs.documents.email || reviewingSellerDocs.email}</b></div>
                                <div className="info-box-item"><span>5. PAN Number:</span> <b style={{ fontFamily: "monospace" }}>{reviewingSellerDocs.documents.panNumber || "Not provided"}</b></div>
                                <div className="info-box-item"><span>6. GSTIN Number:</span> <b style={{ fontFamily: "monospace" }}>{reviewingSellerDocs.documents.gstin || "Not provided"}</b></div>
                                <div className="info-box-item"><span>7. Bank Account:</span> <b style={{ fontFamily: "monospace" }}>{reviewingSellerDocs.documents.bankAccount || "Not provided"}</b></div>
                                <div className="info-box-item"><span>8. Bank IFSC Code:</span> <b style={{ fontFamily: "monospace" }}>{reviewingSellerDocs.documents.ifscCode || "Not provided"}</b></div>
                            </div>
                            <h3 className="admin-block-title" style={{ fontSize: "1.1rem", marginTop: "30px" }}>📸 Submitted Biometric & Identity Assets (3 Options)</h3>
                            <div className="vault-docs-grid">
                                <div className="doc-review-card">
                                    <h4><FaFileAlt style={{ color: "#2563eb" }} /> 1. GSTIN Certificate</h4>
                                    <div className="doc-image-preview-container">
                                        <img src={reviewingSellerDocs.documents.gstCertImage} alt="GST" />
                                        <button className="zoom-btn" onClick={() => window.open(reviewingSellerDocs.documents.gstCertImage, "_blank")}>Expand Photo</button>
                                    </div>
                                </div>
                                <div className="doc-review-card">
                                    <h4><FaIdCard style={{ color: "#0d9488" }} /> 2. PAN Card Copy</h4>
                                    <div className="doc-image-preview-container">
                                        <img src={reviewingSellerDocs.documents.panImage} alt="PAN" />
                                        <button className="zoom-btn" onClick={() => window.open(reviewingSellerDocs.documents.panImage, "_blank")}>Expand Photo</button>
                                    </div>
                                </div>
                                <div className="doc-review-card">
                                    <h4><FaCamera style={{ color: "#ea580c" }} /> 3. Live Head-Rotation Selfie</h4>
                                    <div className="doc-image-preview-container">
                                        <img src={reviewingSellerDocs.documents.selfieImage} alt="Selfie" />
                                        <button className="zoom-btn" onClick={() => window.open(reviewingSellerDocs.documents.selfieImage, "_blank")}>Expand Selfie Check</button>
                                    </div>
                                </div>
                            </div>
                            <div className="vault-judgment-footer">
                                <h3>Marketplace Quality Judgment Panel:</h3>
                                <div className="judgment-btn-row">
                                    <button className="judgment-btn approve-btn" onClick={() => handleSellerApproval(reviewingSellerDocs.id, "approve")}>
                                        <FaCheckCircle /> Approve Account
                                    </button>
                                    <button className="judgment-btn reject-btn" onClick={() => handleSellerApproval(reviewingSellerDocs.id, "reject")}>
                                        <FaTimesCircle /> Reject Account
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "frauds" && (
                    <div className="admin-tab-content animate-fade">
                        <div className="admin-section-card">
                            <h3 className="admin-block-title">⚖️ Anti-Fraud Dispute Tribunal & Return Court</h3>
                            {fraudCases.length === 0 ? (
                                <div className="no-pending-requests-box"><h3>Zero Active Disputes!</h3><p>Marketplace transaction flow is safe and smooth.</p></div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="admin-master-table">
                                        <thead>
                                            <tr>
                                                <th>Proof Exhibit</th>
                                                <th>Dispute Ticket</th>
                                                <th>Filing Merchant</th>
                                                <th>Accused Customer</th>
                                                <th>Item Value</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fraudCases.map((c) => (
                                                <tr key={c.id}>
                                                    <td><img src={c.proofImage} alt="Proof" style={{ width: "60px", height: "60px", borderRadius: "6px", objectFit: "cover", border: "2px solid #ef4444" }} /></td>
                                                    <td><b style={{ color: "#ef4444" }}>{c.id}</b></td>
                                                    <td className="bold-text">{c.store}</td>
                                                    <td>{c.customer}</td>
                                                    <td style={{ fontWeight: "bold", color: "#dc2626" }}>₹{c.value}</td>
                                                    <td>
                                                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                            <button className="admin-action-btn view-profile" style={{ backgroundColor: "#10b981", color: "white" }} onClick={() => handleFraudDecision(c.id, "refund")}>Refund Store</button>
                                                            <button className="admin-table-btn reject" onClick={() => handleFraudDecision(c.id, "dismiss")}>Dismiss Case</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "sellerHelp" && (
                    <div className="admin-tab-content animate-fade">
                        <div className="admin-section-card">
                            <h3 className="admin-block-title">🛠️ Merchant Technical Help Desk Pipeline</h3>
                            <div className="table-responsive">
                                <table className="admin-master-table">
                                    <thead>
                                        <tr>
                                            <th>Ticket ID</th>
                                            <th>Store Name</th>
                                            <th>Reported Tech Grievance / Notes</th>
                                            <th>Date Node</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellerHelpRequests.map((req) => (
                                            <tr key={req.id}>
                                                <td><b>{req.id}</b></td>
                                                <td className="bold-text">{req.store}</td>
                                                <td style={{ maxWidth: "350px" }}>{req.issue}</td>
                                                <td>{req.date}</td>
                                                <td><span className="admin-badge pending-approval">{req.status}</span></td>
                                                <td>
                                                    <button className="admin-action-btn view-profile" onClick={() => setSelectedSellerHelp(req)}>
                                                        👁️ View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {selectedSellerHelp && (
                            <div className="admin-section-card animate-fade" style={{ marginTop: "20px", borderLeft: "4px solid #0f172a", background: "#f8fafc" }}>
                                <h4>📨 Full Message Body From Merchant: <u>{selectedSellerHelp.store}</u></h4>
                                <div style={{ background: "white", padding: "15px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem", lineHeight: "1.5", color: "#334155" }}>
                                    {selectedSellerHelp.issue}
                                </div>
                                <button onClick={() => { alert("Response channel queued!"); setSelectedSellerHelp(null); }} className="admin-doc-review-btn" style={{ marginTop: "12px", background: "#0f172a", color: "white" }}>
                                    Reply & Resolve Ticket
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "custHelp" && (
                    <div className="admin-tab-content animate-fade">
                        <div className="admin-section-card">
                            <h3 className="admin-block-title">📞 Consumer Support Escalation Matrix</h3>
                            <div className="table-responsive">
                                <table className="admin-master-table">
                                    <thead>
                                        <tr>
                                            <th>Ticket ID</th>
                                            <th>Customer Name</th>
                                            <th>Reported Claim Notes</th>
                                            <th>Date Node</th>
                                            <th>Fulfillment Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customerHelpRequests.map((tkt) => (
                                            <tr key={tkt.id}>
                                                <td><b>{tkt.id}</b></td>
                                                <td className="bold-text">{tkt.name}</td>
                                                <td style={{ maxWidth: "350px" }}>{tkt.issue}</td>
                                                <td>{tkt.date}</td>
                                                <td><span className="admin-badge approved" style={{ backgroundColor: "#fee2e2", color: "#991b1b" }}>{tkt.status}</span></td>
                                                <td>
                                                    <button className="admin-action-btn view-profile" onClick={() => setSelectedCustHelp(tkt)}>
                                                        👁️ View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {selectedCustHelp && (
                            <div className="admin-section-card animate-fade" style={{ marginTop: "20px", borderLeft: "4px solid #2563eb", background: "#f8fafc" }}>
                                <h4>📨 Full Grievance Notes From Consumer: <u>{selectedCustHelp.name}</u></h4>
                                <div style={{ background: "white", padding: "15px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "0.9rem", lineHeight: "1.5", color: "#334155" }}>
                                    {selectedCustHelp.issue}
                                </div>
                                <button onClick={() => { alert("Support note dispatched!"); setSelectedCustHelp(null); }} className="admin-doc-review-btn" style={{ marginTop: "12px", background: "#2563eb", color: "white", border: "none" }}>
                                    Connect via Azora Chat
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;