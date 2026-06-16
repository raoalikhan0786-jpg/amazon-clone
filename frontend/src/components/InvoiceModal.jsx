// frontend/src/components/InvoiceModal.jsx

import React from 'react';
import { FaDownload, FaPrint, FaTimes, FaFilePdf, FaEye } from 'react-icons/fa';

const InvoiceModal = ({ isOpen, onClose, invoices, orderId, onDownload }) => {
    if (!isOpen) return null;

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        modal: {
            backgroundColor: 'white',
            borderRadius: '16px',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc'
        },
        headerTitle: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1e293b',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        closeBtn: {
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#64748b',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.2s'
        },
        body: {
            padding: '20px 24px',
            overflowY: 'auto',
            flex: 1
        },
        footer: {
            padding: '16px 24px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            backgroundColor: '#f8fafc'
        },
        invoiceCard: {
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.2s',
            cursor: 'pointer',
            backgroundColor: 'white'
        },
        invoiceCardHover: {
            borderColor: '#03bafc',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        },
        invoiceInfo: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        invoiceNumber: {
            fontWeight: 'bold',
            fontSize: '14px',
            color: '#1e293b'
        },
        invoiceMeta: {
            fontSize: '12px',
            color: '#64748b',
            display: 'flex',
            gap: '16px'
        },
        badge: {
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: 'bold'
        },
        productBadge: {
            backgroundColor: '#dbeafe',
            color: '#1e40af'
        },
        platformBadge: {
            backgroundColor: '#fef3c7',
            color: '#b45309'
        },
        shippingBadge: {
            backgroundColor: '#dcfce7',
            color: '#15803d'
        },
        buttonGroup: {
            display: 'flex',
            gap: '10px'
        },
        iconBtn: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
        },
        primaryBtn: {
            backgroundColor: '#03bafc',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        secondaryBtn: {
            backgroundColor: '#e2e8f0',
            color: '#475569',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        noInvoices: {
            textAlign: 'center',
            padding: '40px',
            color: '#64748b'
        }
    };

    const getBadgeStyle = (type) => {
        if (type === 'product') return styles.productBadge;
        if (type === 'platform') return styles.platformBadge;
        return styles.shippingBadge;
    };

    const getBadgeText = (type) => {
        if (type === 'product') return 'Product Invoice';
        if (type === 'platform') return 'Platform Fee';
        return 'Shipping Invoice';
    };

    const [hoveredCard, setHoveredCard] = React.useState(null);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerTitle}>
                        <FaFilePdf style={{ color: '#dc2626' }} />
                        <span>Invoices for Order #{orderId}</span>
                    </div>
                    <button style={styles.closeBtn} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div style={styles.body}>
                    {invoices && invoices.length > 0 ? (
                        invoices.map((invoice, index) => (
                            <div
                                key={index}
                                style={{
                                    ...styles.invoiceCard,
                                    ...(hoveredCard === index ? styles.invoiceCardHover : {})
                                }}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div style={styles.invoiceInfo}>
                                    <div style={styles.invoiceNumber}>
                                        {invoice.invoiceNumber}
                                    </div>
                                    <div style={styles.invoiceMeta}>
                                        <span>📅 {new Date(invoice.invoiceDate).toLocaleDateString()}</span>
                                        <span>💰 ₹{invoice.totalAmount?.toFixed(2) || '0'}</span>
                                        <span style={{ ...styles.badge, ...getBadgeStyle(invoice.invoiceType) }}>
                                            {getBadgeText(invoice.invoiceType)}
                                        </span>
                                    </div>
                                </div>
                                <div style={styles.buttonGroup}>
                                    <button
                                        style={{ ...styles.iconBtn, color: '#3b82f6' }}
                                        onClick={() => window.open(invoice.invoicePdfUrl, '_blank')}
                                        title="View Invoice"
                                    >
                                        <FaEye size={18} />
                                    </button>
                                    <button
                                        style={{ ...styles.iconBtn, color: '#16a34a' }}
                                        onClick={() => onDownload(invoice.invoiceNumber, invoice.invoicePdfUrl)}
                                        title="Download Invoice"
                                    >
                                        <FaDownload size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={styles.noInvoices}>
                            <FaFilePdf size={48} style={{ color: '#cbd5e1', marginBottom: '16px' }} />
                            <p>No invoices found for this order.</p>
                            <p style={{ fontSize: '12px', marginTop: '8px' }}>
                                Invoices will appear once your order is confirmed.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={styles.footer}>
                    <button style={styles.secondaryBtn} onClick={onClose}>
                        Close
                    </button>
                    {invoices && invoices.length > 0 && (
                        <button
                            style={styles.primaryBtn}
                            onClick={() => {
                                invoices.forEach(inv => {
                                    onDownload(inv.invoiceNumber, inv.invoicePdfUrl);
                                });
                            }}
                        >
                            <FaDownload /> Download All
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoiceModal;