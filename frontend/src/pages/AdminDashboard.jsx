import React, { useState, useEffect } from "react";
import {
    FaChartLine, FaUsers, FaStore, FaGavel, FaEye,
    FaArrowLeft, FaKey, FaShoppingCart, FaRupeeSign, FaMapMarkerAlt,
    FaCheckCircle, FaTimesCircle, FaFileAlt, FaIdCard, FaCamera, FaListUl, FaInfoCircle,
    FaUserShield, FaBoxes, FaTools, FaHeadset, FaComments, FaMoneyBillWave, FaCalendarDay, FaCalendarAlt, FaChartBar
} from "react-icons/fa";

// ==================== GLOBAL STATISTICS COMPONENT (6 BOXES) ====================
const GlobalStatistics = ({
    totalCustomers = 1,
    todayCustomers = 0,
    thisMonthCustomers = 30,
    thisYearCustomers = 2890,
    totalSellers = 3,
    todaySellers = 0,
    thisMonthSellers = 28,
    thisYearSellers = 145,
    totalGrossEarnings = "19,09,570",
    grossBilledValue = "19,09,570",
    netDisbursedToSellers = "17,18,613",
    commissionRate = "10% (Flat)",
    totalCommissionEarned = "1,90,957",
    categoryWise = "25% Less than Amazon",
    pureProfit = "1,90,957",
    todaySales = "45,200",
    thisMonthSales = "3,25,600",
    thisYearSales = "18,42,900",
    totalSalesAllTime = "45,80,000",
    todayCommission = "4,520",
    thisMonthCommission = "32,560",
    thisYearCommission = "1,84,290",
    totalCommissionAllTime = "4,58,000"
}) => {
    return (
        <div className="global-stats-container">
            <style>{`
                .global-stats-container { width: 100%; }
                .stats-two-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                @media (max-width: 768px) {
                    .stats-two-grid { grid-template-columns: 1fr; gap: 1rem; }
                }
                .stats-tracker-card {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .stats-tracker-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
                }
                .stats-tracker-card-header {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }
                .customer-header { color: #2563eb; }
                .seller-header { color: #0d9488; }
                .financial-header { color: #f59e0b; }
                .commission-header { color: #8b5cf6; }
                .sales-header { color: #ef4444; }
                .income-header { color: #06b6d4; }
                .stats-tracker-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.85rem;
                }
                .stats-tracker-footer {
                    margin-top: 0.8rem;
                    padding-top: 0.8rem;
                    border-top: 1px solid #e2e8f0;
                    font-weight: bold;
                }
                .text-muted { color: #64748b; }
                .text-success { color: #10b981; }
                .border-left-orange { border-left: 4px solid #f59e0b; }
                .border-left-purple { border-left: 4px solid #8b5cf6; }
                .border-left-red { border-left: 4px solid #ef4444; }
                .border-left-cyan { border-left: 4px solid #06b6d4; }
                .admin-section-card {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .admin-block-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #0f172a;
                    margin-bottom: 1rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
            `}</style>

            {/* BOX 1 & 2 - Customer + Seller Stats */}
            <div className="stats-two-grid">
                <div className="stats-tracker-card">
                    <div className="stats-tracker-card-header customer-header">
                        <FaUsers /> Customer Accounts Built
                    </div>
                    <div className="stats-tracker-row"><span>Today:</span> <b>+{todayCustomers} new</b></div>
                    <div className="stats-tracker-row"><span>This Month:</span> <b>+{thisMonthCustomers}</b></div>
                    <div className="stats-tracker-row"><span>This Year:</span> <b>+{thisYearCustomers}</b></div>
                    <div className="stats-tracker-footer">Total Customers: {totalCustomers}</div>
                </div>

                <div className="stats-tracker-card">
                    <div className="stats-tracker-card-header seller-header">
                        <FaStore /> Seller Partner Registrations
                    </div>
                    <div className="stats-tracker-row"><span>Today:</span> <b>+{todaySellers} stores</b></div>
                    <div className="stats-tracker-row"><span>This Month:</span> <b>+{thisMonthSellers}</b></div>
                    <div className="stats-tracker-row"><span>This Year:</span> <b>+{thisYearSellers}</b></div>
                    <div className="stats-tracker-footer">Total Active Sellers: {totalSellers}</div>
                </div>
            </div>

            {/* BOX 3 & 4 - Financial Stats */}
            <div className="stats-two-grid">
                <div className="stats-tracker-card border-left-orange">
                    <div className="stats-tracker-card-header financial-header">
                        <FaMoneyBillWave /> Cumulative Marketplace Financials
                    </div>
                    <div className="stats-tracker-row"><span>Total Gross Merchant Earnings:</span> <b>₹{totalGrossEarnings}</b></div>
                    <div className="stats-tracker-row"><span>Gross Billed Value:</span> <b>₹{grossBilledValue}</b></div>
                    <div className="stats-tracker-row"><span>Net Disbursed to Sellers:</span> <b>₹{netDisbursedToSellers}</b></div>
                    <div className="stats-tracker-footer text-muted">Active Liquid Merchant Wealth</div>
                </div>

                <div className="stats-tracker-card border-left-purple">
                    <div className="stats-tracker-card-header commission-header">
                        <FaChartLine /> Administrative Net Commission (Flat)
                    </div>
                    <div className="stats-tracker-row"><span>Commission Rate:</span> <b>{commissionRate}</b></div>
                    <div className="stats-tracker-row"><span>Total Commission Earned:</span> <b>₹{totalCommissionEarned}</b></div>
                    <div className="stats-tracker-row"><span>Category Wise:</span> <b>{categoryWise}</b></div>
                    <div className="stats-tracker-footer text-success">Pure Profit Cleared: ₹{pureProfit}</div>
                </div>
            </div>

            {/* BOX 5 & 6 - Sales & Commission Breakdown */}
            <div className="stats-two-grid">
                <div className="stats-tracker-card border-left-red">
                    <div className="stats-tracker-card-header sales-header">
                        <FaShoppingCart /> Total Sales (Order Value)
                    </div>
                    <div className="stats-tracker-row"><span>Today:</span> <b>₹{todaySales}</b></div>
                    <div className="stats-tracker-row"><span>This Month:</span> <b>₹{thisMonthSales}</b></div>
                    <div className="stats-tracker-row"><span>This Year:</span> <b>₹{thisYearSales}</b></div>
                    <div className="stats-tracker-footer">Total Sales (All Time): ₹{totalSalesAllTime}</div>
                </div>

                <div className="stats-tracker-card border-left-cyan">
                    <div className="stats-tracker-card-header income-header">
                        <FaMoneyBillWave /> Admin Commission Income (After Cut)
                    </div>
                    <div className="stats-tracker-row"><span>Today:</span> <b>₹{todayCommission}</b></div>
                    <div className="stats-tracker-row"><span>This Month:</span> <b>₹{thisMonthCommission}</b></div>
                    <div className="stats-tracker-row"><span>This Year:</span> <b>₹{thisYearCommission}</b></div>
                    <div className="stats-tracker-footer">Total Commission Earned: ₹{totalCommissionAllTime}</div>
                </div>
            </div>

            {/* Global Order Ledger Section */}
            <div className="admin-section-card">
                <h3 className="admin-block-title">
                    <FaChartBar /> Global Order Ledger & Automatic Commission Split Auditor
                </h3>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: 0 }}>
                    Live snapshot of product transactions with automatic flat deduction applied instantly per category nodes.
                </p>
            </div>
        </div>
    );
};
// ==================== END OF GLOBAL STATISTICS COMPONENT ====================

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("overview");
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [viewingCustomerOrders, setViewingCustomerOrders] = useState(false);
    const [reviewingSellerDocs, setReviewingSellerDocs] = useState(null);
    const [selectedSellerProfile, setSelectedSellerProfile] = useState(null);
    const [selectedSellerHelp, setSelectedSellerHelp] = useState(null);
    const [selectedCustHelp, setSelectedCustHelp] = useState(null);
    const [selectedSellerOrders, setSelectedSellerOrders] = useState(null);
    const [liveNewCustomers, setLiveNewCustomers] = useState(0);
    const [liveNewSellers, setLiveNewSellers] = useState(0);
    const [sellersList, setSellersList] = useState([]);
    const [customersList, setCustomersList] = useState([]);

    // ✅ Function to load customers and count new ones
    const loadCustomersFromStorage = () => {
        const storedCustomers = localStorage.getItem("customersList");
        let customers = [];
        if (storedCustomers) {
            customers = JSON.parse(storedCustomers);
            setCustomersList(customers);
            console.log("✅ Customers loaded from localStorage:", customers);
        } else {
            console.log("📋 No customers found in localStorage");
        }

        const today = new Date().toLocaleDateString();
        const todayNewCustomers = customers.filter(c => c.joinedDate === today).length;

        localStorage.setItem("simulated_new_customers", todayNewCustomers.toString());
        setLiveNewCustomers(todayNewCustomers);

        return customers;
    };

    // ✅ Function to load sellers and count new ones
    const loadSellersFromStorage = () => {
        const storedSellers = localStorage.getItem("adminSellersList");
        let sellers = [];

        if (storedSellers) {
            sellers = JSON.parse(storedSellers);
            setSellersList(sellers);
            console.log("✅ Loaded from localStorage:", sellers);
        } else {
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
                    email: mergedData.email || "N/A",
                    phone: mergedData.phone || "N/A",
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
                        mobile: mergedData.phone || "N/A",
                        email: mergedData.email || "N/A",
                        panNumber: mergedData.panNumber,
                        gstin: mergedData.gstinNumber,
                        bankAccount: mergedData.bankAccount,
                        ifscCode: mergedData.ifscCode,
                        gstCertImage: mergedData.gstinCert || "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500",
                        panImage: mergedData.panCard || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500",
                        selfieImage: mergedData.selfieImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
                    }
                };

                sellers = [newSeller];
                setSellersList(sellers);
                localStorage.setItem("adminSellersList", JSON.stringify(sellers));
            } else {
                sellers = [
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
                ];
                setSellersList(sellers);
                localStorage.setItem("adminSellersList", JSON.stringify(sellers));
            }
        }

        const today = new Date().toLocaleDateString();
        const todayNewSellers = sellers.filter(s => s.joinedDate === today).length;
        localStorage.setItem("simulated_new_sellers", todayNewSellers.toString());
        setLiveNewSellers(todayNewSellers);

        return sellers;
    };

    // ✅ Real-time storage event listener for cross-tab updates
    useEffect(() => {
        loadSellersFromStorage();
        loadCustomersFromStorage();

        const handleStorageChange = (e) => {
            if (e.key === "customersList") {
                loadCustomersFromStorage();
            }
            if (e.key === "adminSellersList") {
                loadSellersFromStorage();
            }
            if (e.key === "simulated_new_customers") {
                setLiveNewCustomers(parseInt(e.newValue || "0"));
            }
            if (e.key === "simulated_new_sellers") {
                setLiveNewSellers(parseInt(e.newValue || "0"));
            }
        };

        window.addEventListener("storage", handleStorageChange);

        const interval = setInterval(() => {
            loadCustomersFromStorage();
            loadSellersFromStorage();
        }, 5000);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    // ==================== GLOBAL STATISTICS DATA ====================
    const totalCustomers = customersList.length;
    const totalSellers = sellersList.length;
    const pendingApprovals = sellersList.filter(s => s.status === "Pending Approval").length;
    const activeSellers = sellersList.filter(s => s.status === "Approved").length;

    const todayDate = new Date().toLocaleDateString();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const todayNewCustomersCount = customersList.filter(c => c.joinedDate === todayDate).length;
    const todayNewSellersCount = sellersList.filter(s => s.joinedDate === todayDate).length;

    const thisMonthNewCustomers = customersList.filter(c => {
        const date = new Date(c.joinedDate);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    const thisYearNewCustomers = customersList.filter(c => {
        const date = new Date(c.joinedDate);
        return date.getFullYear() === currentYear;
    }).length;

    const thisMonthNewSellers = sellersList.filter(s => {
        const date = new Date(s.joinedDate);
        return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    const thisYearNewSellers = sellersList.filter(s => {
        const date = new Date(s.joinedDate);
        return date.getFullYear() === currentYear;
    }).length;

    const statsHistory = {
        customers: {
            today: todayNewCustomersCount,
            month: thisMonthNewCustomers,
            year: thisYearNewCustomers,
            total: totalCustomers
        },
        sellers: {
            today: todayNewSellersCount,
            month: thisMonthNewSellers,
            year: thisYearNewSellers,
            total: totalSellers
        },
        earnings: { grossSales: "0", totalEarning: "0", adminCommission: "0" }
    };

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
         const updatedList = sellersList.map(s =>
         s.id === id ? { ...s, status: action === "approve" ? "Approved" : "Rejected" } : s
         );
         setSellersList(updatedList);
         localStorage.setItem("adminSellersList", JSON.stringify(updatedList));

         // ✅ Find the approved/rejected seller
         const updatedSeller = updatedList.find(s => s.id === id);

         if (action === "approve") {
             alert("✅ Seller account has been Approved & Activated!");
             localStorage.setItem("sellerApprovalStatus", "approved");
             // ✅ Update pendingSeller status so pending page can detect
             if (updatedSeller) {
                 localStorage.setItem("pendingSeller", JSON.stringify(updatedSeller));
             }
         } else {
             alert("❌ Seller account has been Rejected!");
             localStorage.setItem("sellerApprovalStatus", "rejected");
             if (updatedSeller) {
                 localStorage.setItem("pendingSeller", JSON.stringify(updatedSeller));
             }
         }

         setReviewingSellerDocs(null);
     };
    // const handleSellerApproval = (id, action) => {
    //     const updatedList = sellersList.map(s =>
    //         s.id === id ? { ...s, status: action === "approve" ? "Approved" : "Rejected" } : s
    //     );
    //     setSellersList(updatedList);
    //     localStorage.setItem("adminSellersList", JSON.stringify(updatedList));

    //     // ✅ Sirf adminSellersList update karo - sellerApprovalStatus MAT use karo
    //     const updatedSeller = updatedList.find(s => s.id === id);
    //     if (updatedSeller) {
    //         localStorage.setItem("pendingSeller", JSON.stringify(updatedSeller));
    //     }

    //     if (action === "approve") {
    //         alert("✅ Seller account has been Approved & Activated!");
    //     } else {
    //         alert("❌ Seller account has been Rejected!");
    //     }

    //     setReviewingSellerDocs(null);
    // };

    const resetSimulationCounters = () => {
        localStorage.setItem("simulated_new_customers", "0");
        localStorage.setItem("simulated_new_sellers", "0");
        setLiveNewCustomers(0);
        setLiveNewSellers(0);
        alert("डैशबोर्ड क्लीन! All test registration counters have been reset back to 0.");
    };

    return (
        <div className="admin-dashboard-layout">
            <style>{`
                .admin-dashboard-layout {
                    display: flex;
                    min-height: 100vh;
                    background: #f1f5f9;
                }
                .admin-sidebar {
                    width: 280px;
                    background: #0f172a;
                    color: white;
                    display: flex;
                    flex-direction: column;
                    padding: 1.5rem;
                    position: sticky;
                    top: 0;
                    height: 100vh;
                }
                .admin-sidebar-brand {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #334155;
                }
                .admin-sidebar-brand span {
                    display: block;
                    font-size: 0.7rem;
                    color: #94a3b8;
                    font-weight: normal;
                }
                .admin-sidebar-menu {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    flex: 1;
                }
                .admin-menu-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.75rem 1rem;
                    background: transparent;
                    border: none;
                    color: #cbd5e1;
                    font-size: 0.9rem;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.2s;
                    width: 100%;
                    text-align: left;
                }
                .admin-menu-btn:hover {
                    background: #1e293b;
                    color: white;
                }
                .admin-menu-btn.active {
                    background: #1e293b;
                    color: #38bdf8;
                }
                .admin-main-content {
                    flex: 1;
                    padding: 1.5rem;
                    overflow-y: auto;
                }
                .admin-content-header {
                    margin-bottom: 1.5rem;
                }
                .admin-content-header h2 {
                    font-size: 1.5rem;
                    color: #0f172a;
                    margin: 0 0 0.3rem 0;
                }
                .admin-content-header p {
                    color: #64748b;
                    font-size: 0.85rem;
                    margin: 0;
                }
                .admin-tab-content {
                    animation: fadeIn 0.3s ease;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .admin-block-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #0f172a;
                    margin-bottom: 1rem;
                }
                .admin-section-card {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                }
                .admin-master-table {
                    width: 100%;
                    border-collapse: collapse;
                }
                .admin-master-table th,
                .admin-master-table td {
                    padding: 0.75rem;
                    text-align: left;
                    border-bottom: 1px solid #e2e8f0;
                }
                .admin-master-table th {
                    background: #f8fafc;
                    font-weight: 600;
                    color: #0f172a;
                }
                .admin-badge {
                    display: inline-block;
                    padding: 0.2rem 0.6rem;
                    border-radius: 20px;
                    font-size: 0.7rem;
                    font-weight: 600;
                }
                .admin-badge.approved { background: #dcfce7; color: #16a34a; }
                .admin-badge.pending-approval { background: #fef3c7; color: #d97706; }
                .admin-badge.rejected { background: #fee2e2; color: #dc2626; }
                .admin-action-btn {
                    padding: 0.3rem 0.7rem;
                    border: none;
                    border-radius: 6px;
                    font-size: 0.7rem;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .admin-action-btn.view-profile {
                    background: #e0e7ff;
                    color: #4338ca;
                }
                .admin-back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #f1f5f9;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    cursor: pointer;
                    margin-bottom: 1rem;
                    font-size: 0.85rem;
                }
                .admin-doc-vault-container {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                }
                .vault-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }
                .seller-submitted-info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .info-box-item {
                    background: #f8fafc;
                    padding: 0.8rem;
                    border-radius: 10px;
                }
                .info-box-item span {
                    font-size: 0.7rem;
                    color: #64748b;
                    display: block;
                    margin-bottom: 0.3rem;
                }
                .vault-docs-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 1.5rem;
                    margin-top: 1rem;
                }
                .doc-review-card {
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 1rem;
                    text-align: center;
                }
                .doc-image-preview-container img {
                    width: 100%;
                    height: 150px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                .zoom-btn {
                    margin-top: 0.5rem;
                    padding: 0.3rem 0.8rem;
                    background: #0f172a;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.7rem;
                }
                .vault-judgment-footer {
                    margin-top: 1.5rem;
                    padding-top: 1rem;
                    border-top: 1px solid #e2e8f0;
                }
                .judgment-btn-row {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                .judgment-btn {
                    padding: 0.6rem 1.2rem;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .judgment-btn.approve-btn {
                    background: #10b981;
                    color: white;
                }
                .judgment-btn.reject-btn {
                    background: #ef4444;
                    color: white;
                }
                .no-pending-requests-box {
                    text-align: center;
                    padding: 2rem;
                    color: #64748b;
                }
                .table-responsive {
                    overflow-x: auto;
                }
                .admin-doc-review-btn {
                    background: #fef3c7;
                    border: none;
                    padding: 0.3rem 0.7rem;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.7rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.3rem;
                }
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                }
                .modal-content {
                    background: white;
                    border-radius: 16px;
                    padding: 1.5rem;
                    max-width: 500px;
                    width: 90%;
                    max-height: 80vh;
                    overflow: auto;
                }
            `}</style>

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
                        <GlobalStatistics
                            totalCustomers={statsHistory.customers.total}
                            todayCustomers={statsHistory.customers.today}
                            thisMonthCustomers={statsHistory.customers.month}
                            thisYearCustomers={statsHistory.customers.year}
                            totalSellers={statsHistory.sellers.total}
                            todaySellers={statsHistory.sellers.today}
                            thisMonthSellers={statsHistory.sellers.month}
                            thisYearSellers={statsHistory.sellers.year}
                            totalGrossEarnings="19,09,570"
                            grossBilledValue="19,09,570"
                            netDisbursedToSellers="17,18,613"
                            commissionRate="10% (Flat)"
                            totalCommissionEarned="1,90,957"
                            categoryWise="25% Less than Amazon"
                            pureProfit="1,90,957"
                            todaySales="45,200"
                            thisMonthSales="3,25,600"
                            thisYearSales="18,42,900"
                            totalSalesAllTime="45,80,000"
                            todayCommission="4,520"
                            thisMonthCommission="32,560"
                            thisYearCommission="1,84,290"
                            totalCommissionAllTime="4,58,000"
                        />
                    </div>
                )}

                {/* ✅ CUSTOMER TABLE - Email aur Phone alag columns */}
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
                                                    <td>{cust.email || "N/A"}</td>
                                                    <td>{cust.phone || "N/A"}</td>
                                                    <td><span className="admin-badge approved">{cust.accountStatus || "Active"}</span></td>
                                                    <td>
                                                        <button className="admin-action-btn view-profile" onClick={() => { setSelectedCustomer(cust); setViewingCustomerOrders(false); }}>
                                                            <FaEye /> View Full Profile
                                                        </button>
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

                {/* ✅ CUSTOMER PROFILE - With View Orders Button in 7th Section */}
                {activeTab === "customers" && selectedCustomer && !viewingCustomerOrders && (
                    <div className="admin-tab-content animate-fade">
                        <button className="admin-back-btn" onClick={() => setSelectedCustomer(null)}>
                            <FaArrowLeft /> Back to Customers List
                        </button>
                        <div className="admin-doc-vault-container">
                            <div className="vault-header">
                                <div className="custom-avatar-circle"><FaUsers /></div>
                                <div>
                                    <h2>Customer Name: {selectedCustomer.name}</h2>
                                    <p>Account Token: <b>{selectedCustomer.id}</b></p>
                                </div>
                            </div>
                            <div className="seller-submitted-info-grid">
                                <div className="info-box-item"><span>1. Full Name:</span> <b>{selectedCustomer.name}</b></div>
                                <div className="info-box-item"><span>2. Email Address:</span> <b>{selectedCustomer.email || "N/A"}</b></div>
                                <div className="info-box-item"><span>3. Mobile Number:</span> <b>{selectedCustomer.phone || "N/A"}</b></div>
                                <div className="info-box-item"><span>4. Account Status:</span> <b style={{ color: "#16a34a" }}>{selectedCustomer.accountStatus || "Active"}</b></div>
                                <div className="info-box-item"><span>5. Current Password:</span> <b style={{ color: "#d97706", fontFamily: "monospace" }}>{selectedCustomer.currentPassword || "••••••"}</b></div>
                                <div className="info-box-item"><span>6. Joined Date:</span> <b>{selectedCustomer.joinedDate || "N/A"}</b></div>
                                {/* ✅ View Orders Button added here */}
                                <div className="info-box-item">
                                    <span>7. Total Orders Placed:</span>
                                    <b>{selectedCustomer.totalOrdersPlaced || 0}</b>
                                    <button
                                        className="admin-action-btn"
                                        style={{ background: "#8b5cf6", color: "white", padding: "0.3rem 0.7rem", borderRadius: "6px", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.3rem", marginLeft: "10px" }}
                                        onClick={() => setViewingCustomerOrders(true)}
                                    >
                                        <FaShoppingCart /> View Orders
                                    </button>
                                </div>
                                <div className="info-box-item"><span>8. Total Wallet Spent:</span> <b>₹{selectedCustomer.totalWalletSpent || "0"}</b></div>
                            </div>
                            <div className="customer-full-address-panel" style={{ marginTop: "20px" }}>
                                <h4><FaMapMarkerAlt /> Customer Shipping Address:</h4>
                                <div className="address-box-txt">{selectedCustomer.shippingAddress || "No address added yet"}</div>
                            </div>
                        </div>
                    </div>
                )}

                {selectedSellerProfile && (
                    <div className="admin-tab-content animate-fade">
                        <button className="admin-back-btn" onClick={() => setSelectedSellerProfile(null)}>
                            <FaArrowLeft /> Back to Sellers List
                        </button>
                        <div className="admin-doc-vault-container">
                            <div className="vault-header">
                                <FaStore className="vault-logo" style={{ color: "#0d9488", fontSize: "2rem" }} />
                                <div>
                                    <h3>Seller Profile Details</h3>
                                    <h2>{selectedSellerProfile.name}</h2>
                                    <p>Seller ID: <b>{selectedSellerProfile.id}</b> | Status: <span className={`admin-badge ${selectedSellerProfile.status === "Approved" ? "approved" : "pending-approval"}`}>{selectedSellerProfile.status}</span></p>
                                </div>
                            </div>
                            <h3 className="admin-block-title" style={{ fontSize: "1.1rem" }}>📝 Business Details</h3>
                            <div className="seller-submitted-info-grid">
                                <div className="info-box-item"><span>Owner Name:</span> <b>{selectedSellerProfile.owner}</b></div>
                                <div className="info-box-item"><span>Store Name:</span> <b>{selectedSellerProfile.name}</b></div>
                                <div className="info-box-item"><span>Email:</span> <b>{selectedSellerProfile.email}</b></div>
                                <div className="info-box-item"><span>Phone:</span> <b>{selectedSellerProfile.phone}</b></div>
                                <div className="info-box-item"><span>Joined Date:</span> <b>{selectedSellerProfile.joinedDate}</b></div>
                            </div>
                            <h3 className="admin-block-title" style={{ fontSize: "1.1rem", marginTop: "20px" }}>📄 Document Details</h3>
                            <div className="seller-submitted-info-grid">
                                <div className="info-box-item"><span>PAN Number:</span> <b style={{ fontFamily: "monospace" }}>{selectedSellerProfile.documents?.panNumber || "Not provided"}</b></div>
                                <div className="info-box-item"><span>GSTIN Number:</span> <b style={{ fontFamily: "monospace" }}>{selectedSellerProfile.documents?.gstin || "Not provided"}</b></div>
                                <div className="info-box-item"><span>Bank Account:</span> <b style={{ fontFamily: "monospace" }}>{selectedSellerProfile.documents?.bankAccount || "Not provided"}</b></div>
                                <div className="info-box-item"><span>IFSC Code:</span> <b style={{ fontFamily: "monospace" }}>{selectedSellerProfile.documents?.ifscCode || "Not provided"}</b></div>
                            </div>
                            <h3 className="admin-block-title" style={{ fontSize: "1.1rem", marginTop: "20px" }}>📸 Documents Images</h3>
                            <div className="vault-docs-grid">
                                <div className="doc-review-card">
                                    <h4>GSTIN Certificate</h4>
                                    <div className="doc-image-preview-container">
                                        <img src={selectedSellerProfile.documents?.gstCertImage || "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=500"} alt="GST" />
                                        <button className="zoom-btn" onClick={() => window.open(selectedSellerProfile.documents?.gstCertImage, "_blank")}>Expand</button>
                                    </div>
                                </div>
                                <div className="doc-review-card">
                                    <h4>PAN Card</h4>
                                    <div className="doc-image-preview-container">
                                        <img src={selectedSellerProfile.documents?.panImage || "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500"} alt="PAN" />
                                        <button className="zoom-btn" onClick={() => window.open(selectedSellerProfile.documents?.panImage, "_blank")}>Expand</button>
                                    </div>
                                </div>
                                <div className="doc-review-card">
                                    <h4>Live Selfie</h4>
                                    <div className="doc-image-preview-container">
                                        <img src={selectedSellerProfile.documents?.selfieImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"} alt="Selfie" />
                                        <button className="zoom-btn" onClick={() => window.open(selectedSellerProfile.documents?.selfieImage, "_blank")}>Expand</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ SELLER TABLE - Email aur Phone alag columns (Customer jaisa) */}
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
                                            <th>Email Address</th>
                                            <th>Phone Number</th>
                                            <th>Registration Status</th>
                                            <th>Deep Profile</th>
                                            <th>Verification Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sellersList.map((seller) => {
                                            let statusDisplay = null;
                                            if (seller.status === "Pending Approval") {
                                                statusDisplay = (
                                                    <button className="admin-doc-review-btn" onClick={() => setReviewingSellerDocs(seller)}>
                                                        <FaFileAlt /> Check Details
                                                    </button>
                                                );
                                            } else if (seller.status === "Approved") {
                                                statusDisplay = (
                                                    <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", backgroundColor: "#dcfce7", color: "#16a34a" }}>
                                                        ✓ Approved
                                                    </div>
                                                );
                                            } else if (seller.status === "Rejected") {
                                                statusDisplay = (
                                                    <div style={{ display: "inline-block", padding: "5px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold", backgroundColor: "#fee2e2", color: "#dc2626" }}>
                                                        ✗ Rejected
                                                    </div>
                                                );
                                            }

                                            return (
                                                <tr key={seller.id}>
                                                    <td><b>{seller.id}</b></td>
                                                    <td className="bold-text">{seller.name}</td>
                                                    <td>{seller.email || "N/A"}</td>   {/* ✅ Email column */}
                                                    <td>{seller.phone || "N/A"}</td>    {/* ✅ Phone column */}
                                                    <td>
                                                        <span className={`admin-badge ${seller.status === "Approved" ? "approved" :
                                                            seller.status === "Rejected" ? "rejected" : "pending-approval"
                                                            }`}>
                                                            {seller.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <button className="admin-action-btn view-profile" onClick={() => setSelectedSellerProfile(seller)}>
                                                            <FaEye /> View Statistics
                                                        </button>
                                                    </td>
                                                    <td>{statusDisplay}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* ✅ Orders Modal Popup for Seller (Kept for reference) */}
                {selectedSellerOrders && (
                    <div className="modal-overlay" onClick={() => setSelectedSellerOrders(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                                <h3 style={{ margin: 0 }}>📦 Orders - {selectedSellerOrders.name}</h3>
                                <button onClick={() => setSelectedSellerOrders(null)} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer" }}>×</button>
                            </div>
                            <div className="seller-submitted-info-grid">
                                <div className="info-box-item"><span>Total Products Listed</span><b>{selectedSellerOrders.totalProductsListed || 0}</b></div>
                                <div className="info-box-item"><span>Items Sold</span><b>{selectedSellerOrders.itemsSold || 0}</b></div>
                                <div className="info-box-item"><span>Total Sales Value</span><b>₹{selectedSellerOrders.totalSalesValue || "0"}</b></div>
                                <div className="info-box-item"><span>Successful Deliveries</span><b>{selectedSellerOrders.successfulDeliveries || 0}</b></div>
                                <div className="info-box-item"><span>Wishlist Count</span><b>{selectedSellerOrders.wishlistCount || 0}</b></div>
                                <div className="info-box-item"><span>Cart Count</span><b>{selectedSellerOrders.cartCount || 0}</b></div>
                            </div>
                            <button className="judgment-btn approve-btn" onClick={() => setSelectedSellerOrders(null)} style={{ marginTop: "1rem", width: "100%" }}>Close</button>
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
                                    <h2>Reviewing Registration Request for "{reviewingSellerDocs.name}"</h2>
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
                            {fraudCases.map((fraud) => (
                                <div key={fraud.id} className="tracker-card" style={{ marginBottom: "1rem", background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                                    <p><b>Case ID:</b> {fraud.id}</p>
                                    <p><b>Store:</b> {fraud.store}</p>
                                    <p><b>Customer:</b> {fraud.customer}</p>
                                    <p><b>Reason:</b> {fraud.reason}</p>
                                    <p><b>Value:</b> ₹{fraud.value}</p>
                                    <div className="judgment-btn-row">
                                        <button className="judgment-btn approve-btn" onClick={() => handleFraudDecision(fraud.id, "refund")}>Refund Merchant</button>
                                        <button className="judgment-btn reject-btn" onClick={() => handleFraudDecision(fraud.id, "dismiss")}>Dismiss Claim</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "sellerHelp" && (
                    <div className="admin-tab-content animate-fade">
                        <div className="admin-section-card">
                            <h3 className="admin-block-title">🛠️ Merchant Technical Help Desk Pipeline</h3>
                            {sellerHelpRequests.map((req) => (
                                <div key={req.id} className="tracker-card" style={{ marginBottom: "1rem", background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                                    <p><b>Ticket ID:</b> {req.id} | <b>Store:</b> {req.store}</p>
                                    <p><b>Topic:</b> {req.topic}</p>
                                    <p><b>Issue:</b> {req.issue}</p>
                                    <p><b>Date:</b> {req.date} | <b>Status:</b> {req.status}</p>
                                    <button className="judgment-btn approve-btn" style={{ padding: "0.3rem 0.8rem", fontSize: "0.75rem" }}>Mark Resolved</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "custHelp" && (
                    <div className="admin-tab-content animate-fade">
                        <div className="admin-section-card">
                            <h3 className="admin-block-title">📞 Consumer Support Escalation Matrix</h3>
                            {customerHelpRequests.map((ticket) => (
                                <div key={ticket.id} className="tracker-card" style={{ marginBottom: "1rem", background: "white", borderRadius: "16px", padding: "1.5rem", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                                    <p><b>Ticket ID:</b> {ticket.id} | <b>Customer:</b> {ticket.name}</p>
                                    <p><b>Topic:</b> {ticket.topic}</p>
                                    <p><b>Issue:</b> {ticket.issue}</p>
                                    <p><b>Date:</b> {ticket.date} | <b>Status:</b> {ticket.status}</p>
                                    <button className="judgment-btn approve-btn" style={{ padding: "0.3rem 0.8rem", fontSize: "0.75rem" }}>Respond & Close</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;