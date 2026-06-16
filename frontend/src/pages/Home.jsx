// import React from "react";
// // सभी होमपेज से जुड़े कंपोनेंट्स इम्पोर्ट किए गए हैं
// import Hero from "../components/Hero";
// import Categories from "../components/Categories";
// import Trending from "../components/Trending";
// import Footer from "../components/Footer";

// const Home = () => {
//   // प्रोडक्ट्स की लिस्ट
//   const liveProducts = [
//     {
//       id: 1,
//       title: "Azora Wireless Noise Cancelling Headphones - Midnight Black",
//       price: "2,999",
//       mrp: "5,999",
//       rating: "4.5",
//       reviews: "1,240",
//       image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
//       tag: "Best Seller"
//     },
//     {
//       id: 2,
//       title: "Sport Smart Watch v2 - 1.43\" AMOLED Display, GPS, Bluetooth Calling",
//       price: "4,999",
//       mrp: "9,999",
//       rating: "4.2",
//       reviews: "856",
//       image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
//       tag: "Top Deal"
//     },
//     {
//       id: 3,
//       title: "Minimalist Ceramic Coffee Mug with Wooden Coaster (350ml)",
//       price: "499",
//       mrp: "999",
//       rating: "4.8",
//       reviews: "312",
//       image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
//       tag: ""
//     },
//     {
//       id: 4,
//       title: "Premium Matte Black Sunglasses - UV400 Protection, Polarized",
//       price: "899",
//       mrp: "2,499",
//       rating: "4.0",
//       reviews: "1,945",
//       image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
//       tag: "Limited Deal"
//     }
//   ];

//   return (
//     <div style={{ backgroundColor: "#eaeded", minHeight: "100vh" }}>
//       {/* 1. अमेज़न स्टाइल मुख्य हीरो बैनर */}
//       <Hero />

//       {/* 🌟 2. कैटेगरीज ग्रिड सेक्शन - यहाँ हमने मार्जिन को ज़बरदस्ती नीचे खिसका दिया है 
//           ताकि यह हीरो बैनर को आधा न छुपाए और उसके ठीक नीचे दिखे */}
//       <div style={{ marginTop: "20px", position: "relative", zIndex: "5", padding: "0 20px" }}>
//         <Categories />
//       </div>

//       {/* 3. ट्रेंडिंग प्रोडक्ट्स ग्रिड सेक्शन */}
//       <Trending />

//       {/* 4. नया प्रोडक्ट ग्रिड सेक्शन जो सेलर के सामान को दिखाता है */}
//       <div className="customer-products-section">
//         <h2 className="products-section-heading">Trending Deals For You</h2>

//         <div className="customer-products-grid">
//           {liveProducts.map((product) => (
//             <div key={product.id} className="customer-product-card">

//               {product.tag && <span className="product-badge-tag">{product.tag}</span>}

//               <div className="product-card-img-container">
//                 <img src={product.image} alt={product.title} />
//               </div>

//               <div className="product-card-info-box">
//                 <h3 className="product-card-title-text">{product.title}</h3>

//                 <div className="product-card-rating-row">
//                   <span className="stars-gold">⭐⭐⭐⭐★</span>
//                   <span className="rating-count-text">({product.reviews})</span>
//                 </div>

//                 <div className="product-card-price-row">
//                   <span className="currency-symbol">₹</span>
//                   <span className="actual-price-number">{product.price}</span>
//                   <span className="mrp-strike-price">M.R.P: ₹{product.mrp}</span>
//                 </div>

//                 <div className="azora-prime-delivery-batch">
//                   <span className="checkmark-icon">✓</span> prime
//                 </div>

//                 <button className="customer-add-to-cart-btn">
//                   Add to Cart
//                 </button>
//               </div>

//             </div>
//           ))}
//         </div>
//       </div>

//       {/* 5. बड़ा फुटर */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
// सभी होमपेज से जुड़े कंपोनेंट्स इम्पोर्ट किए गए हैं
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Trending from "../components/Trending";
import Footer from "../components/Footer";

