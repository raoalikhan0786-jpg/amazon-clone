// // import React, { useState } from "react";
// // import { FaBoxOpen, FaPlusCircle, FaDolly, FaRupeeSign, FaCloudUploadAlt, FaTrashAlt, FaEdit, FaShippingFast, FaQuestionCircle, FaEnvelope, FaUndoAlt, FaEye, FaExclamationTriangle } from "react-icons/fa";

// // const SellerDashboard = () => {
// //     // एक्टिव टैब स्टेट (Overview, Add Product, Manage Orders, या Returns Refunds)
// //     const [activeTab, setActiveTab] = useState("overview");

// //     // फॉर्म स्टेट
// //     const [productData, setProductData] = useState({
// //         title: "",
// //         price: "",
// //         category: "Electronics",
// //         stock: "",
// //         description: "",
// //         image: ""
// //     });

// //     // डमी इन्वेंटरी डेटा
// //     const [inventory, setInventory] = useState([
// //         { id: 1, title: "Azora Wireless Headphones", price: "2999", stock: 45, category: "Electronics" },
// //         { id: 2, title: "Sport Smart Watch v2", price: "4999", stock: 12, category: "Fashion" }
// //     ]);

// //     // डमी ऑर्डर्स डेटा
// //     const [orders, setOrders] = useState([
// //         { id: "ORD-9982", customer: "Amit Sharma", product: "Azora Wireless Headphones", qty: 1, total: "2999", address: "H.No 45, Saket, New Delhi - 110017", status: "Pending" },
// //         { id: "ORD-4410", customer: "Rahul Verma", product: "Sport Smart Watch v2", qty: 2, total: "9998", address: "Sector 62, Noida, UP - 201301", status: "Shipped" }
// //     ]);

// //     // डमी रिटर्न्स डेटा (एंटी-फ्रॉड इमेज के साथ)
// //     const [returns, setReturns] = useState([
// //         {
// //             id: "RET-1024",
// //             customer: "Pooja Malhotra",
// //             product: "Azora Wireless Headphones",
// //             qty: 1,
// //             refundAmount: "2999",
// //             reason: "Defective/Not working properly",
// //             status: "Return Requested",
// //             returnedProductImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
// //         }
// //     ]);

// //     const handleInputChange = (e) => {
// //         setProductData({ ...productData, [e.target.name]: e.target.value });
// //     };

// //     const handleFormSubmit = (e) => {
// //         e.preventDefault();
// //         const newProduct = { id: Date.now(), ...productData };
// //         setInventory([newProduct, ...inventory]);
// //         alert("Product Uploaded Successfully!");
// //         setProductData({ title: "", price: "", category: "Electronics", stock: "", description: "", image: "" });
// //         setActiveTab("overview");
// //     };

// //     const handleDeleteProduct = (id) => {
// //         if (window.confirm("Are you sure you want to delete this product?")) {
// //             setInventory(inventory.filter(item => item.id !== id));
// //         }
// //     };

// //     const handleEditProduct = (id) => {
// //         const product = inventory.find(item => item.id === id);
// //         const newPrice = prompt(`Enter new price for "${product.title}":`, product.price);
// //         const newStock = prompt(`Enter new stock quantity:`, product.stock);
// //         if (newPrice !== null && newStock !== null) {
// //             setInventory(inventory.map(item => item.id === id ? { ...item, price: newPrice, stock: parseInt(newStock) || 0 } : item));
// //         }
// //     };

// //     const handleStatusChange = (orderId, newStatus) => {
// //         setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
// //     };

// //     const handleReturnAction = (id, action) => {
// //         alert(`Return request ${action}ed successfully!`);
// //         setReturns(returns.map(ret => ret.id === id ? { ...ret, status: action === "Accept" ? "Refund Approved" : "Return Rejected" } : ret));
// //     };

// //     const handleReportFraud = (id, productTitle) => {
// //         const text = prompt("Security Alert! Please enter the proof of fraud:");
// //         if (text) {
// //             alert(`Fraud Reported! Refund has been frozen for verification.`);
// //             setReturns(returns.map(ret => ret.id === id ? { ...ret, status: "Fraud Disputed (Frozen)" } : ret));
// //         }
// //     };

// //     return (
// //         <div className="seller-dashboard-layout">
// //             {/* साइडबार मेनू */}
// //             <aside className="seller-sidebar">
// //                 <div className="seller-sidebar-brand">
// //                     Azora<span>seller central</span>
// //                 </div>
// //                 <nav className="seller-sidebar-menu">
// //                     <button className={`sidebar-menu-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}><FaBoxOpen /> Dashboard Overview</button>
// //                     <button className={`sidebar-menu-btn ${activeTab === "add-product" ? "active" : ""}`} onClick={() => setActiveTab("add-product")}><FaPlusCircle /> Add New Product</button>
// //                     <button className={`sidebar-menu-btn ${activeTab === "manage-orders" ? "active" : ""}`} onClick={() => setActiveTab("manage-orders")}><FaShippingFast /> Manage Orders</button>
// //                     <button className={`sidebar-menu-btn ${activeTab === "returns-refunds" ? "active" : ""}`} onClick={() => setActiveTab("returns-refunds")}><FaUndoAlt /> Returns & Refunds</button>
// //                     <button className={`sidebar-menu-btn ${activeTab === "help-support" ? "active" : ""}`} onClick={() => setActiveTab("help-support")}><FaQuestionCircle /> Help & Support</button>
// //                 </nav>
// //             </aside>

// //             {/* मुख्य कंटेंट */}
// //             <main className="seller-main-content">
// //                 <header className="seller-content-header">
// //                     <h2>Welcome, Seller Partner</h2>
// //                     <p>Manage your business, inventory, and sales payout from one dashboard.</p>
// //                 </header>

