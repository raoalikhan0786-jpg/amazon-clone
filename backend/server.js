import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const seedProducts = async () => {

    try {

        const count =
            await Product.countDocuments();

        if (count === 0) {

            await Product.insertMany(products);

            console.log("Products Seeded");

        } else {

            console.log("Products Already Exist");

        }

    } catch (error) {

        console.log(error);

    }

};

seedProducts();

app.get("/", (req, res) => {

    res.send("API Running");

});

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running on ${PORT}`
    );

});