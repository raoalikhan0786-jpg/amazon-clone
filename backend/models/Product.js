import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        price: Number,
        description: String,
        category: String,
        rating: Number
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);