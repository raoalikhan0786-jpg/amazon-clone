import { useContext }
from "react";

import { Link }
from "react-router-dom";

import { StoreContext }
from "../context/StoreContext";

const Cart = () => {

  const {

    cart,

    removeFromCart

  } = useContext(StoreContext);

  const totalPrice =

    cart.reduce(

      (acc, item) =>

        acc + item.price,

      0

    );

  return (

    <div className="cart-page">

      <h2>
        Shopping Cart
      </h2>

      {

        cart.length === 0 ? (

          <p>
            Cart is Empty
          </p>

        ) : (

          <>

            {

              cart.map(

                (item, index) => (

                <div

                  key={index}

                  className="cart-item"

                >

                  <img

                    src={item.image}

                    alt=""

                  />

                  <div>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      ₹{item.price}
                    </p>

                    <button

                      onClick={() =>

                        removeFromCart(index)

                      }

                    >

                      Remove

                    </button>

                  </div>

                </div>

              ))

            }

            <h2>
              Total:
              ₹{totalPrice}
            </h2>

            <Link to="/checkout">

              <button
                className="checkout-btn"
              >

                Proceed To Checkout

              </button>

            </Link>

          </>

        )

      }

    </div>

  );

};

export default Cart;