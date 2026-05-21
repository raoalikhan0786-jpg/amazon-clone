import { useContext, useState }
    from "react";

import { StoreContext }
    from "../context/StoreContext";

const Checkout = () => {

    const { cart } =
        useContext(StoreContext);

    const [address, setAddress] =
        useState("");

    const totalPrice =
        cart.reduce(

            (acc, item) =>

                acc + item.price,

            0

        );

    const placeOrder = () => {

        alert(
            "Proceeding To Payment"
        );

    };

    return (

        <div className="checkout">

            <div className="checkout-box">

                <h2>
                    Checkout
                </h2>

                <textarea

                    placeholder=
                    "Enter Delivery Address"

                    value={address}

                    onChange={(e) =>
                        setAddress(
                            e.target.value
                        )
                    }

                />

                <h3>
                    Total:
                    ₹{totalPrice}
                </h3>

                <button
                    onClick={placeOrder}
                >
                    Proceed To Payment
                </button>

            </div>

        </div>

    );

};

export default Checkout;