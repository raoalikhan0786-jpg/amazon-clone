// frontend/src/pages/CustomerOrders.jsx

import React, { useState, useEffect } from "react";
import { FaEye, FaDownload, FaFilePdf, FaPrint, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import InvoiceModal from "../components/InvoiceModal";

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [orderInvoices, setOrderInvoices] = useState([]);

    // Customer phone from localStorage
    const customerPhone = localStorage.getItem("userPhone") || localStorage.getItem("phone") || "9876543210";
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // 🆕 REAL API CALL
            const response = await fetch(`/api/orders/customer/${customerPhone}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            } else {
                console.error("API error:", data.message);
                // Agar API fail ho to sample data dikhao (optional)
                setSampleOrders();
            }
            setLoading(false);

        } catch (error) {
            console.error("Failed to fetch orders:", error);
            // Agar network error ho to sample data dikhao
            setSampleOrders();
            setLoading(false);
        }
    };

    // Sample data function (fallback ke liye)
    const setSampleOrders = () => {
        const sampleOrders = [
            {
                orderId: "ORD-1001",
                productTitle: "Apple iPhone 16",
                category: "Electronics",
                totalPrice: 52424,
                status: "DELIVERED",
                orderDate: "2026-06-10",
                customerFinalPrice: 61860.32,
                invoiceGenerated: true,
                invoiceNumber: "AZ-INV-20260610-001",
                invoicePdfUrl: "/invoices/AZ-INV-20260610-001.pdf",
                platformInvoiceUrl: "/invoices/AZ-PF-20260610-001.pdf",
                gtaInvoiceUrl: "/invoices/AZ-GTA-20260610-001.pdf"
            },
            {
                orderId: "ORD-1002",
                productTitle: "Cotton T-Shirt",
                category: "Fashion",
                totalPrice: 999,
                status: "SHIPPED",
                orderDate: "2026-06-12",
                customerFinalPrice: 1118.88,
                invoiceGenerated: true,
                invoiceNumber: "AZ-INV-20260612-002",
                invoicePdfUrl: "/invoices/AZ-INV-20260612-002.pdf",
                platformInvoiceUrl: null,
                gtaInvoiceUrl: null
            },
            {
                orderId: "ORD-1003",
                productTitle: "The Alchemist Book",
                category: "Books",
                totalPrice: 399,
                status: "CONFIRMED",
                orderDate: "2026-06-13",
                customerFinalPrice: 399,
                invoiceGenerated: false,
                invoiceNumber: null,
                invoicePdfUrl: null,
                platformInvoiceUrl: null,
                gtaInvoiceUrl: null
            }
        ];
        setOrders(sampleOrders);
    };

    // 🆕 Fetch all invoices for an order
    const fetchOrderInvoices = async (order) => {
        // Collect all available invoices
        const invoices = [];

        if (order.invoicePdfUrl) {
            invoices.push({
                invoiceNumber: order.invoiceNumber || "Product Invoice",
                invoiceType: "product",
                invoiceDate: order.orderDate,
                invoicePdfUrl: order.invoicePdfUrl,
                totalAmount: order.customerFinalPrice || order.totalPrice
            });
        }

        if (order.platformInvoiceUrl) {
            invoices.push({
                invoiceNumber: `PF-${order.orderId}`,
                invoiceType: "platform",
                invoiceDate: order.orderDate,
                invoicePdfUrl: order.platformInvoiceUrl,
                totalAmount: "Platform Fees"
            });
        }

        if (order.gtaInvoiceUrl) {
            invoices.push({
                invoiceNumber: `GTA-${order.orderId}`,
                invoiceType: "shipping",
                invoiceDate: order.orderDate,
                invoicePdfUrl: order.gtaInvoiceUrl,
                totalAmount: "Shipping Charges"
            });
        }

        setOrderInvoices(invoices);
        setSelectedOrder(order);
        setShowInvoiceModal(true);
    };

    // 🆕 Download single invoice
    const downloadSingleInvoice = (invoiceNumber, pdfUrl) => {
        if (pdfUrl) {
            // Open in new tab
            window.open(pdfUrl, '_blank');
        } else {
            alert("Invoice not available");
        }
    };

    // 🆕 Download all invoices as zip (future enhancement)
    const downloadAllInvoices = (order) => {
        const invoices = [];
        if (order.invoicePdfUrl) invoices.push({ name: "Product Invoice", url: order.invoicePdfUrl });
        if (order.platformInvoiceUrl) invoices.push({ name: "Platform Fee Invoice", url: order.platformInvoiceUrl });
        if (order.gtaInvoiceUrl) invoices.push({ name: "Shipping Invoice", url: order.gtaInvoiceUrl });
        
        if (invoices.length === 0) {
            alert("No invoices available to download.");
            return;
        }
        
        // Open all invoices in new tabs
        invoices.forEach((inv, index) => {
            setTimeout(() => {
                window.open(inv.url, '_blank');
            }, index * 300);
        });
    };

    // Download invoice (simple version - keeps existing)
    const downloadInvoice = (order) => {
        if (order.invoicePdfUrl) {
            window.open(order.invoicePdfUrl, '_blank');
        } else {
            alert("Invoice not generated yet. Please check back later.");
        }
    };

    // 🆕 Print invoice
    const printInvoice = (order) => {
        if (order.invoicePdfUrl) {
            window.open(order.invoicePdfUrl, '_blank');
            setTimeout(() => window.print(), 1000);
        } else {
            alert("Invoice not available to print.");
        }
    };

    const closeModal = () => {
        setShowInvoiceModal(false);
        setSelectedOrder(null);
        setOrderInvoices([]);
    };

    const getStatusBadge = (status) => {
        const badges = {
            'PENDING': { bg: '#fef3c7', color: '#d97706', text: '⏳ Pending' },
            'CONFIRMED': { bg: '#dbeafe', color: '#1e40af', text: '✅ Confirmed' },
            'SHIPPED': { bg: '#e0f2fe', color: '#0369a1', text: '🚚 Shipped' },
            'DELIVERED': { bg: '#dcfce7', color: '#15803d', text: '🎉 Delivered' },
            'CANCELLED': { bg: '#fee2e2', color: '#dc2626', text: '❌ Cancelled' }
        };
        return badges[status] || badges['PENDING'];
    };

    const styles = {
        container: { maxWidth: "1200px", margin: "0 auto", padding: "20px" },
        title: { fontSize: "28px", fontWeight: "bold", marginBottom: "20px", color: "#1e293b" },
        orderCard: {
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "16px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            border: "1px solid #e2e8f0",
            transition: "box-shadow 0.2s"
        },
        orderHeader: { display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px", flexWrap: "wrap", gap: "10px" },
        orderId: { fontSize: "14px", color: "#64748b" },
        productTitle: { fontSize: "18px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" },
        price: { fontSize: "20px", fontWeight: "bold", color: "#03bafc" },
        detailsRow: { display: "flex", gap: "20px", marginTop: "12px", flexWrap: "wrap" },
        detailItem: { fontSize: "13px", color: "#475569" },
        buttonGroup: { display: "flex", gap: "12px", marginTop: "15px", flexWrap: "wrap" },
        primaryBtn: {
            backgroundColor: "#03bafc",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            transition: "background-color 0.2s"
        },
        secondaryBtn: {
            backgroundColor: "#e2e8f0",
            color: "#475569",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px"
        },
        successBtn: {
            backgroundColor: "#22c55e",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px"
        },
        warningBtn: {
            backgroundColor: "#f59e0b",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px"
        },
        loading: { textAlign: "center", padding: "50px", fontSize: "18px", color: "#64748b" }
    };

    if (loading) {
        return <div style={styles.loading}>Loading your orders...</div>;
    }

    return (
        <div style={styles.container}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
                <h2 style={styles.title}>📦 My Orders</h2>
                {/* 🆕 Continue Shopping Button */}
                <Link to="/">
                    <button style={{
                        backgroundColor: "#e2e8f0",
                        color: "#475569",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "14px",
                        fontWeight: "500"
                    }}>
                        <FaShoppingBag /> Continue Shopping
                    </button>
                </Link>
            </div>

            {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                    <div style={{ fontSize: "60px", marginBottom: "20px" }}>🛒</div>
                    <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>No orders found</h3>
                    <p style={{ color: "#64748b", marginBottom: "20px" }}>
                        You haven't placed any orders yet. Start shopping now!
                    </p>
                    <Link to="/">
                        <button style={{
                            backgroundColor: "#03bafc",
                            color: "white",
                            border: "none",
                            padding: "12px 30px",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}>
                            Start Shopping
                        </button>
                    </Link>
                </div>
            ) : (
                orders.map((order) => {
                    const statusBadge = getStatusBadge(order.status);
                    return (
                        <div key={order.orderId} style={styles.orderCard}>
                            <div style={styles.orderHeader}>
                                <div>
                                    <div style={styles.orderId}>Order #{order.orderId}</div>
                                    <div style={styles.productTitle}>{order.productTitle}</div>
                                </div>
                                <div style={{
                                    backgroundColor: statusBadge.bg,
                                    color: statusBadge.color,
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "12px",
                                    fontWeight: "500"
                                }}>
                                    {statusBadge.text}
                                </div>
                            </div>

                            <div style={styles.detailsRow}>
                                <div style={styles.detailItem}>📅 {new Date(order.orderDate).toLocaleDateString()}</div>
                                <div style={styles.detailItem}>📂 {order.category}</div>
                                <div style={styles.detailItem}>💰 ₹{order.customerFinalPrice || order.totalPrice}</div>
                            </div>

                            <div style={styles.price}>
                                Total Amount: ₹{order.customerFinalPrice || order.totalPrice}
                            </div>

                            <div style={styles.buttonGroup}>
                                {order.invoiceGenerated ? (
                                    <>
                                        <button
                                            onClick={() => downloadInvoice(order)}
                                            style={styles.primaryBtn}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0284c7"}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#03bafc"}
                                        >
                                            <FaDownload /> Product Invoice
                                        </button>
                                        <button
                                            onClick={() => fetchOrderInvoices(order)}
                                            style={styles.successBtn}
                                        >
                                            <FaEye /> View All Invoices
                                        </button>
                                        {/* 🆕 Print Invoice Button */}
                                        <button
                                            onClick={() => printInvoice(order)}
                                            style={styles.warningBtn}
                                        >
                                            <FaPrint /> Print
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => alert("Invoice will be generated once order is confirmed")}
                                        style={styles.secondaryBtn}
                                    >
                                        <FaFilePdf /> Invoice Pending
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })
            )}

            {/* Invoice Modal Component */}
            <InvoiceModal
                isOpen={showInvoiceModal}
                onClose={closeModal}
                invoices={orderInvoices}
                orderId={selectedOrder?.orderId}
                onDownload={downloadSingleInvoice}
            />
        </div>
    );
};

export default CustomerOrders;