// //                 {/* TAB 1: Overview */}
// //                 {activeTab === "overview" && (
// //                     <div className="seller-tab-content animate-fade">
// //                         <div className="seller-stats-grid">
// //                             <div className="stat-card"><div className="stat-icon yellow"><FaRupeeSign /></div><div className="stat-info"><h3>₹12,997.00</h3><p>Total Sales</p></div></div>
// //                             <div className="stat-card"><div className="stat-icon teal"><FaDolly /></div><div className="stat-info"><h3>{orders.filter(o => o.status === "Pending").length}</h3><p>Pending Orders</p></div></div>
// //                             <div className="stat-card"><div className="stat-icon blue"><FaBoxOpen /></div><div className="stat-info"><h3>{inventory.length}</h3><p>Active Listings</p></div></div>
// //                         </div>
// //                         <div className="seller-inventory-section">
// //                             <h3 className="section-block-title">Manage Inventory</h3>
// //                             <div className="table-responsive">
// //                                 <table className="seller-inventory-table">
// //                                     <thead><tr><th>Product Details</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr></thead>
// //                                     <tbody>
// //                                         {inventory.map((item) => (
// //                                             <tr key={item.id}>
// //                                                 <td className="prod-title-cell">{item.title}</td><td>{item.category}</td><td className="price-cell">₹{item.price}</td>
// //                                                 <td><span className={`stock-badge ${item.stock > 0 ? "in-stock" : "out-of-stock"}`}>{item.stock > 0 ? `${item.stock} Available` : "Out of Stock"}</span></td>
// //                                                 <td>
// //                                                     <div className="seller-action-btn-group">
// //                                                         <button className="seller-action-btn edit" onClick={() => handleEditProduct(item.id)}><FaEdit /> Edit</button>
// //                                                         <button className="seller-action-btn delete" onClick={() => handleDeleteProduct(item.id)}><FaTrashAlt /> Delete</button>
// //                                                     </div>
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                     </tbody>
// //                                 </table>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* TAB 2: Add Product */}
// //                 {activeTab === "add-product" && (
// //                     <div className="seller-tab-content animate-fade">
// //                         <div className="seller-form-card">
// //                             <h3 className="section-block-title">Add a Product to Azora Catalog</h3>
// //                             <form onSubmit={handleFormSubmit} className="seller-add-product-form">
// //                                 <div className="dashboard-form-row"><div className="dashboard-form-group"><label>Product Title</label><input type="text" name="title" value={productData.title} onChange={handleInputChange} required /></div></div>
// //                                 <div className="dashboard-form-row two-col">
// //                                     <div className="dashboard-form-group"><label>Price (INR)</label><input type="number" name="price" value={productData.price} onChange={handleInputChange} required /></div>
// //                                     <div className="dashboard-form-group"><label>Stock Quantity</label><input type="number" name="stock" value={productData.stock} onChange={handleInputChange} required /></div>
// //                                 </div>
// //                                 <div className="dashboard-form-row two-col">
// //                                     <div className="dashboard-form-group"><label>Category</label><select name="category" value={productData.category} onChange={handleInputChange}><option value="Electronics">Electronics</option><option value="Fashion">Fashion</option></select></div>
// //                                     <div className="dashboard-form-group"><label>Image URL</label><input type="text" name="image" value={productData.image} onChange={handleInputChange} required /></div>
// //                                 </div>
// //                                 <div className="dashboard-form-row"><div className="dashboard-form-group"><label>Description</label><textarea name="description" value={productData.description} onChange={handleInputChange} rows="4" required></textarea></div></div>
// //                                 <button type="submit" className="seller-submit-pula-btn"><FaCloudUploadAlt /> List Product on Azora</button>
// //                             </form>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* TAB 3: Manage Orders */}
// //                 {activeTab === "manage-orders" && (
// //                     <div className="seller-tab-content animate-fade">
// //                         <div className="seller-inventory-section">
// //                             <h3 className="section-block-title">Customer Orders Panel</h3>
// //                             <div className="table-responsive">
// //                                 <table className="seller-inventory-table">
// //                                     <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Price</th><th>Status</th><th>Action</th></tr></thead>
// //                                     <tbody>
// //                                         {orders.map((order) => (
// //                                             <tr key={order.id}>
// //                                                 <td><b>{order.id}</b></td><td><div>{order.customer}</div><div style={{ fontSize: "11px", color: "#666" }}>{order.address}</div></td><td>{order.product}</td><td className="price-cell">₹{order.total}</td>
// //                                                 <td><span className={`order-status-label ${order.status.toLowerCase()}`}>{order.status}</span></td>
// //                                                 <td><select className="order-status-select-dropdown" value={order.status} onChange={(e) => handleStatusChange(order.id, e.target.value)}><option value="Pending">Pending</option><option value="Shipped">Shipped</option><option value="Delivered">Delivered</option></select></td>
// //                                             </tr>
// //                                         ))}
// //                                     </tbody>
// //                                 </table>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* TAB 4: Returns & Refunds (सुरक्षित एंटी-फ्रॉड स्क्रीन) */}
// //                 {activeTab === "returns-refunds" && (
// //                     <div className="seller-tab-content animate-fade">
// //                         <div className="seller-inventory-section">
// //                             <h3 className="section-block-title">📦 Customer Returns & Fraud Control Center</h3>
// //                             <div className="table-responsive">
// //                                 <table className="seller-inventory-table">
// //                                     <thead>
// //                                         <tr>
// //                                             <th>Return ID</th>
// //                                             <th>Customer</th>
// //                                             <th>Product Info</th>
// //                                             <th>Refund</th>
// //                                             <th>Returned Item Image</th>
// //                                             <th>Status</th>
// //                                             <th>Action Panel</th>
// //                                         </tr>
// //                                     </thead>
// //                                     <tbody>
// //                                         {returns.map((ret) => (
// //                                             <tr key={ret.id}>
// //                                                 <td><b style={{ color: "#b91c1c" }}>{ret.id}</b></td>
// //                                                 <td><b>{ret.customer}</b></td>
// //                                                 <td>{ret.product} <span className="order-qty-badge">x{ret.qty}</span> <br /><small style={{ color: "#555" }}>Reason: "{ret.reason}"</small></td>
// //                                                 <td className="price-cell" style={{ color: "#b91c1c" }}>₹{ret.refundAmount}</td>

