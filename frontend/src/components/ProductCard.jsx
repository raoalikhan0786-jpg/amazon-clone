import { useContext }
from "react";

import { StoreContext }
from "../context/StoreContext";

const ProductCard = ({ product }) => {

  const { addToCart } =
    useContext(StoreContext);

  return (

    <div className="card">

      <img
        src={product.image}
        alt=""
      />

      <h3>
        {product.title}
      </h3>

      <p>
        ₹{product.price}
      </p>

      <button
        onClick={() =>
          addToCart(product)
        }
      >
        Add To Cart
      </button>

    </div>

  );

};

export default ProductCard;