const Home = () => {
  // 🆕 State for products from localStorage
  const [liveProducts, setLiveProducts] = useState([
    {
      id: 1,
      title: "Azora Wireless Noise Cancelling Headphones - Midnight Black",
      price: "2,999",
      mrp: "5,999",
      rating: "4.5",
      reviews: "1,240",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      tag: "Best Seller"
    },
    {
      id: 2,
      title: "Sport Smart Watch v2 - 1.43\" AMOLED Display, GPS, Bluetooth Calling",
      price: "4,999",
      mrp: "9,999",
      rating: "4.2",
      reviews: "856",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      tag: "Top Deal"
    },
    {
      id: 3,
      title: "Minimalist Ceramic Coffee Mug with Wooden Coaster (350ml)",
      price: "499",
      mrp: "999",
      rating: "4.8",
      reviews: "312",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500",
      tag: ""
    },
    {
      id: 4,
      title: "Premium Matte Black Sunglasses - UV400 Protection, Polarized",
      price: "899",
      mrp: "2,499",
      rating: "4.0",
      reviews: "1,945",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      tag: "Limited Deal"
    }
  ]);

  // 🆕 Load products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("allProducts") || "[]");
    
    if (storedProducts.length > 0) {
      // Convert stored products to match the display format
      const formattedProducts = storedProducts.map((product, index) => ({
        id: product.id || index + 100,
        title: product.title || "Product",
        price: product.price || product.sellingPrice || "0",
        mrp: product.mrp || "0",
        rating: "4.0",
        reviews: "0",
        image: product.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        tag: product.category || "",
        // Store original product data for cart
        originalProduct: product
      }));
      
      setLiveProducts(formattedProducts);
    }
  }, []);

  // 🆕 Add to Cart function
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ 
        ...product, 
        quantity: 1,
        // Use original product data if available
        price: product.originalProduct?.sellingPrice || product.price,
        image: product.originalProduct?.image || product.image
      });
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`✅ "${product.title}" added to cart!`);
  };

  return (
    <div style={{ backgroundColor: "#eaeded", minHeight: "100vh" }}>
      {/* 1. अमेज़न स्टाइल मुख्य हीरो बैनर */}
      <Hero />

      {/* 🌟 2. कैटेगरीज ग्रिड सेक्शन */}
      <div style={{ marginTop: "20px", position: "relative", zIndex: "5", padding: "0 20px" }}>
        <Categories />
      </div>

      {/* 3. ट्रेंडिंग प्रोडक्ट्स ग्रिड सेक्शन */}
      <Trending />

      {/* 4. नया प्रोडक्ट ग्रिड सेक्शन जो सेलर के सामान को दिखाता है */}
      <div className="customer-products-section">
        <h2 className="products-section-heading">
          {liveProducts.length > 4 ? "🔥 Seller Products" : "Trending Deals For You"}
        </h2>

        <div className="customer-products-grid">
          {liveProducts.map((product) => (
            <div key={product.id} className="customer-product-card">

              {product.tag && <span className="product-badge-tag">{product.tag}</span>}

              <div className="product-card-img-container">
                <img src={product.image} alt={product.title} />
              </div>

              <div className="product-card-info-box">
                <h3 className="product-card-title-text">{product.title}</h3>

                <div className="product-card-rating-row">
                  <span className="stars-gold">⭐⭐⭐⭐★</span>
                  <span className="rating-count-text">({product.reviews})</span>
                </div>

                <div className="product-card-price-row">
                  <span className="currency-symbol">₹</span>
                  <span className="actual-price-number">{product.price}</span>
                  <span className="mrp-strike-price">M.R.P: ₹{product.mrp}</span>
                </div>

                <div className="azora-prime-delivery-batch">
                  <span className="checkmark-icon">✓</span> prime
                </div>

                <button 
                  className="customer-add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))}
        </div>
        
        {/* 🆕 Show message if no products */}
        {liveProducts.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            <p>No products available at the moment. Please check back later!</p>
          </div>
        )}
      </div>

      {/* 5. बड़ा फुटर */}
      <Footer />
    </div>
  );
};

export default Home;