// //                                                 <td>
// //                                                     <div className="seller-return-img-preview-box">
// //                                                         <img src={ret.returnedProductImage} alt="Evidence" className="seller-table-mini-img" />
// //                                                         <button className="seller-view-img-btn" onClick={() => window.open(ret.returnedProductImage, "_blank")}>
// //                                                             <FaEye /> View Full
// //                                                         </button>
// //                                                     </div>
// //                                                 </td>

// //                                                 <td>
// //                                                     <span className={`order-status-label ${ret.status.replace(/ /g, "-").toLowerCase()}`}>
// //                                                         {ret.status}
// //                                                     </span>
// //                                                 </td>
// //                                                 <td>
// //                                                     {ret.status === "Return Requested" ? (
// //                                                         <div className="seller-action-btn-group" style={{ flexDirection: "column", gap: "5px" }}>
// //                                                             <button className="seller-action-btn edit" style={{ backgroundColor: "#d1fae5", color: "#065f46", width: "100%", justifyContent: "center" }} onClick={() => handleReturnAction(ret.id, "Accept")}>
// //                                                                 Accept & Refund
// //                                                             </button>
// //                                                             <button className="seller-action-btn delete" style={{ width: "100%", justifyContent: "center" }} onClick={() => handleReturnAction(ret.id, "Reject")}>
// //                                                                 Reject Return
// //                                                             </button>
// //                                                             <button className="seller-action-btn fraud-report-btn" onClick={() => handleReportFraud(ret.id, ret.product)}>
// //                                                                 <FaExclamationTriangle /> Report Fraud
// //                                                             </button>
// //                                                         </div>
// //                                                     ) : (
// //                                                         <span style={{ fontSize: "12px", color: "#666", fontWeight: "bold" }}>Processed</span>
// //                                                     )}
// //                                                 </td>
// //                                             </tr>
// //                                         ))}
// //                                     </tbody>
// //                                 </table>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )}

// //                 {/* TAB 5: Help Support */}
// //                 {activeTab === "help-support" && (
// //                     <div className="seller-tab-content animate-fade">
// //                         <div className="seller-form-card support-center-card">
// //                             <div className="support-header-icon"><FaQuestionCircle /></div>
// //                             <h3 className="section-block-title">Azora Seller Support Center</h3>
// //                             <p style={{ textAlign: "center", color: "#666" }}>Facing issues? Contact our partner support team directly via email.</p>
// //                             <a href="mailto:support@azora.com?subject=Azora Merchant Query" className="seller-submit-pula-btn support-email-btn" style={{ textDecoration: "none" }}><FaEnvelope /> Contact Support via Email</a>
// //                         </div>
// //                     </div>
// //                 )}
// //             </main>
// //         </div>
// //     );
// // };

// // export default SellerDashboard;
// import React, { useState } from "react";
// import { 
//     FaChartLine, FaBox, FaPlusCircle, FaShoppingCart, FaRupeeSign, 
//     FaTruck, FaCheckCircle, FaClock, FaExclamationTriangle, FaStore,
//     FaArrowLeft, FaUndo, FaUpload, FaMoneyBillWave, FaCreditCard
// } from "react-icons/fa";

// const SellerDashboard = () => {
//     const [sellerTab, setSellerTab] = useState("overview");
//     const [storeStatus, setStoreStatus] = useState("Approved"); 

//     // सेलर के प्रोडक्ट्स का डेटाबेस
//     const [myProducts, setMyProducts] = useState([
//         { id: "AZ-PROD-101", title: "Wireless Bluetooth Gaming Headphones", price: 2499, stock: 15, category: "Electronics", paymentMode: "Both", isReturnable: true, returnDays: 7 },
//         { id: "AZ-PROD-102", title: "Premium Ergonomic Office Chair", price: 8999, stock: 4, category: "Furniture", paymentMode: "Prepaid Only (Price > ₹5000)", isReturnable: false, returnDays: 0 }
//     ]);

//     // 🌟 कस्टमर ऑर्डर्स का लाइव डेटाबेस (paid/COD स्टेटस के साथ)
//     const [incomingOrders, setIncomingOrders] = useState([
//         { 
//             id: "ORD-9982", 
//             customer: "Amit Sharma", 
//             address: "H.No 45, Saket, New Delhi - 110017",
//             product: "Azora Wireless Headphones", 
//             price: "2999", 
//             paymentMethod: "CASH ON DELIVERY (COD)", // 💰 लाइव ट्रैकिंग डिटेल
//             status: "PENDING" 
//         },
//         { 
//             id: "ORD-4410", 
//             customer: "Rahul Verma", 
//             address: "Sector 62, Noida, UP - 201301",
//             product: "Sport Smart Watch v2", 
//             price: "9988", 
//             paymentMethod: "PAID (PREPAID)", // 💳 लाइव ट्रैकिंग डिटेल
//             status: "SHIPPED" 
//         }
//     ]);

//     // नया प्रोडक्ट ऐड करने के लिए कस्टमाइज्ड फॉर्म स्टेट
//     const [newProduct, setNewProduct] = useState({
//         title: "",
//         price: "",
//         stock: "",
//         category: "", // सेलर खुद टाइप करेगा
//         imageFile: null,
//         paymentMode: "Both", // COD, Prepaid, Both
//         isReturnable: "No",
//         returnDays: ""
//     });

//     // फोटो अपलोड करने का लोकल हैंडलर
//     const handleFileChange = (e) => {
//         if (e.target.files && e.target.files[0]) {
//             setNewProduct({ ...newProduct, imageFile: e.target.files[0].name });
//         }
//     };

//     // नया सामान लाइव करने का लॉजिक
//     const handleAddProduct = (e) => {
//         e.preventDefault();
//         if (!newProduct.title || !newProduct.price || !newProduct.stock || !newProduct.category) {
//             alert("Please fill all mandatory fields!");
//             return;
//         }

//         // 🌟 5000 से ऊपर की प्राइस पर कैश ऑन डिलीवरी ब्लॉक करने का कड़ा नियम
//         let finalPaymentMode = newProduct.paymentMode;
//         if (Number(newProduct.price) > 5000) {
//             finalPaymentMode = "Prepaid Only (Price > ₹5000)";
//         }

