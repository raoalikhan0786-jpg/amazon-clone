// import { useContext }
// from "react";

// import { Link }
// from "react-router-dom";

// import { StoreContext }
// from "../context/StoreContext";

// const Cart = () => {

//   const {

//     cart,

//     removeFromCart

//   } = useContext(StoreContext);

//   const totalPrice =

//     cart.reduce(

//       (acc, item) =>

//         acc + item.price,

//       0

//     );

//   return (

//     <div className="cart-page">

//       <h2>
//         Shopping Cart
//       </h2>

//       {

//         cart.length === 0 ? (

//           <p>
//             Cart is Empty
//           </p>

//         ) : (

//           <>

//             {

//               cart.map(

//                 (item, index) => (

//                 <div

//                   key={index}

//                   className="cart-item"

//                 >

//                   <img

//                     src={item.image}

//                     alt=""

//                   />

//                   <div>

//                     <h3>
//                       {item.title}
//                     </h3>

//                     <p>
//                       ₹{item.price}
//                     </p>

//                     <button

//                       onClick={() =>

//                         removeFromCart(index)

//                       }

//                     >

//                       Remove

//                     </button>

//                   </div>

//                 </div>

//               ))

//             }

//             <h2>
//               Total:
//               ₹{totalPrice}
//             </h2>

//             <Link to="/checkout">

//               <button
//                 className="checkout-btn"
//               >

//                 Proceed To Checkout

//               </button>

//             </Link>

//           </>

//         )

//       }

//     </div>

//   );

// };

