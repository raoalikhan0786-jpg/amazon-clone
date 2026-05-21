import mongoose from "mongoose";

import dotenv from "dotenv";

import products from "./data/products.js";

import Product from "./models/productModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)

.then(async () => {

  console.log("MongoDB Connected");

  await Product.deleteMany();

  await Product.insertMany(products);

  console.log("Products Inserted");

  process.exit();

});