//         const createdItem = {
//             id: `AZ-PROD-${Math.floor(100 + Math.random() * 900)}`,
//             title: newProduct.title,
//             price: Number(newProduct.price),
//             stock: Number(newProduct.stock),
//             category: newProduct.category,
//             paymentMode: finalPaymentMode,
//             isReturnable: newProduct.isReturnable === "Yes",
//             returnDays: newProduct.isReturnable === "Yes" ? Number(newProduct.returnDays || 0) : 0
//         };

//         setMyProducts([createdItem, ...myProducts]);
//         alert("Product listed successfully into the system layout!");

//         // फॉर्म रीसेट
//         setNewProduct({
//             title: "", price: "", stock: "", category: "", imageFile: null, paymentMode: "Both", isReturnable: "No", returnDays: ""
//         });
//         setSellerTab("inventory");
//     };

//     return (
//         <div className="admin-dashboard-layout">

//             {/* साइडबार मेनू */}
//             <aside className="admin-sidebar" style={{ backgroundColor: "#131921" }}>
//                 <div className="admin-sidebar-brand">
//                     Azora<span>Merchant Central</span>
//                 </div>
//                 <div className="seller-status-sidebar-box" style={{
//                     padding: "10px", margin: "0 0 20px 0", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "bold", textAlign: "center",
//                     backgroundColor: "#dcfce7", color: "#15803d"
//                 }}>
//                     STORE STATUS: APPROVED
//                 </div>
//                 <nav className="admin-sidebar-menu">
//                     <button className={`admin-menu-btn ${sellerTab === "overview" ? "active" : ""}`} onClick={() => setSellerTab("overview")}><FaChartLine /> Dashboard Overview</button>
//                     <button className={`admin-menu-btn ${sellerTab === "add-product" ? "active" : ""}`} onClick={() => setSellerTab("add-product")}><FaPlusCircle /> Add New Product</button>
//                     <button className={`admin-menu-btn ${sellerTab === "inventory" ? "active" : ""}`} onClick={() => setSellerTab("inventory")}><FaBox /> Manage Inventory</button>
//                     <button className={`admin-menu-btn ${sellerTab === "orders" ? "active" : ""}`} onClick={() => setSellerTab("orders")}><FaShoppingCart /> Manage Orders</button>
//                 </nav>
//             </aside>

//             {/* मुख्य कंटेंट विंडो */}
//             <main className="admin-main-content">
//                 <header className="admin-content-header">
//                     <h2>Welcome, Seller Partner</h2>
//                     <p>Manage your business, inventory, and sales payout from one dashboard.</p>
//                 </header>

//                 {/* ==========================================================================
//                    1. DASHBOARD OVERVIEW SUB-TAB (As per image_5838ab.png)
//                    ========================================================================== */}
//                 {sellerTab === "overview" && (
//                     <div className="animate-fade">
//                         <h3 className="admin-block-title">📈 Live Marketplace Sales Tracker</h3>
//                         <div className="admin-time-tracker-grid">
//                             <div className="tracker-card customer-theme" style={{ borderTop: "4px solid #10b981" }}>
//                                 <div className="tracker-card-header" style={{ color: "#10b981" }}><FaRupeeSign /> Total Gross Turnover</div>
//                                 <div className="tracker-row"><span>Gross Billed Sales:</span> <b style={{fontSize:"1.1rem"}}>₹5,88,400</b></div>
//                                 <div className="tracker-row"><span>Items Sold:</span> <b>395 Units</b></div>
//                                 <div className="tracker-footer-total" style={{ color: "#10b981" }}>Lifetime Performance</div>
//                             </div>
//                             <div className="tracker-card seller-theme" style={{ borderTop: "4px solid #ea580c" }}>
//                                 <div className="tracker-card-header" style={{ color: "#ea580c" }}><FaStore /> Net Merchant Payout (90%)</div>
//                                 <div className="tracker-row"><span>Azora Flat Tech Fee:</span> <b>10% Deduction</b></div>
//                                 <div className="tracker-row"><span>Pure Profit Disbursed:</span> <b style={{ color: "#16a34a", fontSize: "1.1rem" }}>₹5,29,560</b></div>
//                                 <div className="tracker-footer-total" style={{ color: "#ea580c" }}>Sent directly to your bank account</div>
//                             </div>
//                         </div>

//                         <h3 className="admin-block-title" style={{ marginTop: "40px" }}>⚡ Store Pulse Summary</h3>
//                         <div className="admin-quick-stats-row">
//                             <div className="admin-mini-stat"><h4>{myProducts.length + 1}</h4><p>Total Catalog Items</p></div>
//                             <div className="admin-mini-stat"><h4 style={{ color: "#ea580c" }}>1</h4><p>Out of Stock Items</p></div>
//                             <div className="admin-mini-stat"><h4 style={{ color: "#2563eb" }}>1</h4><p>Orders Awaiting Shipping</p></div>
//                         </div>
//                     </div>
//                 )}

//                 {/* ==========================================================================
//                    2. ADD NEW PRODUCT SUB-TAB (With constraints and dynamic rules)
//                    ========================================================================== */}
//                 {sellerTab === "add-product" && (
//                     <div className="admin-section-card animate-fade" style={{ maxWidth: "850px" }}>
//                         <h3 className="admin-block-title" style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Add a Product to Azora Catalog</h3>
//                         <form onSubmit={handleAddProduct} className="amazon-pure-form" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

//                             <div className="amazon-pure-group">
//                                 <label>Product Title</label>
//                                 <input type="text" required placeholder="Enter brand name, model, size or specific details of product" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
//                             </div>

