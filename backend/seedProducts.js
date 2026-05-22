import mongoose from "mongoose";

import dotenv from "dotenv";

import Product from "./models/Product.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const products = [

    {
        title: "iPhone 15",
        image:
            "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg",
        price: 79999,
        description: "Apple smartphone",
        category: "Mobile",
        rating: 5
    },

    {
        title: "Samsung TV",
        image:
            "https://m.media-amazon.com/images/I/71RxCmvnrbL._SX679_.jpg",
        price: 45999,
        description: "Smart LED TV",
        category: "Electronics",
        rating: 4
    },

    {
        title: "Gaming Laptop",
        image:
            "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg",
        price: 69999,
        description: "High performance laptop",
        category: "Laptop",
        rating: 5
    }

];

const seedData = async () => {

    try {

        await Product.deleteMany();

        await Product.insertMany(products);

        console.log(
            "Products Added"
        );

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

seedData();