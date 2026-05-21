import { useEffect, useState } from "react";

import API from "../api";

import ProductCard from "../components/ProductCard";

import HeroSlider from "../components/HeroSlider";

const Home = () => {

  const [products, setProducts] =
    useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const { data } =
        await API.get("/products");

      setProducts(data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="home">

      {/* HERO SLIDER */}

      <HeroSlider />

      {/* CATEGORY SECTION */}

      <div className="category-row">

        <div className="category-box">
          Electronics
        </div>

        <div className="category-box">
          Fashion
        </div>

        <div className="category-box">
          Gaming
        </div>

        <div className="category-box">
          Mobiles
        </div>

      </div>

      {/* PRODUCTS SECTION */}

      <h2 className="section-title">
        Today's Deals
      </h2>

      <div className="products">

        {products.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

      {/* FOOTER */}

      <div className="footer">

        <h2>Amazon Clone</h2>

        <p>
          Made with React & Node.js
        </p>

      </div>

    </div>

  );

};

export default Home;