//                             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//                                 <div className="amazon-pure-group">
//                                     <label>Price (INR)</label>
//                                     <input type="number" required placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
//                                     {Number(newProduct.price) > 5000 && (
//                                         <span style={{ color: "#dc2626", fontSize: "0.78rem", fontWeight: "bold", marginTop: "3px" }}>
//                                             ⚠️ Rules Alert: Price is above ₹5000. Cash on Delivery will be automatically disabled for this item!
//                                         </span>
//                                     )}
//                                 </div>
//                                 <div className="amazon-pure-group">
//                                     <label>Stock Quantity</label>
//                                     <input type="number" required placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
//                                 </div>
//                             </div>

//                             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//                                 {/* 🌟 100% फिक्स: पुराना ड्रॉपडाउन हटाया, अब मर्चेंट खुद केटेगरी टाइप करेगा */}
//                                 <div className="amazon-pure-group">
//                                     <label>Category</label>
//                                     <input type="text" required placeholder="e.g. Electronics, Clothing, Gym Wear" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
//                                 </div>

//                                 {/* 🌟 100% फिक्स: टेक्स्ट यूआरएल के बजाय डायरेक्ट पीसी से फोटो अपलोड बॉक्स */}
//                                 <div className="amazon-pure-group">
//                                     <label>Upload Product Image</label>
//                                     <div className="custom-photo-upload-container" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                                         <label htmlFor="product-img-file" style={{
//                                             padding: "8px 14px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px"
//                                         }}><FaUpload /> Choose Photo</label>
//                                         <input type="file" id="product-img-file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
//                                         <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{newProduct.imageFile || "No file selected"}</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* 🌟 नया फ़ील्ड: पेमेंट का प्रकार (COD/Prepaid/Both) */}
//                             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
//                                 <div className="amazon-pure-group">
//                                     <label>Allowed Payment Method</label>
//                                     <select 
//                                         value={Number(newProduct.price) > 5000 ? "Prepaid" : newProduct.paymentMode} 
//                                         disabled={Number(newProduct.price) > 5000}
//                                         onChange={(e) => setNewProduct({ ...newProduct, paymentMode: e.target.value })}
//                                         style={{ padding: "8px", border: "1px solid #a6a6a6", borderRadius: "3px" }}
//                                     >
//                                         <option value="Both">Both (Cash on Delivery & Online Paid)</option>
//                                         <option value="Prepaid">Prepaid Online Payment Only</option>
//                                         <option value="COD">Cash on Delivery Only</option>
//                                     </select>
//                                 </div>

//                                 {/* 🌟 नया फ़ील्ड: रिटर्न पॉलिसी विंडो */}
//                                 <div className="amazon-pure-group">
//                                     <label>Allow Customer Returns?</label>
//                                     <select 
//                                         value={newProduct.isReturnable} 
//                                         onChange={(e) => setNewProduct({ ...newProduct, isReturnable: e.target.value })}
//                                         style={{ padding: "8px", border: "1px solid #a6a6a6", borderRadius: "3px" }}
//                                     >
//                                         <option value="No">No Returns Allowed (Non-Returnable)</option>
//                                         <option value="Yes">Yes, Accept Product Returns</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* अगर रिटर्न ऑन है तो कितने दिनों का मौका मिलेगा */}
//                             {newProduct.isReturnable === "Yes" && (
//                                 <div className="amazon-pure-group animate-fade" style={{ maxWidth: "250px" }}>
//                                     <label>Return Window Period (In Days)</label>
//                                     <input type="number" placeholder="e.g. 7 or 10 Days" value={newProduct.returnDays} onChange={(e) => setNewProduct({ ...newProduct, returnDays: e.target.value })} required />
//                                 </div>
//                             )}

//                             <button type="submit" className="amazon-gold-action-btn" style={{ padding: "11px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontWeight: "bold" }}>
//                                 <FaPlusCircle /> List Product on Azora
//                             </button>
//                         </form>
//                     </div>
//                 )}

//                 {/* ==========================================================================
//                    3. MANAGE INVENTORY SUB-TAB
//                    ========================================================================== */}
//                 {sellerTab === "inventory" && (
//                     <div className="admin-section-card animate-fade">
//                         <h3 className="admin-block-title">📦 Current Inventory Metrics & Policy Status</h3>
//                         <div className="table-responsive">
//                             <table className="admin-master-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Product SKU ID</th>
//                                         <th>Item Title</th>
//                                         <th>Category</th>
//                                         <th>Price</th>
//                                         <th>Stock Left</th>
//                                         <th>Allowed Payments</th>
//                                         <th>Return Window</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {myProducts.map((p) => (
//                                         <tr key={p.id}>
//                                             <td><b>{p.id}</b></td>
//                                             <td className="bold-text">{p.title}</td>
//                                             <td><span className="admin-password-badge" style={{background:"#f1f5f9", color:"#334155", border:"1px solid #cbd5e1"}}>{p.category}</span></td>
//                                             <td style={{fontWeight:"bold"}}>₹{p.price.toLocaleString("en-IN")}</td>
//                                             <td style={{fontWeight:"bold", color: p.stock === 0 ? "red" : "inherit"}}>{p.stock} units</td>
//                                             <td style={{fontSize:"0.8rem", fontWeight:"700", color: "#1e3a8a"}}>{p.paymentMode}</td>
//                                             <td>{p.isReturnable ? <span style={{color:"#16a34a", fontWeight:"bold"}}><FaUndo /> {p.returnDays} Days Return</span> : <span style={{color:"#dc2626"}}>No Return</span>}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//                 {/* ==========================================================================
//                    4. MANAGE ORDERS SUB-TAB (As per image_5831e5.png + Paid/COD tracking)
//                    ========================================================================== */}
//                 {sellerTab === "orders" && (
//                     <div className="admin-section-card animate-fade">
//                         <h3 className="admin-block-title">Customer Orders Panel</h3>
//                         <div className="table-responsive">
//                             <table className="admin-master-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Order ID</th>
//                                         <th>Customer</th>
//                                         <th>Product</th>
//                                         <th>Price Set</th>
//                                         <th>Payment Mode Gateway</th> {/* 🌟 नया कड़क कॉलम */}
//                                         <th>Status</th>
//                                         <th>Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {incomingOrders.map((ord) => (
//                                         <tr key={ord.id}>
//                                             <td><b>{ord.id}</b></td>
//                                             <td>
//                                                 <div style={{fontWeight:"bold", color:"#111"}}>{ord.customer}</div>
//                                                 <div style={{fontSize:"0.72rem", color:"#64748b"}}>{ord.address}</div>
//                                             </td>
//                                             <td className="bold-text">{ord.product}</td>
//                                             <td style={{fontWeight:"bold"}}>₹{ord.price}</td>

//                                             {/* 🌟 100% सटीक: यहाँ सेलर को पता चलेगा कि पैसा मिला या COD है */}
//                                             <td>
//                                                 <span style={{
//                                                     fontSize: "0.78rem", fontWeight: "800", padding: "4px 8px", borderRadius: "4px",
//                                                     backgroundColor: ord.paymentMethod.includes("COD") ? "#fef3c7" : "#dcfce7",
//                                                     color: ord.paymentMethod.includes("COD") ? "#d97706" : "#15803d",
//                                                     display: "inline-flex", alignItems: "center", gap: "4px"
//                                                 }}>
//                                                     {ord.paymentMethod.includes("COD") ? <FaMoneyBillWave /> : <FaCreditCard />}
//                                                     {ord.paymentMethod}
//                                                 </span>
//                                             </td>

//                                             <td>
//                                                 <span className={`admin-badge ${ord.status === "SHIPPED" ? "approved" : "pending-approval"}`}>
//                                                     {ord.status}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 <select 
//                                                     value={ord.status} 
//                                                     className="admin-table-select"
//                                                     onChange={(e) => {
//                                                         alert(`Order status updated to ${e.target.value}`);
//                                                         setIncomingOrders(incomingOrders.map(o => o.id === ord.id ? { ...o, status: e.target.value } : o));
//                                                     }}
//                                                     style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "0.82rem", fontWeight: "bold" }}
//                                                 >
//                                                     <option value="PENDING">Pending</option>
//                                                     <option value="SHIPPED">Shipped</option>
//                                                     <option value="DELIVERED">Delivered</option>
//                                                 </select>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default SellerDashboard;
import React, { useState } from "react";
import {
    FaChartLine, FaBox, FaPlusCircle, FaShoppingCart, FaRupeeSign,
    FaTruck, FaCheckCircle, FaClock, FaExclamationTriangle, FaStore,
    FaUndo, FaUpload, FaMoneyBillWave, FaCreditCard, FaArrowRight
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // 🌟 चेकआउट पेज पर नेविगेट करने के लिए

const SellerDashboard = () => {
    const navigate = useNavigate(); // 🌟 नेविगेटर इनिशियलाइज किया
    const [sellerTab, setSellerTab] = useState("overview");
    const [storeStatus, setStoreStatus] = useState("Approved");

    // सेलर के प्रोडक्ट्स का डेटाबेस
    const [myProducts, setMyProducts] = useState([
        { id: "AZ-PROD-101", title: "Wireless Bluetooth Gaming Headphones", price: 2499, stock: 15, category: "Electronics", paymentMode: "Both", isReturnable: true, returnDays: 7 },
        { id: "AZ-PROD-102", title: "Premium Ergonomic Office Chair", price: 8999, stock: 4, category: "Furniture", paymentMode: "Prepaid Only (Price > ₹5000)", isReturnable: false, returnDays: 0 }
    ]);

    // ग्राहकों द्वारा इस सेलर को मिले लाइव ऑर्डर्स का डेटा
    const [incomingOrders, setIncomingOrders] = useState([
        {
            id: "ORD-9982",
            customer: "Amit Sharma",
            address: "H.No 45, Saket, New Delhi - 110017",
            product: "Azora Wireless Headphones",
            price: "2999",
            paymentMethod: "CASH ON DELIVERY (COD)",
            status: "PENDING"
        },
        {
            id: "ORD-4410",
            customer: "Rahul Verma",
            address: "Sector 62, Noida, UP - 201301",
            product: "Sport Smart Watch v2",
            price: "9988",
            paymentMethod: "PAID (PREPAID)",
            status: "SHIPPED"
        }
    ]);

    // नया प्रोडक्ट ऐड करने के लिए कस्टमाइज्ड फॉर्म स्टेट
    const [newProduct, setNewProduct] = useState({
        title: "", price: "", stock: "", category: "", imageFile: null, paymentMode: "Both", isReturnable: "No", returnDays: ""
    });

    // फोटो अपलोड करने का लोकल हैंडलर
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setNewProduct({ ...newProduct, imageFile: e.target.files[0].name });
        }
    };

    // नया सामान लाइव करने का लॉजिक
    const handleAddProduct = (e) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.price || !newProduct.stock || !newProduct.category) {
            alert("Please fill all mandatory fields!");
            return;
        }

        let finalPaymentMode = newProduct.paymentMode;
        if (Number(newProduct.price) > 5000) {
            finalPaymentMode = "Prepaid Only (Price > ₹5000)";
        }

        const createdItem = {
            id: `AZ-PROD-${Math.floor(100 + Math.random() * 900)}`,
            title: newProduct.title,
            price: Number(newProduct.price),
            stock: Number(newProduct.stock),
            category: newProduct.category,
            paymentMode: finalPaymentMode,
            isReturnable: newProduct.isReturnable === "Yes",
            returnDays: newProduct.isReturnable === "Yes" ? Number(newProduct.returnDays || 0) : 0
        };

        setMyProducts([createdItem, ...myProducts]);
        alert("Product listed successfully into the system layout!");

        setNewProduct({
            title: "", price: "", stock: "", category: "", imageFile: null, paymentMode: "Both", isReturnable: "No", returnDays: ""
        });
        setSellerTab("inventory");
    };

    return (
        <div className="admin-dashboard-layout">

            {/* साइडबार मेनू */}
            <aside className="admin-sidebar" style={{ backgroundColor: "#131921" }}>
                <div className="admin-sidebar-brand">
                    Azora<span>Merchant Central</span>
                </div>
                <div className="seller-status-sidebar-box" style={{
                    padding: "10px", margin: "0 0 20px 0", borderRadius: "6px", fontSize: "0.8rem", fontWeight: "bold", textAlign: "center",
                    backgroundColor: "#dcfce7", color: "#15803d"
                }}>
                    STORE STATUS: APPROVED
                </div>
                <nav className="admin-sidebar-menu">
                    <button className={`admin-menu-btn ${sellerTab === "overview" ? "active" : ""}`} onClick={() => setSellerTab("overview")}><FaChartLine /> Dashboard Overview</button>
                    <button className={`admin-menu-btn ${sellerTab === "add-product" ? "active" : ""}`} onClick={() => setSellerTab("add-product")}><FaPlusCircle /> Add New Product</button>
                    <button className={`admin-menu-btn ${sellerTab === "inventory" ? "active" : ""}`} onClick={() => setSellerTab("inventory")}><FaBox /> Manage Inventory</button>
                    <button className={`admin-menu-btn ${sellerTab === "orders" ? "active" : ""}`} onClick={() => setSellerTab("orders")}><FaShoppingCart /> Manage Orders</button>
                </nav>
            </aside>

            {/* मुख्य कंटेंट विंडो */}
            <main className="admin-main-content">
                <header className="admin-content-header">
                    <h2>Welcome, Seller Partner</h2>
                    <p>Manage your business, inventory, and sales payout from one dashboard.</p>
                </header>

                {/* ==========================================================================
                   1. DASHBOARD OVERVIEW SUB-TAB
                   ========================================================================== */}
                {sellerTab === "overview" && (
                    <div className="animate-fade">
                        <h3 className="admin-block-title">📈 Live Marketplace Sales Tracker</h3>
                        <div className="admin-time-tracker-grid">
                            <div className="tracker-card customer-theme" style={{ borderTop: "4px solid #10b981" }}>
                                <div className="tracker-card-header" style={{ color: "#10b981" }}><FaRupeeSign /> Total Gross Turnover</div>
                                <div className="tracker-row"><span>Gross Billed Sales:</span> <b style={{ fontSize: "1.1rem" }}>₹5,88,400</b></div>
                                <div className="tracker-row"><span>Items Sold:</span> <b>395 Units</b></div>
                                <div className="tracker-footer-total" style={{ color: "#10b981" }}>Lifetime Performance</div>
                            </div>
                            <div className="tracker-card seller-theme" style={{ borderTop: "4px solid #ea580c" }}>
                                <div className="tracker-card-header" style={{ color: "#ea580c" }}><FaStore /> Net Merchant Payout (90%)</div>
                                <div className="tracker-row"><span>Azora Flat Tech Fee:</span> <b>10% Deduction</b></div>
                                <div className="tracker-row"><span>Pure Profit Disbursed:</span> <b style={{ color: "#16a34a", fontSize: "1.1rem" }}>₹5,29,560</b></div>
                                <div className="tracker-footer-total" style={{ color: "#ea580c" }}>Sent directly to your bank account</div>
                            </div>
                        </div>

                        <h3 className="admin-block-title" style={{ marginTop: "40px" }}>⚡ Store Pulse Summary</h3>
                        <div className="admin-quick-stats-row">
                            <div className="admin-mini-stat"><h4>{myProducts.length + 1}</h4><p>Total Catalog Items</p></div>
                            <div className="admin-mini-stat"><h4 style={{ color: "#ea580c" }}>1</h4><p>Out of Stock Items</p></div>
                            <div className="admin-mini-stat"><h4 style={{ color: "#2563eb" }}>1</h4><p>Orders Awaiting Shipping</p></div>
                        </div>
                    </div>
                )}

                {/* ==========================================================================
                   2. ADD NEW PRODUCT SUB-TAB
                   ========================================================================== */}
                {sellerTab === "add-product" && (
                    <div className="admin-section-card animate-fade" style={{ maxWidth: "850px" }}>
                        <h3 className="admin-block-title" style={{ borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Add a Product to Azora Catalog</h3>
                        <form onSubmit={handleAddProduct} className="amazon-pure-form" style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                            <div className="amazon-pure-group">
                                <label>Product Title</label>
                                <input type="text" required placeholder="Enter brand name, model, size or specific details of product" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                <div className="amazon-pure-group">
                                    <label>Price (INR)</label>
                                    <input type="number" required placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                                    {Number(newProduct.price) > 5000 && (
                                        <span style={{ color: "#dc2626", fontSize: "0.78rem", fontWeight: "bold", marginTop: "3px" }}>
                                            ⚠️ Rules Alert: Price is above ₹5000. Cash on Delivery will be automatically disabled for this item!
                                        </span>
                                    )}
                                </div>
                                <div className="amazon-pure-group">
                                    <label>Stock Quantity</label>
                                    <input type="number" required placeholder="Stock" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                <div className="amazon-pure-group">
                                    <label>Category</label>
                                    <input type="text" required placeholder="e.g. Electronics, Clothing, Gym Wear" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} />
                                </div>

                                <div className="amazon-pure-group">
                                    <label>Upload Product Image</label>
                                    <div className="custom-photo-upload-container" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <label htmlFor="product-img-file" style={{
                                            padding: "8px 14px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px"
                                        }}><FaUpload /> Choose Photo</label>
                                        <input type="file" id="product-img-file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
                                        <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{newProduct.imageFile || "No file selected"}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                                <div className="amazon-pure-group">
                                    <label>Allowed Payment Method</label>
                                    <select
                                        value={Number(newProduct.price) > 5000 ? "Prepaid" : newProduct.paymentMode}
                                        disabled={Number(newProduct.price) > 5000}
                                        onChange={(e) => setNewProduct({ ...newProduct, paymentMode: e.target.value })}
                                        style={{ padding: "8px", border: "1px solid #a6a6a6", borderRadius: "3px" }}
                                    >
                                        <option value="Both">Both (Cash on Delivery & Online Paid)</option>
                                        <option value="Prepaid">Prepaid Online Payment Only</option>
                                        <option value="COD">Cash on Delivery Only</option>
                                    </select>
                                </div>

                                <div className="amazon-pure-group">
                                    <label>Allow Customer Returns?</label>
                                    <select
                                        value={newProduct.isReturnable}
                                        onChange={(e) => setNewProduct({ ...newProduct, isReturnable: e.target.value })}
                                        style={{ padding: "8px", border: "1px solid #a6a6a6", borderRadius: "3px" }}
                                    >
                                        <option value="No">No Returns Allowed (Non-Returnable)</option>
                                        <option value="Yes">Yes, Accept Product Returns</option>
                                    </select>
                                </div>
                            </div>

                            {newProduct.isReturnable === "Yes" && (
                                <div className="amazon-pure-group animate-fade" style={{ maxWidth: "250px" }}>
                                    <label>Return Window Period (In Days)</label>
                                    <input type="number" placeholder="e.g. 7 or 10 Days" value={newProduct.returnDays} onChange={(e) => setNewProduct({ ...newProduct, returnDays: e.target.value })} required />
                                </div>
                            )}

                            <button type="submit" className="amazon-gold-action-btn" style={{ padding: "11px", display: "flex", alignItems: "center", justifyGround: "center", gap: "6px", fontWeight: "bold" }}>
                                <FaPlusCircle /> List Product on Azora
                            </button>
                        </form>
                    </div>
                )}

                {/* ==========================================================================
                   3. MANAGE INVENTORY SUB-TAB (With Checkout Button added)
                   ========================================================================== */}
                {sellerTab === "inventory" && (
                    <div className="admin-section-card animate-fade">
                        <h3 className="admin-block-title">📦 Current Inventory Metrics & Policy Status</h3>
                        <div className="table-responsive">
                            <table className="admin-master-table">
                                <thead>
                                    <tr>
                                        <th>Product SKU ID</th>
                                        <th>Item Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock Left</th>
                                        <th>Allowed Payments</th>
                                        <th>Return Window</th>
                                        <th>Direct Action</th> {/* 🌟 नया एक्शन कॉलम */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {myProducts.map((p) => (
                                        <tr key={p.id}>
                                            <td><b>{p.id}</b></td>
                                            <td className="bold-text">{p.title}</td>
                                            <td><span className="admin-password-badge" style={{ background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1" }}>{p.category}</span></td>
                                            <td style={{ fontWeight: "bold" }}>₹{p.price.toLocaleString("en-IN")}</td>
                                            <td style={{ fontWeight: "bold", color: p.stock === 0 ? "red" : "inherit" }}>{p.stock} units</td>
                                            <td style={{ fontSize: "0.8rem", fontWeight: "700", color: "#1e3a8a" }}>{p.paymentMode}</td>
                                            <td>{p.isReturnable ? <span style={{ color: "#16a34a", fontWeight: "bold" }}><FaUndo /> {p.returnDays} Days Return</span> : <span style={{ color: "#dc2626" }}>No Return</span>}</td>

                                            {/* 🌟 Checkout Button in Manage Inventory */}
                                            <td>
                                                <button
                                                    className="admin-action-btn view-profile"
                                                    style={{ backgroundColor: "#e0f2fe", color: "#0369a1", padding: "6px 10px", fontSize: "0.78rem" }}
                                                    onClick={() => navigate("/checkout")}
                                                >
                                                    Checkout <FaArrowRight style={{ marginLeft: "4px" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* ==========================================================================
                   4. MANAGE ORDERS SUB-TAB (With Checkout Button added)
                   ========================================================================== */}
                {sellerTab === "orders" && (
                    <div className="admin-section-card animate-fade">
                        <h3 className="admin-block-title">Customer Orders Panel</h3>
                        <div className="table-responsive">
                            <table className="admin-master-table">
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Price Set</th>
                                        <th>Payment Mode Gateway</th>
                                        <th>Status</th>
                                        <th>Fulfillment</th>
                                        <th>B2B Checkout</th> {/* 🌟 नया एक्शन कॉलम */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {incomingOrders.map((ord) => (
                                        <tr key={ord.id}>
                                            <td><b>{ord.id}</b></td>
                                            <td>
                                                <div style={{ fontWeight: "bold", color: "#111" }}>{ord.customer}</div>
                                                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>{ord.address}</div>
                                            </td>
                                            <td className="bold-text">{ord.product}</td>
                                            <td style={{ fontWeight: "bold" }}>₹{ord.price}</td>
                                            <td>
                                                <span style={{
                                                    fontSize: "0.78rem", fontWeight: "800", padding: "4px 8px", borderRadius: "4px",
                                                    backgroundColor: ord.paymentMethod.includes("COD") ? "#fef3c7" : "#dcfce7",
                                                    color: ord.paymentMethod.includes("COD") ? "#d97706" : "#15803d",
                                                    display: "inline-flex", alignItems: "center", gap: "4px"
                                                }}>
                                                    {ord.paymentMethod.includes("COD") ? <FaMoneyBillWave /> : <FaCreditCard />}
                                                    {ord.paymentMethod}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`admin-badge ${ord.status === "SHIPPED" ? "approved" : "pending-approval"}`}>
                                                    {ord.status}
                                                </span>
                                            </td>
                                            <td>
                                                <select
                                                    value={ord.status}
                                                    className="admin-table-select"
                                                    onChange={(e) => {
                                                        alert(`Order status updated to ${e.target.value}`);
                                                        setIncomingOrders(incomingOrders.map(o => o.id === ord.id ? { ...o, status: e.target.value } : o));
                                                    }}
                                                    style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ccc", fontSize: "0.82rem", fontWeight: "bold" }}
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="SHIPPED">Shipped</option>
                                                    <option value="DELIVERED">Delivered</option>
                                                </select>
                                            </td>

                                            {/* 🌟 Checkout Button in Manage Orders */}
                                            <td>
                                                <button
                                                    className="admin-action-btn view-profile"
                                                    style={{ backgroundColor: "#ffedd5", color: "#c2410c", padding: "6px 10px", fontSize: "0.78rem" }}
                                                    onClick={() => navigate("/checkout")}
                                                >
                                                    Checkout <FaArrowRight style={{ marginLeft: "4px" }} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SellerDashboard;