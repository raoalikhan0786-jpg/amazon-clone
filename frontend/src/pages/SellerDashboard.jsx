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