// export default Cart;
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(StoreContext);
  
  // 🆕 State for cart items with quantity
  const [cartItems, setCartItems] = useState([]);

  // 🆕 Load cart from localStorage if StoreContext not available
  useEffect(() => {
    if (!cart || cart.length === 0) {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(storedCart);
    } else {
      setCartItems(cart);
    }
  }, [cart]);

  // 🆕 Calculate total price with quantity
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  // 🆕 Total items count
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  // 🆕 Update quantity handler
  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    // If StoreContext has updateQuantity function
    if (updateQuantity) {
      updateQuantity(index, newQuantity);
    }
  };

  // 🆕 Remove item handler
  const handleRemoveItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    if (removeFromCart) {
      removeFromCart(index);
    }
  };

  // 🆕 Clear cart handler
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      setCartItems([]);
      localStorage.removeItem("cart");
      if (clearCart) {
        clearCart();
      }
    }
  };

  // 🆕 Get product image
  const getProductImage = (item) => {
    return item.image || item.mainImage || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500";
  };

  // 🆕 Get product title
  const getProductTitle = (item) => {
    return item.title || item.name || "Product";
  };

  // 🆕 Get product price
  const getProductPrice = (item) => {
    return item.price || item.sellingPrice || 0;
  };

  // 🆕 Get product stock
  const getProductStock = (item) => {
    return item.stock || item.stockQuantity || 999;
  };

  return (
    <div className="cart-page" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      
      {/* 🆕 Cart Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>🛒 Shopping Cart</h2>
        {cartItems.length > 0 && (
          <button 
            onClick={handleClearCart}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px"
            }}
          >
            Clear Cart
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        // 🆕 Empty cart with navigation
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: "60px", marginBottom: "20px" }}>🛒</div>
          <h3 style={{ color: "#1e293b", marginBottom: "10px" }}>Your cart is empty</h3>
          <p style={{ color: "#64748b", marginBottom: "20px" }}>
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/">
            <button style={{
              background: "#03bafc",
              color: "white",
              border: "none",
              padding: "12px 30px",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer"
            }}>
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* 🆕 Cart Items Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="cart-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "16px",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  border: "1px solid #e2e8f0",
                  flexWrap: "wrap"
                }}
              >
                {/* 🆕 Product Image with link */}
                <Link to={`/product/${item.id}`} style={{ flexShrink: 0 }}>
                  <img
                    src={getProductImage(item)}
                    alt={getProductTitle(item)}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      backgroundColor: "#f8fafc"
                    }}
                  />
                </Link>

                {/* 🆕 Product Details */}
                <div style={{ flex: 1, minWidth: "150px" }}>
                  <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1e293b",
                      margin: "0 0 6px 0"
                    }}>
                      {getProductTitle(item)}
                    </h3>
                  </Link>
                  
                  {/* 🆕 Category */}
                  {item.category && (
                    <p style={{
                      fontSize: "12px",
                      color: "#94a3b8",
                      margin: "0 0 6px 0"
                    }}>
                      {item.category}
                    </p>
                  )}

                  {/* 🆕 Price with MRP */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                    <p style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#1e293b",
                      margin: 0
                    }}>
                      ₹{getProductPrice(item)}
                    </p>
                    {item.mrp && item.mrp > getProductPrice(item) && (
                      <p style={{
                        fontSize: "14px",
                        color: "#94a3b8",
                        textDecoration: "line-through",
                        margin: 0
                      }}>
                        ₹{item.mrp}
                      </p>
                    )}
                    {item.mrp && item.mrp > getProductPrice(item) && (
                      <span style={{
                        fontSize: "12px",
                        color: "#16a34a",
                        fontWeight: "bold"
                      }}>
                        {Math.round(((item.mrp - getProductPrice(item)) / item.mrp) * 100)}% off
                      </span>
                    )}
                  </div>
                </div>

                {/* 🆕 Quantity Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => handleQuantityChange(index, (item.quantity || 1) - 1)}
                    disabled={item.quantity <= 1}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1px solid #cbd5e1",
                      backgroundColor: item.quantity <= 1 ? "#f1f5f9" : "white",
                      cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: item.quantity <= 1 ? "#94a3b8" : "#1e293b"
                    }}
                  >
                    −
                  </button>
                  
                  <span style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    minWidth: "30px",
                    textAlign: "center"
                  }}>
                    {item.quantity || 1}
                  </span>
                  
                  <button
                    onClick={() => handleQuantityChange(index, (item.quantity || 1) + 1)}
                    disabled={(item.quantity || 1) >= (getProductStock(item) || 999)}
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      border: "1px solid #cbd5e1",
                      backgroundColor: (item.quantity || 1) >= (getProductStock(item) || 999) ? "#f1f5f9" : "white",
                      cursor: (item.quantity || 1) >= (getProductStock(item) || 999) ? "not-allowed" : "pointer",
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: (item.quantity || 1) >= (getProductStock(item) || 999) ? "#94a3b8" : "#1e293b"
                    }}
                  >
                    +
                  </button>
                </div>

                {/* 🆕 Remove Button */}
                <button
                  onClick={() => handleRemoveItem(index)}
                  style={{
                    backgroundColor: "#fee2e2",
                    color: "#dc2626",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                    fontWeight: "500"
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* 🆕 Cart Summary */}
          <div style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
              <div>
                <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 4px 0" }}>
                  Total Items: <strong>{totalItems}</strong>
                </p>
                <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 4px 0" }}>
                  Total Products: <strong>{cartItems.length}</strong>
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "13px", color: "#64748b", margin: "0" }}>Subtotal</p>
                <p style={{ fontSize: "28px", fontWeight: "bold", color: "#1e293b", margin: "0" }}>
                  ₹{totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            {/* 🆕 Action Buttons */}
            <div style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #e2e8f0",
              flexWrap: "wrap"
            }}>
              <Link to="/">
                <button style={{
                  backgroundColor: "#e2e8f0",
                  color: "#475569",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}>
                  Continue Shopping
                </button>
              </Link>
              
              <Link to="/checkout" style={{ marginLeft: "auto" }}>
                <button
                  className="checkout-btn"
                  style={{
                    backgroundColor: "#03bafc",
                    color: "white",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(3,186,252,0.3)"
                  }}
                >
                  🛒 Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;