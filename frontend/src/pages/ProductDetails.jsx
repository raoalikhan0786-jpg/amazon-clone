// frontend/src/pages/ProductDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaArrowLeft, FaCheck, FaTruck, FaShieldAlt, FaRotateLeft } from "react-icons/fa";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        // Load product from localStorage
        const products = JSON.parse(localStorage.getItem("allProducts") || "[]");
        const foundProduct = products.find(p => p.id === id || p.id === parseInt(id));
        
        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedImage(foundProduct.image || foundProduct.mainImage || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500");
        } else {
            // If product not found in localStorage, try sample data
            const sampleProducts = [
                {
                    id: 1,
                    title: "Azora Wireless Noise Cancelling Headphones - Midnight Black",
                    price: 2999,
                    mrp: 5999,
                    rating: 4.5,
                    reviews: 1240,
                    category: "Electronics",
                    description: "Premium wireless headphones with active noise cancellation, 40-hour battery life, and crystal clear audio quality. Perfect for music lovers and professionals.",
                    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
                    stock: 15,
                    tag: "Best Seller",
                    warranty: "1 Year",
                    returnDays: 7
                },
                {
                    id: 2,
                    title: "Sport Smart Watch v2 - 1.43\" AMOLED Display, GPS, Bluetooth Calling",
                    price: 4999,
                    mrp: 9999,
                    rating: 4.2,
                    reviews: 856,
                    category: "Electronics",
                    description: "Advanced smartwatch with AMOLED display, built-in GPS, heart rate monitor, and Bluetooth calling. Track your fitness and stay connected.",
                    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
                    stock: 8,
                    tag: "Top Deal",
                    warranty: "6 Months",
                    returnDays: 7
                }
            ];
            
            const sampleProduct = sampleProducts.find(p => p.id === parseInt(id));
            if (sampleProduct) {
                setProduct(sampleProduct);
                setSelectedImage(sampleProduct.image);
            } else {
                // Product not found
                setProduct(null);
            }
        }
        setLoading(false);
    }, [id]);

    const addToCart = () => {
        if (!product) return;
        
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        
        // Check if product already in cart
        const existingIndex = cart.findIndex(item => item.id === product.id);
        if (existingIndex !== -1) {
            cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price || product.sellingPrice,
                mrp: product.mrp,
                image: product.image || product.mainImage,
                category: product.category,
                sellerName: product.sellerName || "Azora Seller",
                stock: product.stock || product.stockQuantity || 10,
                quantity: quantity
            });
        }
        
        localStorage.setItem("cart", JSON.stringify(cart));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    const handleQuantityChange = (type) => {
        if (type === "increment") {
            if (quantity < (product?.stock || 10)) {
                setQuantity(prev => prev + 1);
            }
        } else {
            if (quantity > 1) {
                setQuantity(prev => prev - 1);
            }
        }
    };

    const formatPrice = (price) => {
        if (!price) return "0";
        return Number(price).toLocaleString('en-IN');
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<FaStar key={i} style={{ color: "#f59e0b" }} />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<FaStarHalfAlt key={i} style={{ color: "#f59e0b" }} />);
            } else {
                stars.push(<FaRegStar key={i} style={{ color: "#f59e0b" }} />);
            }
        }
        return stars;
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <div style={{ fontSize: "18px", color: "#64748b" }}>Loading product details...</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ maxWidth: "600px", margin: "100px auto", textAlign: "center", padding: "40px" }}>
                <div style={{ fontSize: "48px", marginBottom: "20px" }}>😕</div>
                <h2 style={{ color: "#1e293b", marginBottom: "10px" }}>Product Not Found</h2>
                <p style={{ color: "#64748b", marginBottom: "20px" }}>The product you're looking for doesn't exist or has been removed.</p>
                <Link to="/">
                    <button style={{
                        backgroundColor: "#03bafc",
                        color: "white",
                        border: "none",
                        padding: "10px 24px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}>
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    const discount = product.mrp && product.price ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;
    const inStock = (product.stock || product.stockQuantity || 0) > 0;

    return (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
            
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "none",
                    border: "none",
                    color: "#64748b",
                    cursor: "pointer",
                    marginBottom: "20px",
                    fontSize: "14px"
                }}
            >
                <FaArrowLeft /> Back
            </button>

            {/* Product Main Section */}
            <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
                
                {/* Left Column - Images */}
                <div style={{ flex: "1", minWidth: "280px" }}>
                    <div style={{
                        backgroundColor: "#f8fafc",
                        borderRadius: "12px",
                        overflow: "hidden",
                        height: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <img
                            src={selectedImage}
                            alt={product.title}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain"
                            }}
                        />
                    </div>
                    
                    {/* Thumbnails (if multiple images) */}
                    {product.galleryImages && product.galleryImages.length > 0 && (
                        <div style={{ display: "flex", gap: "10px", marginTop: "10px", overflowX: "auto" }}>
                            <div
                                style={{
                                    width: "70px",
                                    height: "70px",
                                    border: "2px solid #03bafc",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    flexShrink: 0
                                }}
                                onClick={() => setSelectedImage(product.image || product.mainImage)}
                            >
                                <img
                                    src={product.image || product.mainImage}
                                    alt="Main"
                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                            </div>
                            {product.galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        border: "2px solid #e2e8f0",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        cursor: "pointer",
                                        flexShrink: 0
                                    }}
                                    onClick={() => setSelectedImage(img)}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#03bafc"}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#e2e8f0"}
                                >
                                    <img
                                        src={img}
                                        alt={`Gallery ${idx}`}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column - Product Info */}
                <div style={{ flex: "1.5", minWidth: "300px" }}>
                    
                    {/* Tag */}
                    {product.tag && (
                        <span style={{
                            display: "inline-block",
                            backgroundColor: "#03bafc",
                            color: "white",
                            padding: "2px 12px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "bold",
                            marginBottom: "10px"
                        }}>
                            {product.tag}
                        </span>
                    )}

                    {/* Title */}
                    <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "10px" }}>
                        {product.title}
                    </h1>

                    {/* Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                        <div style={{ display: "flex", gap: "2px" }}>
                            {renderStars(product.rating || 4.0)}
                        </div>
                        <span style={{ fontSize: "14px", color: "#64748b" }}>
                            {product.reviews || 0} reviews
                        </span>
                    </div>

                    {/* Price */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                        <span style={{ fontSize: "32px", fontWeight: "bold", color: "#1e293b" }}>
                            ₹{formatPrice(product.price || product.sellingPrice)}
                        </span>
                        {product.mrp && product.mrp > (product.price || product.sellingPrice) && (
                            <>
                                <span style={{ fontSize: "18px", color: "#94a3b8", textDecoration: "line-through" }}>
                                    ₹{formatPrice(product.mrp)}
                                </span>
                                <span style={{
                                    backgroundColor: "#dcfce7",
                                    color: "#16a34a",
                                    padding: "4px 12px",
                                    borderRadius: "4px",
                                    fontSize: "14px",
                                    fontWeight: "bold"
                                }}>
                                    {discount}% OFF
                                </span>
                            </>
                        )}
                    </div>

                    {/* GST Info */}
                    <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
                        Inclusive of all taxes
                    </div>

                    {/* Stock Status */}
                    <div style={{ marginBottom: "16px" }}>
                        {inStock ? (
                            <span style={{ color: "#16a34a", fontWeight: "bold" }}>
                                ✅ In Stock ({product.stock || product.stockQuantity || 0} units)
                            </span>
                        ) : (
                            <span style={{ color: "#dc2626", fontWeight: "bold" }}>
                                ❌ Out of Stock
                            </span>
                        )}
                    </div>

                    {/* Category */}
                    <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>
                        📂 {product.category || "Uncategorized"}
                        {product.subCategory && ` → ${product.subCategory}`}
                        {product.productType && ` → ${product.productType}`}
                    </div>

                    {/* Quantity Selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                        <span style={{ fontWeight: "500", color: "#475569" }}>Quantity:</span>
                        <div style={{ display: "flex", alignItems: "center", border: "1px solid #cbd5e1", borderRadius: "8px", overflow: "hidden" }}>
                            <button
                                onClick={() => handleQuantityChange("decrement")}
                                disabled={quantity <= 1 || !inStock}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#f8fafc",
                                    border: "none",
                                    cursor: quantity <= 1 || !inStock ? "not-allowed" : "pointer",
                                    fontSize: "16px",
                                    color: quantity <= 1 || !inStock ? "#94a3b8" : "#1e293b"
                                }}
                            >
                                −
                            </button>
                            <span style={{ padding: "8px 20px", minWidth: "40px", textAlign: "center" }}>
                                {quantity}
                            </span>
                            <button
                                onClick={() => handleQuantityChange("increment")}
                                disabled={quantity >= (product.stock || 10) || !inStock}
                                style={{
                                    padding: "8px 16px",
                                    backgroundColor: "#f8fafc",
                                    border: "none",
                                    cursor: quantity >= (product.stock || 10) || !inStock ? "not-allowed" : "pointer",
                                    fontSize: "16px",
                                    color: quantity >= (product.stock || 10) || !inStock ? "#94a3b8" : "#1e293b"
                                }}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        <button
                            onClick={addToCart}
                            disabled={!inStock}
                            style={{
                                flex: 1,
                                padding: "14px 30px",
                                backgroundColor: !inStock ? "#94a3b8" : "#03bafc",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "bold",
                                cursor: !inStock ? "not-allowed" : "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                minWidth: "150px"
                            }}
                        >
                            <FaShoppingCart /> {!inStock ? "Out of Stock" : "Add to Cart"}
                        </button>
                        
                        {addedToCart && (
                            <div style={{
                                backgroundColor: "#dcfce7",
                                color: "#16a34a",
                                padding: "12px 20px",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                fontSize: "14px"
                            }}>
                                <FaCheck /> Added to Cart!
                            </div>
                        )}
                    </div>

                    {/* Delivery Information */}
                    <div style={{
                        marginTop: "24px",
                        paddingTop: "20px",
                        borderTop: "1px solid #e2e8f0",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "16px"
                    }}>
                        <div style={{ textAlign: "center" }}>
                            <FaTruck style={{ fontSize: "24px", color: "#03bafc", marginBottom: "6px" }} />
                            <div style={{ fontSize: "12px", fontWeight: "500", color: "#1e293b" }}>Free Delivery</div>
                            <div style={{ fontSize: "11px", color: "#64748b" }}>Within 3-5 days</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <FaShieldAlt style={{ fontSize: "24px", color: "#03bafc", marginBottom: "6px" }} />
                            <div style={{ fontSize: "12px", fontWeight: "500", color: "#1e293b" }}>
                                {product.warranty || "Warranty Available"}
                            </div>
                            <div style={{ fontSize: "11px", color: "#64748b" }}>Manufacturer Warranty</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <FaRotateLeft style={{ fontSize: "24px", color: "#03bafc", marginBottom: "6px" }} />
                            <div style={{ fontSize: "12px", fontWeight: "500", color: "#1e293b" }}>
                                {product.returnDays || 7} Days Return
                            </div>
                            <div style={{ fontSize: "11px", color: "#64748b" }}>Easy Returns</div>
                        </div>
                    </div>

                    {/* Description */}
                    <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #e2e8f0" }}>
                        <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>
                            Product Description
                        </h3>
                        <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.6" }}>
                            {product.description || "No description available for this product."}
                        </p>
                    </div>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                        <div style={{ marginTop: "16px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>
                                Key Features
                            </h3>
                            <ul style={{ fontSize: "14px", color: "#475569", lineHeight: "1.8", paddingLeft: "20px" }}>
                                {product.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Specifications */}
                    {product.specifications && Object.keys(product.specifications).length > 0 && (
                        <div style={{ marginTop: "16px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>
                                Specifications
                            </h3>
                            <div style={{ fontSize: "14px", color: "#475569", lineHeight: "1.8" }}>
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} style={{ display: "flex", gap: "16px", borderBottom: "1px solid #f1f5f9", padding: "4px 0" }}>
                                        <span style={{ fontWeight: "500", minWidth: "120px" }}>{key}:</span>
                                        <span>{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;