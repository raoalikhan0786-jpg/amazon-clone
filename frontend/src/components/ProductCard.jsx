// frontend/src/components/ProductCard.jsx

import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
    // Format price with commas
    const formatPrice = (price) => {
        if (!price) return "0";
        const num = parseFloat(price);
        if (isNaN(num)) return price;
        return num.toLocaleString('en-IN');
    };

    // Get rating stars
    const getStars = (rating) => {
        const numRating = parseFloat(rating) || 0;
        const fullStars = Math.floor(numRating);
        const halfStar = numRating - fullStars >= 0.5;
        const stars = [];
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push('⭐');
            } else if (i === fullStars && halfStar) {
                stars.push('⭐');
            } else {
                stars.push('☆');
            }
        }
        return stars.join('');
    };

    return (
        <div className="product-card" style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '15px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            cursor: 'pointer',
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        }}
        >
            {/* Product Image */}
            <div style={{
                position: 'relative',
                width: '100%',
                paddingBottom: '75%',
                backgroundColor: '#f8fafc',
                borderRadius: '8px',
                overflow: 'hidden',
                marginBottom: '12px'
            }}>
                <img 
                    src={product.image || product.mainImage || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"} 
                    alt={product.title || product.name || "Product"} 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                
                {/* Tag/Badge */}
                {product.tag && (
                    <span style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: '#03bafc',
                        color: 'white',
                        padding: '2px 10px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold'
                    }}>
                        {product.tag}
                    </span>
                )}
                
                {/* Stock status */}
                {product.stock === 0 && (
                    <span style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '5px 15px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}>
                        Out of Stock
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Title */}
                <h3 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: '0 0 6px 0',
                    color: '#1e293b',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    lineHeight: '1.4',
                    minHeight: '38px'
                }}>
                    {product.title || product.name || "Product"}
                </h3>

                {/* Rating */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '6px'
                }}>
                    <span style={{
                        backgroundColor: '#22c55e',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 'bold'
                    }}>
                        {product.rating || product.rating || '4.5'}
                    </span>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>
                        {getStars(product.rating || product.rating || 4.5)}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        ({product.reviews || product.reviews || '0'})
                    </span>
                </div>

                {/* Price */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px',
                    flexWrap: 'wrap'
                }}>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#1e293b'
                    }}>
                        ₹{formatPrice(product.price || product.sellingPrice || 0)}
                    </span>
                    {product.mrp && product.mrp > (product.price || product.sellingPrice || 0) && (
                        <span style={{
                            fontSize: '13px',
                            color: '#94a3b8',
                            textDecoration: 'line-through'
                        }}>
                            ₹{formatPrice(product.mrp)}
                        </span>
                    )}
                    {product.mrp && product.price && (
                        <span style={{
                            fontSize: '12px',
                            color: '#16a34a',
                            fontWeight: 'bold'
                        }}>
                            {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                        </span>
                    )}
                </div>

                {/* Category */}
                <div style={{
                    fontSize: '11px',
                    color: '#94a3b8',
                    marginBottom: '8px'
                }}>
                    {product.category || 'Uncategorized'}
                </div>

                {/* Add to Cart Button */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCart) {
                            onAddToCart(product);
                        }
                    }}
                    disabled={product.stock === 0}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: product.stock === 0 ? '#94a3b8' : '#03bafc',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                        transition: 'background-color 0.2s',
                        marginTop: 'auto'
                    }}
                    onMouseEnter={(e) => {
                        if (product.stock !== 0) {
                            e.currentTarget.style.backgroundColor = '#0284c7';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (product.stock !== 0) {
                            e.currentTarget.style.backgroundColor = '#03bafc';
                        }
                    }}
                >
                    {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;