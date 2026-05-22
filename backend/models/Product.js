import mongoose from "mongoose";

const productSchema =
    new mongoose.Schema({

        title: String,

        image: String,

        price: Number,

        description: String,

        category: String,

        rating: Number

    });

const Product =
    mongoose.model(
        "Product",
        productSchema
    );

export default Product;