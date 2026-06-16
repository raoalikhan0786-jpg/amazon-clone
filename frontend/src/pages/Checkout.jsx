import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useContext(StoreContext);
    
    // 🆕 State for address and payment
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [isLoading, setIsLoading] = useState(false);
    
    // 🆕 State for order items
    const [orderItems, setOrderItems] = useState([]);

    // 🆕 Load cart from localStorage if StoreContext not available
    useEffect(() => {
        if (!cart || cart.length === 0) {
            const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
            setOrderItems(storedCart);
        } else {
            setOrderItems(cart);
        }
    }, [cart]);

    // 🆕 Calculate total price with quantity
    const totalPrice = orderItems.reduce(
        (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
        0
    );

    // 🆕 Calculate GST (18%)
    const gstAmount = totalPrice * 0.18;
    const grandTotal = totalPrice + gstAmount;

    // 🆕 Get product image
    const getProductImage = (item) => {
        return item.image || item.mainImage || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500";
    };

    // 🆕 Get product title
    const getProductTitle = (item) => {
        return item.title || item.name || "Product";
    };

    // 🆕 Place Order Function
    const placeOrder = async () => {
        // Validate address
        if (!address.trim() || !city.trim() || !state.trim() || !pincode.trim() || !phone.trim()) {
            alert("Please fill all address fields!");
            return;
        }

        if (phone.length < 10) {
            alert("Please enter a valid 10-digit phone number!");
            return;
        }

        setIsLoading(true);

        try {
            // 🆕 Create order object
            const orderData = {
                orderId: `ORD-${Date.now()}`,
                orderDate: new Date().toISOString(),
                customerName: JSON.parse(localStorage.getItem("user") || "{}")?.name || "Customer",
                customerPhone: phone,
                customerAddress: `${address}, ${city}, ${state} - ${pincode}`,
                items: orderItems.map(item => ({
                    id: item.id,
                    title: getProductTitle(item),
                    price: item.price || item.sellingPrice || 0,
                    quantity: item.quantity || 1,
                    image: getProductImage(item),
                    category: item.category || "",
                    sellerName: item.sellerName || "Azora Seller"
                })),
                totalPrice: totalPrice,
                gstAmount: gstAmount,
                grandTotal: grandTotal,
                paymentMethod: paymentMethod,
                status: "CONFIRMED",
                invoiceGenerated: false
            };

            // 🆕 Save order to localStorage
            const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
            existingOrders.unshift(orderData);
            localStorage.setItem("orders", JSON.stringify(existingOrders));

            // 🆕 Save order to backend (when backend is ready)
            // const response = await fetch("/api/orders", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify(orderData)
            // });
            // const data = await response.json();

            // 🆕 Clear cart
            if (clearCart) {
                clearCart();
            }
            localStorage.removeItem("cart");

            setIsLoading(false);

            // 🆕 Redirect to order confirmation
            alert(`✅ Order placed successfully!\n\nOrder ID: ${orderData.orderId}\nTotal: ₹${grandTotal.toFixed(2)}\nPayment: ${paymentMethod}`);
            navigate("/customer/orders");

        } catch (error) {
            console.error("Order placement failed:", error);
            alert("Failed to place order. Please try again.");
            setIsLoading(false);
        }
    };

    // 🆕 Format price
    const formatPrice = (price) => {
        if (!price) return "0";
        const num = parseFloat(price);
        if (isNaN(num)) return price;
        return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    // 🆕 Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="checkout" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", minHeight: "100vh", backgroundColor: "#f8fafc" }}>
            
            {/* 🆕 Header */}
            <h2 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e293b", marginBottom: "20px" }}>
                📦 Checkout
            </h2>

            <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
                
                {/* 🆕 Left Column - Address & Payment */}
                <div style={{ flex: "2", minWidth: "300px" }}>
                    <div className="checkout-box" style={{
                        backgroundColor: "white",
                        padding: "24px",
                        borderRadius: "12px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        border: "1px solid #e2e8f0"
                    }}>
                        <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", marginBottom: "16px" }}>
                            📍 Delivery Address
                        </h3>

                        {/* 🆕 Full Name (from localStorage) */}
                        <div style={{ marginBottom: "12px" }}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#475569", marginBottom: "4px" }}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={JSON.parse(localStorage.getItem("user") || "{}")?.name || "Customer"}
                                readOnly
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    backgroundColor: "#f8fafc"
                                }}
                            />
                        </div>

                        {/* 🆕 Phone Number */}
                        <div style={{ marginBottom: "12px" }}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#475569", marginBottom: "4px" }}>
                                Phone Number *
                            </label>
                            <input
                                type="tel"
                                placeholder="Enter 10-digit phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    fontSize: "14px"
                                }}
                                required
                            />
                        </div>

                        {/* 🆕 Address Line */}
                        <div style={{ marginBottom: "12px" }}>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#475569", marginBottom: "4px" }}>
                                Delivery Address *
                            </label>
                            <textarea
                                placeholder="Enter your delivery address (House No., Street, Landmark)"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                rows="2"
                                style={{
                                    width: "100%",
                                    padding: "10px 12px",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    resize: "vertical"
                                }}
                                required
                            />
                        </div>

                        {/* 🆕 City, State, Pincode */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                            <div>
                                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#475569", marginBottom: "4px" }}>
                                    City *
                                </label>
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
                                        border: "1px solid #cbd5e1",
                                        borderRadius: "8px",
                                        fontSize: "14px"
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#475569", marginBottom: "4px" }}>
                                    State *
                                </label>
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
                                        border: "1px solid #cbd5e1",
                                        borderRadius: "8px",
                                        fontSize: "14px"
                                    }}
                                    required
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "#475569", marginBottom: "4px" }}>
                                    Pincode *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                    style={{
                                        width: "100%",
                                        padding: "10px 12px",
                                        border: "1px solid #cbd5e1",
                                        borderRadius: "8px",
                                        fontSize: "14px"
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* 🆕 Payment Method */}
                        <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", marginBottom: "16px" }}>
                                💳 Payment Method
                            </h3>
                            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                                <label style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 16px",
                                    border: paymentMethod === "COD" ? "2px solid #03bafc" : "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    backgroundColor: paymentMethod === "COD" ? "#f0fdf4" : "white"
                                }}>
                                    <input
                                        type="radio"
                                        value="COD"
                                        checked={paymentMethod === "COD"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    💵 Cash on Delivery
                                </label>
                                <label style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 16px",
                                    border: paymentMethod === "PREPAID" ? "2px solid #03bafc" : "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    backgroundColor: paymentMethod === "PREPAID" ? "#f0fdf4" : "white"
                                }}>
                                    <input
                                        type="radio"
                                        value="PREPAID"
                                        checked={paymentMethod === "PREPAID"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    💳 Online Payment
                                </label>
                                <label style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "10px 16px",
                                    border: paymentMethod === "EMI" ? "2px solid #03bafc" : "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    backgroundColor: paymentMethod === "EMI" ? "#f0fdf4" : "white"
                                }}>
                                    <input
                                        type="radio"
                                        value="EMI"
                                        checked={paymentMethod === "EMI"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                    🏦 EMI
                                </label>
                            </div>
                            <div style={{ marginTop: "8px", fontSize: "12px", color: "#64748b" }}>
                                {paymentMethod === "COD" && "Pay when you receive the product."}
                                {paymentMethod === "PREPAID" && "Pay online using Card, UPI, or Net Banking."}
                                {paymentMethod === "EMI" && "Pay in easy monthly installments."}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🆕 Right Column - Order Summary */}
                <div style={{ flex: "1", minWidth: "280px" }}>
                    <div style={{
                        backgroundColor: "white",
                        padding: "24px",
                        borderRadius: "12px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        border: "1px solid #e2e8f0",
                        position: "sticky",
                        top: "20px"
                    }}>
                        <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#1e293b", marginBottom: "16px" }}>
                            🧾 Order Summary
                        </h3>

                        {/* 🆕 Items List */}
                        <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "16px" }}>
                            {orderItems.length === 0 ? (
                                <p style={{ color: "#94a3b8", fontSize: "14px" }}>No items in cart</p>
                            ) : (
                                orderItems.map((item, index) => (
                                    <div key={index} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "12px",
                                        padding: "8px 0",
                                        borderBottom: "1px solid #f1f5f9"
                                    }}>
                                        <img
                                            src={getProductImage(item)}
                                            alt={getProductTitle(item)}
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                objectFit: "cover",
                                                borderRadius: "6px"
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: "13px", fontWeight: "500", color: "#1e293b" }}>
                                                {getProductTitle(item)}
                                            </div>
                                            <div style={{ fontSize: "12px", color: "#64748b" }}>
                                                ₹{formatPrice(item.price || item.sellingPrice || 0)} × {item.quantity || 1}
                                            </div>
                                        </div>
                                        <div style={{ fontSize: "13px", fontWeight: "bold", color: "#1e293b" }}>
                                            ₹{((item.price || item.sellingPrice || 0) * (item.quantity || 1)).toFixed(2)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* 🆕 Price Breakdown */}
                        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                                <span style={{ color: "#64748b" }}>Subtotal</span>
                                <span>₹{formatPrice(totalPrice)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                                <span style={{ color: "#64748b" }}>GST (18%)</span>
                                <span>₹{formatPrice(gstAmount)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
                                <span style={{ color: "#64748b" }}>Delivery</span>
                                <span style={{ color: "#16a34a" }}>FREE</span>
                            </div>
                            <div style={{
                                borderTop: "2px solid #e2e8f0",
                                paddingTop: "12px",
                                marginTop: "8px",
                                display: "flex",
                                justifyContent: "space-between",
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#1e293b"
                            }}>
                                <span>Grand Total</span>
                                <span style={{ color: "#03bafc" }}>₹{formatPrice(grandTotal)}</span>
                            </div>
                        </div>

                        {/* 🆕 Place Order Button */}
                        <button
                            onClick={placeOrder}
                            disabled={isLoading || orderItems.length === 0}
                            style={{
                                width: "100%",
                                padding: "14px",
                                backgroundColor: isLoading || orderItems.length === 0 ? "#94a3b8" : "#03bafc",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: isLoading || orderItems.length === 0 ? "not-allowed" : "pointer",
                                marginTop: "16px",
                                transition: "background-color 0.2s"
                            }}
                        >
                            {isLoading ? "⏳ Placing Order..." : "🛒 Place Order"}
                        </button>

                        {/* 🆕 Back to Cart Link */}
                        <Link to="/cart">
                            <button style={{
                                width: "100%",
                                padding: "10px",
                                backgroundColor: "transparent",
                                color: "#64748b",
                                border: "none",
                                fontSize: "13px",
                                cursor: "pointer",
                                marginTop: "8px",
                                textDecoration: "underline"
                            }}>
                                ← Back to Cart
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Checkout;